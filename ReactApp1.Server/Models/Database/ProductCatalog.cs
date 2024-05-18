using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models.Database;

public partial class ProductCatalog
{
    public int Id { get; set; }

    public int ProductItemId { get; set; }

    public DateOnly? DateAdded { get; set; }
}
