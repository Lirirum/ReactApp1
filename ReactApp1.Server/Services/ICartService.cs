using ReactApp1.Server.Models;

namespace ReactApp1.Server.Services
{
    public interface ICartService
    {
        Task AddItemAsync(CartItem item);
        Task<IEnumerable<CartItem>> GetItemsAsync();
        Task<CartItem> GetItemAsync(int id);
        Task ClearItemsAsync();
        Task ClearItemAsync (CartItem entity);

        Task UpdateItemAsync(CartItem cartItem);
    }
}

