namespace ReactApp1.Server.Models.Custom
{
    public class CategoryInfo
    {
        public int Id { get; set; }

        public int? ParentCategoryId { get; set; }

        public string CategoryName { get; set; } = "";

    }
}
