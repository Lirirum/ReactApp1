using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class ProductItem
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string? Sku { get; set; }

    public int? QtyInStock { get; set; }

    public double? Price { get; set; }

    public virtual Product Product { get; set; } = null!;
}
