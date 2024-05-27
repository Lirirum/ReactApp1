using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models.Custom;
using ReactApp1.Server.Models.Database;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CurrencyController : ControllerBase
    {
        private readonly CurrencyRateProvider _currencyRateProvider;

        public CurrencyController(CurrencyRateProvider currencyRateProvider)
        {
            _currencyRateProvider = currencyRateProvider;
        }

        [HttpGet("rates")]
        public ActionResult<List<CurrencyRate>> GetCurrencyRates()
        {
            var rates = _currencyRateProvider.GetCurrencyRates();
            if (rates == null )
            {
                return NoContent(); 
            }

            return Ok(rates);
        }
    }
}
