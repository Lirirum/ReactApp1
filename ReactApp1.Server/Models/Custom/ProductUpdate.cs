namespace ReactApp1.Server.Models.Custom
{
    public class ProductUpdate
    {
        public int ProductId { get; set; }

        public int CategoryId { get; set; }
        public string Name { get; set; } = "";

        public string? Description { get; set; } = "";

        public int ProductItemId { get; set; }
        public string? Sku { get; set; }
        public int? QtyInStock { get; set; }

        public double? Price { get; set; }
        public string? ImageUrl { get; set; } = "default.jpg";




    }
}
