using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;

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
        Task<List<string>> GetProductCharByIdAsync(int id);

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

            var items = await (from p_config in _context.ProductConfigurations
                        join p_item in _context.ProductItems on p_config.ProductItemId equals p_item.Id
                        join v_options in _context.VariationOptions on p_config.VariationOptionId equals v_options.Id
                        join v in _context.Variations on v_options.VariationId equals v.Id
                        join p in _context.Products on p_item.ProductId equals p.Id
                        where p_config.ProductItemId ==id
                        select new { p_config, v_options, p_item, p, v }
            ).ToListAsync();

            var result =items.GroupBy(g => g.p_config.ProductItemId)
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

        public Task<List<string>> GetProductCharByIdAsync(int id)
        {

            var items = _context.ProductConfigurations
            .Where(pc => pc.ProductItemId == id)
            .Select(pc => pc.VariationOption.Value)
            .ToListAsync();    

            return items;
        }
    }
}
