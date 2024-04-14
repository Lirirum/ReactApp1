using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;
using ReactApp1.Server.Services;
using ReactApp1.Server.Data;
using Microsoft.EntityFrameworkCore;
namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
    

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost]
        public async Task<ActionResult> AddItem( CartItem item)
        {
            await _cartService.AddItemAsync(item);            
            return Ok(await Get());
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<IEnumerable<CartItem>>> Get()
        {
            var items = await _cartService.GetItemsAsync();
            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CartItem>> GetItem(int id)
        {
            var item = await _cartService.GetItemAsync(id);
            if(item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCartItem(int id,CartItem cartItem)
        {
            if (id != cartItem.Id)
            {
                return BadRequest();
            }
            try
            {
                await _cartService.UpdateItemAsync(cartItem);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            } 
            return Ok();
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<ActionResult> ClearCartById(int id)
        {
            
            var entity = await _cartService.GetItemAsync(id);            
            if (entity == null)
            {
                return NotFound();
            }
            await _cartService.ClearItemAsync(entity);
            return Ok();
          

            
        }
    }
}
