using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers
{
    public class ProductController: ControllerBase
    {


        private readonly IProductService _productService;


        public ProductController(IProductService productService)
        {
            _productService = productService;
        }



        [HttpGet("category/{category_id:int}")]
        public async Task<ActionResult<List<ProductInfo>>> GetProductByCategoryAsync(int category_id)
        {

            var item = await _productService.GetProductByCategoryAsync(category_id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);


        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<ProductInfo>>> GetProductById(int id)
        {
   
            var item = await _productService.GetProductByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

    }
}
