using IdentityModel.OidcClient;
using Microsoft.Extensions.Caching.Memory;
using ReactApp1.Server.Models.Custom;
using Serilog;

namespace ReactApp1.Server.Services
{
    public class CurrencyRateProvider
    {
        private readonly IMemoryCache _memoryCache;

        public CurrencyRateProvider(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public List<CurrencyRate> GetCurrencyRates()
        {
            _memoryCache.TryGetValue("CurrencyRates", out List<CurrencyRate> currencyRates);
            Log.Information("CurrencyRate Info => {@currencyRates)}", currencyRates);
            return currencyRates ;
        }
    }
}
