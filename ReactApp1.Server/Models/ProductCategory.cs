using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class ProductCategory
{
    public int Id { get; set; }

    public int? ParentCategoryId { get; set; }

    public string? CategoryName { get; set; }

    public virtual ICollection<ProductCategory> InverseParentCategory { get; set; } = new List<ProductCategory>();

    public virtual ProductCategory? ParentCategory { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual ICollection<Variation> Variations { get; set; } = new List<Variation>();
}
