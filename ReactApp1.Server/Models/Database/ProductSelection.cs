using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models.Database;

public partial class ProductSelection
{
    public string? Name { get; set; }

    public double? Price { get; set; }

    public int CategoryId { get; set; }
}
