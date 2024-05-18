namespace ReactApp1.Server.Models.Form
{
    public class ProductFull
    {
        public string Name { get; set; } = "";

        public string Description { get; set; } = "";

        public int CategoryId { get; set; } = 5;

        public double Price { get; set; } = 0;

        public string Sku { get; set; } = "";

        public int QtyInStock { get; set; } = 1;

        public string ImageUrl { get; set; } = "default.jpg";

    }
}
