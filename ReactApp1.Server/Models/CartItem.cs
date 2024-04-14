using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class CartItem
{
    public int Id { get; set; }

    public int? CategoryId { get; set; }

    public string? Name { get; set; }

    public double? Price { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }
}
