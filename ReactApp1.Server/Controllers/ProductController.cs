﻿using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models.Custom;
using ReactApp1.Server.Models.Database;
using ReactApp1.Server.Models.Form;
using ReactApp1.Server.Services;
using Serilog;

namespace ReactApp1.Server.Controllers
{

    
    [ApiController]
    [Route("api/[controller]")]    
    public class ProductController: ControllerBase
    {


        private readonly IProductService _productService;


        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("atributes/{id:int}")]
        public async Task<ActionResult<Dictionary<string,string>>> GetProductAtributesById(int id)
        {
            var result = await _productService.GetProductAtributesByIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("category/{category_id:int}")]
        public async Task<ActionResult<List<ProductInfo>>> GetProductByCategoryAsync(int category_id)
        {

            var result = await _productService.GetProductByCategoryAsync(category_id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);


        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<ProductInfo>>> GetProductById(int id)
        {
   
            var result = await _productService.GetProductByIdAsync(id);
            Log.Information("Product Info => {@result}", result);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("top/{quantity:int}")]
        public async Task<ActionResult<List<ProductInfo>>> GetTopProducts(int quantity)
        {
            var result = await _productService.GetTopProductsAsync(quantity);
            Log.Information("Product Top => {@result}",result);
            if (result == null)
            {
                Log.Error("Це повідомлення про помилку");
                return NotFound();
            }
            return Ok(result);
        }


        [HttpGet("admin/top/{quantity:int}")]
        public async Task<ActionResult<List<ProductInfo>>> GetTopProductsAdmin(int quantity)
        {
            var result = await _productService.GetTopProductsAdminAsync(quantity);
            if (result == null)
            {
                Log.Error("Це повідомлення про помилку");
                return NotFound();
            }
            return Ok(result);
        }

       
        [HttpGet("admin/categories"),Authorize(Roles ="admin")]
        public async Task<ActionResult<List<ProductInfo>>> GetСategoriesAdmin()
        {
            var result = await _productService.GetProductСategoriesAsync();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpGet("images/{id:int}")]
        public async Task<ActionResult<List<string>>> GetProductImages(int id)
        {
            var result = await _productService.GetProductImagesAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost("add/")]
        public async Task<ActionResult> AddProduct(ProductFull product)
        {
            await _productService.AddProductAsync(product);
            return Ok();
        }

        [HttpDelete("remove/{id}")]
        public async Task<ActionResult> RemoveProduct(int id)
        {
            try
            {
                await _productService.RemoveProductAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while deleting the ProductItem and Product.", Error = ex.Message });
            }
        }

        [HttpGet("quantity")]
        public async Task<int> GetProductQuantityAsync(int categoryId, float price)
        {
            return await _productService.ExecuteProcQuantityAsync(categoryId, price);
        }


        [HttpPut("update")]
        public async Task<ActionResult> UpdateProductItemAndProduct(ProductUpdate productInfo)
        {
            ProductItem productItem = new ProductItem { 
                ProductId=productInfo.ProductItemId,
                Price=  productInfo.Price,
                ImageUrl= productInfo.ImageUrl,
                QtyInStock=productInfo.QtyInStock,
                Sku= productInfo.Sku,
            };

            Product product = new Product
            {
                Id=productInfo.ProductId,
                CategoryId=productInfo.CategoryId,
                Description= productInfo.Description,
                Name= productInfo.Name,
            };

            try
            {
                await _productService.UpdateProductAndProductItemAsync(productInfo.ProductItemId, productItem, product);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating the ProductItem and Product.", Error = ex.Message });
            }
        }
    }
}
