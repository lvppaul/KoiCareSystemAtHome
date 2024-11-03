using Domain.Models.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SWP391.KCSAH.Repository.KCSAH.Repository
{
    public class CartRepository : GenericRepository<Cart>
    {
        public CartRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<Cart>> GetAllAsync()
        {
            return await _context.Carts.Include(c => c.CartItems).ToListAsync();
        }

        public async Task<Cart> GetByIdAsync(string id)
        {
            var result = await _context.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(p => p.UserId.Equals(id));

            return result;
        }
        public async Task<Cart> GetCartByIdAsync(int id)
        {
            var result = await _context.Carts.Include(c => c.CartItems.Where(ci => !ci.Product.IsDeleted))
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(p => p.CartId == id);

            return result;
        }
        public async Task<Cart> GetCartByUserIdAsync(string id)
        {
            var result = await _context.Carts
                .Include(c => c.CartItems.Where(ci => !ci.Product.IsDeleted))
                .ThenInclude(ci => ci.Product) 
                .FirstOrDefaultAsync(p => p.UserId == id);

            return result;
        }

        public async Task<List<Cart>> GetCartsByProductIdAsync(int productid)
        {
            var result = await _context.Carts
            .Include(c => c.CartItems.Where(ci => ci.ProductId == productid))
            .ThenInclude(ci => ci.Product)
            .ToListAsync();

            return result;
        }

        public async Task<Cart> GetCartById(int cartId)
        {
            var result = await _context.Carts
            .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.CartId == cartId);

            return result;
        }
    }
}
