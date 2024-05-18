using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models.Authentication
{
    public class ApplicationUser : IdentityUser
    {

        public string FirstName  { get; set;}

        public string LastName { get; set; }
    }
}
