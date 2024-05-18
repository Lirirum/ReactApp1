using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models.Database;

namespace ReactApp1.Server.Services
{
    public class CartService : ICartService
    {
        private readonly List<CartItem> _cartItems;
        private readonly ShopContext _context;
        public CartService(ShopContext context)
        {
            _context = context;
            
        }

        public async Task AddItemAsync(CartItem item)
        {
           _context.CartItems.Add(item);
           await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CartItem>> GetItemsAsync()
        {
             var cartItems =  await _context.CartItems.ToListAsync();
             return cartItems;
        }
        public async Task<CartItem>GetItemAsync(int id)
        {

            CartItem cartItem = await _context.CartItems.FindAsync(id);          
            return cartItem;
        }

        public async Task ClearItemsAsync()
        {
            _cartItems.Clear();
        }


        public async Task ClearItemAsync(CartItem entity)
        {
            

            _context.CartItems.Remove(entity);
            await _context.SaveChangesAsync();

            
        }

        public async Task UpdateItemAsync(CartItem cartItem)
        {
            _context.Update(cartItem);
            await _context.SaveChangesAsync();
        }
    }
}
