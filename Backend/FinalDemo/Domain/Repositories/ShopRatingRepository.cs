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
    public class ShopRatingRepository : GenericRepository<ShopRating>
    {
        public ShopRatingRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<ShopRating>> GetAllAsync()
        {
            return await _context.ShopRatings.ToListAsync();
        }

        public async Task<ShopRating> RatingExist(int shopId, string userId)
        {
            var result = await _context.ShopRatings
                .FirstOrDefaultAsync(r => r.ShopId == shopId && r.UserId.Equals(userId));

            return result;
        }

    }
}
