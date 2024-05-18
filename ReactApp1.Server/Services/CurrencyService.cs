using DocumentFormat.OpenXml.VariantTypes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ReactApp1.Server.Models.Custom;
using ReactApp1.Server.Models.Form;

namespace ReactApp1.Server.Services
{
    public interface ICurrencyService
    {
        Task<decimal> ConvertCurrency(string baseCurrency, string targetCurrency, decimal amount);
        Task<List<string>> GetCurrency();
     
    }
    public class CurrencyService:ICurrencyService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly string apiKey;
        public CurrencyService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            this.apiKey = _configuration["CurrencyBeaconApiKey"];

        }

        public async Task<decimal> ConvertCurrency(string baseCurrency, string targetCurrency, decimal amount)
        {
            var response = await _httpClient.GetAsync($"https://api.currencybeacon.com/v1/convert?from={baseCurrency}&to={targetCurrency}&amount={amount}&api_key={this.apiKey}");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            JObject jsonResponse = JObject.Parse(content);
            decimal value = (decimal)jsonResponse["response"]["value"];

            return value;
        }

        public async Task<List<string>> GetCurrency()
        {
            var response = await _httpClient.GetAsync($"https://api.currencybeacon.com/v1/currencies?api_key={this.apiKey}");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();

            var json = JObject.Parse(content);
            var currencies = json["response"].ToObject<List<Dictionary<string, object>>>();
            var shortCodes = currencies.Select(c => c["short_code"].ToString()).ToList();


            return shortCodes;
        }
    }


}
