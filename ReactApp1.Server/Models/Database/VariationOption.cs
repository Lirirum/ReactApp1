using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models.Database;

public partial class VariationOption
{
    public int Id { get; set; }

    public int VariationId { get; set; }

    public string? Value { get; set; }

    public virtual Variation Variation { get; set; } = null!;
}
