namespace ReactApp1.Server.Models
{
    public class ProductInfo
    {
        public int? ProductId { get; set; }

        public int? ProductItemId { get; set; }
        
        public int? CategoryId { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; } = null;

        public Dictionary<string, string>? Characteristics { get; set; } = new Dictionary<string, string>();



    }
}
