namespace ReactApp1.Server.Services
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
    }
    public class BCryptPasswordHasherService : IPasswordHasher
    {
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
