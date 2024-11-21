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
            var result = await _context.Revenues.Where(r => r.isVip == false).ToListAsync();

            return result;
        }

        public async Task<int> GetNumberofVipUpgrade()
        {
            var count = await _context.Revenues.CountAsync(r => r.isVip == true);

            return count;
        }

        public async Task<int> GetNumberofProductOrderByAdmin()
        {
            var count = await _context.Revenues.CountAsync(r => r.isVip == false);

            return count;
        }

        public async Task<int> GetTotalProductAdminRevenue()
        {
            var list = await _context.Revenues.Where(r => r.isVip == false).ToListAsync();

            var total = list.Sum(r => r.Income);

            return total;
        }

        public async Task<int> GetTotalProductAdminRevenueThisMonth()
        {
            var now = DateTime.UtcNow; // Use UTC for consistency
            var firstDayOfCurrentMonth = new DateTime(now.Year, now.Month, 1);
            var today = now.Date.AddDays(1).AddTicks(-1);

            var total = await _context.Revenues
                .Where(r => r.CreateAt >= firstDayOfCurrentMonth && r.CreateAt <= today && r.isVip == false && r.isShopRevenue == false)
                .SumAsync(r => r.Income);

            return total;
        }

        public async Task<int> GetTotalVipUpgradeRevenue()
        {
            var list = await _context.Revenues.Where(r => r.isVip == true).ToListAsync();

            var total = list.Sum(r => r.Income);

            return total;
        }

        public async Task<int> GetTotalVipUpgradeRevenueThisMonth()
        {
            var now = DateTime.UtcNow; // Use UTC for consistency
            var firstDayOfCurrentMonth = new DateTime(now.Year, now.Month, 1);
            var today = now.Date.AddDays(1).AddTicks(-1);

            var total = await _context.Revenues
                .Where(r => r.CreateAt >= firstDayOfCurrentMonth && r.CreateAt <= today && r.isVip == true)
                .SumAsync(r => r.Income);

            return total;
        }

        public async Task<int> GetTotalAdminRevenue()
        {
            var list = await _context.Revenues.ToListAsync();

            var total = list.Sum(r => r.Income);

            return total;
        }

        public async Task<int> GetTotalAdminRevenueThisMonth()
        {
            var now = DateTime.UtcNow; // Use UTC for consistency
            var firstDayOfCurrentMonth = new DateTime(now.Year, now.Month, 1);
            var today = now.Date.AddDays(1).AddTicks(-1);

            var total = await _context.Revenues
                .Where(r => r.CreateAt >= firstDayOfCurrentMonth && r.CreateAt <= today && r.isShopRevenue == false)
                .SumAsync(r => r.Income);

            return total;
        }

        public async Task<List<Revenue>> GetRevenueByShop(int shopId)
        {
            var result = await (from revenue in _context.Revenues
                                join order in _context.Orders on revenue.OrderId equals order.OrderId
                                where revenue.isShopRevenue == true && order.ShopId == shopId && revenue.isVip == false
                                select revenue)
                        .ToListAsync();

            return result;
        }

        public async Task<int> GetTotalRevenueByShopFromOrders(int shopId)
        {
            var total = await (from revenue in _context.Revenues
                               join order in _context.Orders on revenue.OrderId equals order.OrderId
                               where revenue.isShopRevenue == true && order.ShopId == shopId && revenue.isVip == false
                               select revenue.Income)
                              .SumAsync();

            return total;
        }

        public async Task<int> GetTotalRevenueByShopFromOrdersThisMonth(int shopId)
        {
            var now = DateTime.UtcNow; // Use UTC for consistency
            var firstDayOfCurrentMonth = new DateTime(now.Year, now.Month, 1);
            var today = now.Date.AddDays(1).AddTicks(-1);

            var total = await (from revenue in _context.Revenues
                               join order in _context.Orders on revenue.OrderId equals order.OrderId
                               where revenue.isShopRevenue == true && order.ShopId == shopId && revenue.isVip == false && revenue.CreateAt >= firstDayOfCurrentMonth && revenue.CreateAt <= today
                               select revenue.Income)
                              .SumAsync();

            return total;
        }

        public async Task<int> GetTotalRevenueNoCommissionFee(int shopId)
        {
            var total = await (_context.Orders
                .Where(order => order.ShopId == shopId && !order.isVipUpgrade)
                .SumAsync(order => order.TotalPrice));

            return total;
        }

        public async Task<int> GetTotalRevenueNoCommissionFeeThisMonth(int shopId)
        {
            var now = DateTime.UtcNow; // Use UTC for consistency
            var firstDayOfCurrentMonth = new DateTime(now.Year, now.Month, 1);
            var today = now.Date.AddDays(1).AddTicks(-1);

            var total = await (_context.Orders
                .Where(order => order.ShopId == shopId && !order.isVipUpgrade && order.CreateDate >= firstDayOfCurrentMonth && order.CreateDate <= today)
                .SumAsync(order => order.TotalPrice));

            return total;
        }

        public async Task<int> GetCommissionFee(int shopId)
        {
            var total = await GetTotalRevenueNoCommissionFee(shopId);
            var income = await GetTotalRevenueByShopFromOrders(shopId);
            return total - income;
        }

        public async Task<int> GetCommissionFeeThisMonth(int shopId)
        {
            var total = await GetTotalRevenueNoCommissionFeeThisMonth(shopId);
            var income = await GetTotalRevenueByShopFromOrdersThisMonth(shopId);
            return total - income;
        }

        public async Task<List<(int ShopId, string shopName, int TotalRevenue)>> GetTop5ShopsByRevenue()
        {
            var topShops = await (from revenue in _context.Revenues
                                  join order in _context.Orders on revenue.OrderId equals order.OrderId
                                  join shop in _context.Shops on order.ShopId equals shop.ShopId
                                  where revenue.isShopRevenue == true && revenue.isVip == false
                                  group revenue by new { shop.ShopId, shop.ShopName } into shopGroup
                                  orderby shopGroup.Sum(r => r.Income) descending
                                  select new
                                  {
                                      ShopId = shopGroup.Key.ShopId,
                                      ShopName = shopGroup.Key.ShopName,
                                      TotalRevenue = shopGroup.Sum(r => r.Income)
                                  })
                         .Take(5)
                         .ToListAsync();

            // Chuyển đổi kết quả sang dạng List<(int, string, int)>
            return topShops.Select(x => (x.ShopId, x.ShopName, x.TotalRevenue)).ToList();
        }

    }
}
