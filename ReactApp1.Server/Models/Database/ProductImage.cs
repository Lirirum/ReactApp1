using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models.Database;

public partial class ProductImage
{
    public int Id { get; set; }

    public int ProductItemId { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ProductItem ProductItem { get; set; } = null!;
}
