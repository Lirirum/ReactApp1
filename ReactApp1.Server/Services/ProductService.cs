using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.Custom;
using ReactApp1.Server.Models.Database;
using ReactApp1.Server.Models.Form;
using Serilog;
using System;
using System.Linq;
using System.Net.Http.Json;
using System.Reflection.PortableExecutable;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ReactApp1.Server.Services
{

    public interface IProductService
    {
        Task<List<ProductInfo>> GetProductByIdAsync(int id);
        Task<List<ProductInfo>> GetProductByCategoryAsync(int category_id);
        Task<Dictionary<string,string>> GetProductAtributesByIdAsync(int id);
        Task<List<ProductInfo>> GetTopProductsAsync(int quantity);
        Task<List<string>> GetProductImagesAsync(int id);
        Task<List<ProductInfoAdmin>> GetTopProductsAdminAsync(int quantity);

        Task<List<CategoryInfo>> GetProductСategoriesAsync();

        Task AddProductAsync(ProductFull product);
    }

    public class ProductService : IProductService
    {

        private readonly ShopContext _context;
        public ProductService(ShopContext context)
        {
            _context = context;

        }

        public async  Task<List<ProductInfo>> GetProductByCategoryAsync(int category_id)
        {

            var items = await(from p_config in _context.ProductConfigurations
                              join p_item in _context.ProductItems on p_config.ProductItemId equals p_item.Id
                              join v_options in _context.VariationOptions on p_config.VariationOptionId equals v_options.Id
                              join v in _context.Variations on v_options.VariationId equals v.Id
                              join p in _context.Products on p_item.ProductId equals p.Id
                              where p.CategoryId == category_id
                              select new { p_config, v_options, p_item, p, v }
           ).ToListAsync();

            var result = items.GroupBy(g => g.p_config.ProductItemId)
                    .Select(g => new ProductInfo
                    {
                        ProductItemId = g.Key,
                        ProductId = g.Select(x => x.p.Id).FirstOrDefault(),
                        Name = g.Select(x => x.p.Name).FirstOrDefault(),
                        Description = g.Select(x => x.p.Description).FirstOrDefault(),
                        Characteristics = g.ToDictionary(
                            x => x.v_options.Variation.Name,
                            x => x.v_options.Value)
                    }).ToList();

            return result;

        }


        public async Task<List<ProductInfo>> GetProductByIdAsync(int id)
        {

            var items = await (from p_item in _context.ProductItems
                               join p in _context.Products on p_item.ProductId equals p.Id
                               join p_c in _context.ProductConfigurations on p_item.Id equals p_c.ProductItemId
                               join v_options in _context.VariationOptions on p_c.VariationOptionId equals v_options.Id
                               join v in _context.Variations on v_options.VariationId equals v.Id
                               join p_images in _context.ProductImages on p_item.Id equals p_images.ProductItemId
                               where p_item.Id == id
                               select new
                               {
                                   p_item,
                                   p,                            
                                   v_options,
                                   v,
                                   p_images
                               }
                 ).ToListAsync();

            var result = items.GroupBy(g => g.p_item.Id)
                .Select(g => new ProductInfo
                {
                    ProductItemId = g.Key,
                    ProductId = g.Select(x => x.p.Id).FirstOrDefault(),
                    Name = g.Select(x => x.p.Name).FirstOrDefault(),
                    Price = g.Select(x => x.p_item.Price).FirstOrDefault(),
                    Description = g.Select(x => x.p.Description).FirstOrDefault(),
                    Characteristics = g.GroupBy(x => x.v_options.Variation.Name).ToDictionary(
                            grp => grp.Key,
                            grp => grp.First().v_options.Value),
                    ImageUrl = g.Select(x => x.p_item.ImageUrl).FirstOrDefault(),
                    ImagesUrl = g.Select(x => x.p_images.ImageUrl).Distinct().ToList(),

                }).ToList();

            return result;
        }

        public  async Task<Dictionary<string,string>> GetProductAtributesByIdAsync(int id)
        {

            var items = await (from p_c in _context.ProductConfigurations
                              join v_o in _context.VariationOptions on p_c.VariationOptionId equals v_o.Id
                              join v in _context.Variations on v_o.VariationId equals v.Id
                              where p_c.ProductItemId == id
                              select new
                              {
                                  v_o,
                                  v,
                              }
             ).ToListAsync();

            var result = items.ToDictionary(item => item.v.Name, item => item.v_o.Value);


            return result;
        }


        public async Task<List<ProductInfo>> GetTopProductsAsync(int quantity)
        {
            var items = await (from p_item in _context.ProductItems
                               join p in _context.Products on p_item.ProductId equals p.Id
                               join p_c in _context.ProductConfigurations on p_item.Id equals p_c.ProductItemId
                               join v_options in _context.VariationOptions on p_c.VariationOptionId equals v_options.Id
                               join v in _context.Variations on v_options.VariationId equals v.Id
                               join p_images in _context.ProductImages on p_item.Id equals p_images.ProductItemId                     
                               select new
                               {
                                   p_item,
                                   p,                            
                                   v_options,
                                   v,
                                   p_images
                               }
                   ).ToListAsync();

            var result = items.GroupBy(g => g.p_item.Id)
                .Select(g => new ProductInfo
                {
                    ProductItemId = g.Key,
                    ProductId = g.Select(x => x.p.Id).FirstOrDefault(),
                    CategoryId= g.Select(x => x.p.CategoryId).FirstOrDefault(),
                    Name = g.Select(x => x.p.Name).FirstOrDefault(),
                    Price= g.Select(x => x.p_item.Price).FirstOrDefault(),
                    Description = g.Select(x => x.p.Description).FirstOrDefault(),
                    Characteristics = g.GroupBy(x => x.v_options.Variation.Name).ToDictionary(
                            grp => grp.Key,
                            grp => grp.First().v_options.Value),
                    ImageUrl = g.Select(x => x.p_item.ImageUrl).FirstOrDefault(),
                    ImagesUrl = g.Select(x => x.p_images.ImageUrl).Distinct().ToList()

                }).Take(quantity).ToList();

            return result;
        }

       

        public async Task<List<ProductInfoAdmin>> GetTopProductsAdminAsync(int quantity)
        {
            var itemIds = await (from p_item in _context.ProductItems select p_item.Id).Take(quantity).ToListAsync();

            var items = await (from p_item in _context.ProductItems
                               join p in _context.Products on p_item.ProductId equals p.Id
                               join c in _context.ProductCategories on p.CategoryId equals c.Id
                               join p_c in _context.ProductConfigurations on p_item.Id equals p_c.ProductItemId                                
                               join v_o in _context.VariationOptions on p_c.VariationOptionId equals v_o.Id                          
                               join v in _context.Variations on v_o.VariationId equals v.Id
                               join p_images in _context.ProductImages on p_item.Id equals p_images.ProductItemId   
                               select new
                               {
                                   p_item,
                                   p,
                                   c,
                                   v_o,
                                   v,
                                   p_images,
                               }
                   ).ToListAsync();


            var result = items.GroupBy(g => g.p_item.Id)
                .Select(g => new ProductInfoAdmin
                {
                    ProductItemId = g.Key,
                    ProductId = g.Select(x => x.p.Id).FirstOrDefault(),
                    CategoryId = g.Select(x => x.p.CategoryId).FirstOrDefault(),
                    CategoryName = g.Select(x => x.c.CategoryName).FirstOrDefault(),
                    Sku= g.Select(x => x.p_item.Sku).FirstOrDefault(),
                    QtyInStock = g.Select(x => x.p_item.QtyInStock).FirstOrDefault(),
                    Name = g.Select(x => x.p.Name).FirstOrDefault(),
                    Price = g.Select(x => x.p_item.Price).FirstOrDefault(),
                    Description = g.Select(x => x.p.Description).FirstOrDefault(),
                    Characteristics = g.GroupBy(x => x.v_o.Variation.Name).ToDictionary(
                      grp => grp.Key,
                      grp => grp.First().v_o.Value),                  
                    ImageUrl = g.Select(x => x.p_item.ImageUrl).FirstOrDefault(),
                    ImagesUrl = g.Select(x => x.p_images.ImageUrl).Distinct().ToList()


                }).ToList();

            return result;
        }

        public async Task<List<string>> GetProductImagesAsync(int id)
        {
            var result = await _context.ProductImages
            .Where(pi => pi.ProductItemId == id)
            .Select(pi => pi.ImageUrl)
            .ToListAsync();

            return result;

        }

        public async Task<List<CategoryInfo>> GetProductСategoriesAsync()
        {
            var result = await _context.ProductCategories
            .Where(i => i.ParentCategory != null)
               .Select(i => new  CategoryInfo
               {
                   Id=i.Id,
                   CategoryName = i.CategoryName,             
               })
            .ToListAsync();

            return result;

        }

        public async Task AddProductAsync(ProductFull product)
        {
            var productEntity = new Product
            {
                CategoryId = product.CategoryId,
                Name = product.Name,
                Description =product.Description,
              
            };
            _context.Products.Add(productEntity);
            await _context.SaveChangesAsync();
            var id = productEntity.Id;

            var productItemEntity = new ProductItem
            {
                ProductId = id,
                Sku = product.Sku,
                QtyInStock = product.QtyInStock,
                Price = product.Price,

            };
            _context.ProductItems.Add(productItemEntity);
            await _context.SaveChangesAsync();
        }
    }


}
