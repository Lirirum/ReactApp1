using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models.Database;

public partial class UserList
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Surname { get; set; }

    public string? MiddleName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }
}
