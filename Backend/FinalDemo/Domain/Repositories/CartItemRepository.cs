using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public class CartItemRepository: GenericRepository<CartItem>
    {
        public CartItemRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<CartItem>> GetAllAsync()
        {
            return await _context.CartItems.ToListAsync();
        }

        public async Task<CartItem> GetByIdAsync(string id)
        {
            var result = await _context.CartItems.FirstOrDefaultAsync(p => p.CartId.Equals(id));

            return result;
        }
    }
}
