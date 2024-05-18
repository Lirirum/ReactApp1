using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models.Database;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrencyController : ControllerBase
    {
        private readonly ICurrencyService _currencyService;


        public CurrencyController(ICurrencyService currencyService)
        {
            _currencyService = currencyService;
        }

        [HttpGet("currencies")]
        public async Task<ActionResult> Get()
        {
            var result = await  _currencyService.GetCurrency();
            if (result == null )
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
