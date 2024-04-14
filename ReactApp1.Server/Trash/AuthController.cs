using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Trash
{

    public class AuthController : ControllerBase
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly List<User> _users;
        /*
        public AuthController(IPasswordHasher passwordHasher)
        {
            _passwordHasher = passwordHasher;
            _users = GetTestUsers();
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            // Validate the user input
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Hash the password
            user.Password = _passwordHasher.HashPassword(user.Password);

            // Add the user to the list (in a real application, this should be saved to a database)
            _users.Add(user);

            return Ok();

        }        */
    }
}
