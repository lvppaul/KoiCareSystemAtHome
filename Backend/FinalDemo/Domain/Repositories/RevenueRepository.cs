using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;

namespace Domain.Repositories
{
    public class RevenueRepository : GenericRepository<Revenue>
    {
        public RevenueRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<Revenue>> GetVipUpgradeRevenue()
        {
            var result = await _context.Revenues.Where(r => r.isVip == true).ToListAsync();

            return result;
        }

        public async Task<List<Revenue>> GetProductAdminRevenue()
        {
            var result = await _context.Revenues.Where(r => r.isVip == false && !r.isShopRevenue).ToListAsync();

            return result;
        }

        public async Task<int> GetNumberofVipUpgrade()
        {
            var count = await _context.Revenues.CountAsync(r => r.isVip == true);

            return count;
        }

        public async Task<int> GetNumberofProductOrderByAdmin()
        {
            var count = await _context.Revenues.CountAsync(r => r.isVip == false && !r.isShopRevenue);

            return count;
        }

        public async Task<int> GetTotalProductAdminRevenue()
        {
            var list = await _context.Revenues.Where(r => r.isVip == false && !r.isShopRevenue).ToListAsync();

            var total = list.Sum(r => r.Income);

            return total;
        }

        public async Task<int> GetTotalVipUpgradeRevenue()
        {
            var list = await _context.Revenues.Where(r => r.isVip == true).ToListAsync();

            var total = list.Sum(r => r.Income);

            return total;
        }

        public async Task<int> GetTotalAdminRevenue()
        {
            var list = await _context.Revenues.Where(p => !p.isShopRevenue).ToListAsync();

            var total = list.Sum(r => r.Income);

            return total;
        }

        public async Task<List<Revenue>> GetRevenueByShop(int shopId)
        {
            var result = await (from revenue in _context.Revenues
                                join order in _context.Orders on revenue.OrderId equals order.OrderId
                                where revenue.isShopRevenue == true && order.ShopId == shopId
                                select revenue)
                        .ToListAsync();

            return result;
        }
    }
}
