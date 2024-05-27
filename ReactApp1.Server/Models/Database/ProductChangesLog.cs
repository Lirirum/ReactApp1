using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models.Database;

public partial class ProductChangesLog
{
    public string? OperType { get; set; }

    public DateTime? OperDateTime { get; set; }

    public int? RowsQuantity { get; set; }
}
