using IdentityModel.OidcClient;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json.Linq;
using ReactApp1.Server.Models.Custom;
using Serilog;
using System.Net.Http;

namespace ReactApp1.Server.Services
{
    public class CurrencyRateService  : BackgroundService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _memoryCache;
        private readonly IServiceProvider _serviceProvider;
        private readonly string apiKey;
        private readonly IConfiguration _configuration;
        private string baseCurrency;
        private string targetCurrency;
        private float amount;

        public CurrencyRateService(IHttpClientFactory httpClientFactory, IMemoryCache memoryCache, IServiceProvider serviceProvider, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _memoryCache = memoryCache;
            _serviceProvider = serviceProvider;
            _configuration = configuration;

            this.apiKey = _configuration["CurrencyBeaconApiKey"];
            baseCurrency = "USD";
            targetCurrency = "UAH";
            amount = 1;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var client = _httpClientFactory.CreateClient();

                try
                {
                    var response = await client.GetAsync($"https://api.currencybeacon.com/v1/convert?from={baseCurrency}&to={targetCurrency}&amount={amount}&api_key={this.apiKey}");
            
                    response.EnsureSuccessStatusCode();
                    var content = await response.Content.ReadAsStringAsync();
                    JObject jsonResponse = JObject.Parse(content);

                    var rateElement = jsonResponse["response"];
                    var result = new CurrencyRate
                    {
                        Date = DateTime.Now,
                        Amount= (decimal)rateElement["amount"],
                        From= (string)rateElement["from"],
                        To = (string)rateElement["to"],
                        Value= (decimal)rateElement["value"]
                    };

                    Log.Information("CurrencyRate Info => {@result}", result);
                    if (_memoryCache.TryGetValue("CurrencyRates", out List<CurrencyRate> existingRates))
                    {
                        existingRates.Add(result);
                    }
                    else
                    {
                        existingRates = new List<CurrencyRate> {result };
                    }

                    _memoryCache.Set("CurrencyRates", existingRates, TimeSpan.FromMinutes(10));
                }
                catch (Exception ex)
                {
                    // Log error (implement logging as needed)
                    Console.WriteLine($"Failed to retrieve currency rates: {ex.Message}");
                }

                await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
            }
        }


    }
}
public class ExchangeRatesResponse
{
    public Dictionary<string, decimal> Rates { get; set; }
}