using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models.Database;

public partial class ProductConfiguration
{
    public int ProductItemId { get; set; }

    public int VariationOptionId { get; set; }

    public virtual ProductItem ProductItem { get; set; } = null!;

    public virtual VariationOption VariationOption { get; set; } = null!;
}
