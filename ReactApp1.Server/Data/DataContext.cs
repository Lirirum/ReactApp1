using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
namespace ReactApp1.Server.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options) {
        }
    
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductItem> ProductItems { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Variation> Variations { get; set; }
        public DbSet<VariationOption> VariationOptions { get; set; }
        public DbSet<ProductConfiguration> ProductConfigurations { get; set; }

      


    }







}

