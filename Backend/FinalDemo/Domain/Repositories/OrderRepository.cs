using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;

namespace SWP391.KCSAH.Repository.KCSAH.Repository
{
    public class OrderRepository : GenericRepository<Order>
    {
        public OrderRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<Order>> GetAllAsync()
        {
            return await _context.Orders.Include(p => p.OrderDetails).Where(p => p.isVipUpgrade == false).ToListAsync();
        }

        public async Task<Order> GetByOrderIdAsync(int id)
        {
            return await _context.Orders.Include(p => p.OrderDetails).FirstOrDefaultAsync(p => p.OrderId == id);
        }

        public async Task<List<Order>> GetVipOrder()
        {
            List<Order> orderList = await _context.Orders.Include(p => p.OrderVipDetails).Where(p => p.isVipUpgrade == true).ToListAsync();
            foreach (Order order in orderList)
            {
                var user = await _context.Users.FindAsync(order.UserId);
                order.Email = user.Email;
                order.Phone = user.PhoneNumber;
                order.FullName = user.FirstName + " " + user.LastName;
            }
            return orderList;
        }

        public async Task<List<Order>> GetProductOrder()
        {
            return await _context.Orders.Include(p => p.OrderVipDetails).Where(p => p.isVipUpgrade == false).ToListAsync();
        }

        public async Task<Order> GetOrderByUserIdAndCreateDate(string UserId, DateTime CreateDate)
        {
            return await _context.Orders.Include(p => p.OrderDetails).Where(p => p.UserId.Equals(UserId) && p.CreateDate == CreateDate).FirstOrDefaultAsync();
        }

        public async Task<List<Order>> GetShopListOrder(Order orderUser)
        {
            return await _context.Orders.Include(p => p.OrderDetails).Where(p => p.UserId.Equals(orderUser.UserId) && p.CreateDate == orderUser.CreateDate && p.ShopId != null).ToListAsync();
        }

        // Lấy order theo ngày
        public async Task<List<Order>> GetOrdersByDayAsync(int days)
        {
            var endDate = DateTime.Now;
            var startDate = endDate.AddDays(-days);
            return await GetOrdersByDateRangeAsync(startDate, endDate);
        }

        //member và vip
        public async Task<List<Order>> GetOrdersMemberByDayAsync(int days)
        {
            var endDate = DateTime.Now;
            var startDate = endDate.AddDays(-days);
            return await GetOrdersByDateMemberRangeAsync(startDate, endDate);
        }

        public async Task<List<Order>> GetOrdersForShopByDayAsync(int days, int shopId)
        {
            var endDate = DateTime.Now;
            var startDate = endDate.AddDays(-days);
            return await GetOrdersForShopByDateRangeAsync(startDate, endDate, shopId);
        }

        public async Task<List<Order>> GetAllVipOrdersSuccessfulAsync()
        {
            var orderList = await _context.Orders.Include(p => p.OrderVipDetails).Where(p => p.isVipUpgrade == true && p.OrderStatus.Equals("Successful")).ToListAsync();
            foreach (Order order in orderList)
            {
                var user = await _context.Users.FindAsync(order.UserId);
                order.Email = user.Email;
                order.Phone = user.PhoneNumber;
                order.FullName = user.FirstName + " " + user.LastName;
            }
            return orderList;
        }

        public async Task<List<Order>> GetAllVipOrdersFailedAsync()
        {
            var orderList = await _context.Orders.Include(p => p.OrderVipDetails).Where(p => p.isVipUpgrade == true && p.OrderStatus.Equals("Failed")).ToListAsync();
            foreach (Order order in orderList)
            {
                var user = await _context.Users.FindAsync(order.UserId);
                order.Email = user.Email;
                order.Phone = user.PhoneNumber;
                order.FullName = user.FirstName + " " + user.LastName;
            }
            return orderList;
        }

        // Lấy orderVip theo ngày hôm nay
        public async Task<List<Order>> GetVipOrdersTodayAsync()
        {
            var endDate = DateTime.Now;
            var startDate = DateTime.Today;
            return await GetVipOrdersByDateRangeAsync(startDate, endDate);
        }

        // Lấy orderVip theo ngày hôm nay
        public async Task<List<Order>> GetVipOrdersByDayAsync(int days)
        {
            var endDate = DateTime.Now;
            var startDate = endDate.AddDays(-days);
            return await GetVipOrdersByDateRangeAsync(startDate, endDate);
        }

        // Lấy orderVip trong tuần hiện tại
        public async Task<List<Order>> GetVipOrdersByWeekAsync(int weeks)
        {
            var days = 7 * weeks;
            var endDate = DateTime.Today;
            // var startDate = endDate.AddDays(-(int)endDate.DayOfWeek + 1); // Bắt đầu từ thứ Hai của tuần này
            var startDate = endDate.AddDays(-days);
            return await GetVipOrdersByDateRangeAsync(startDate, endDate);
        }

        // Lấy orderVip trong tháng hiện tại
        public async Task<List<Order>> GetVipOrdersByMonthAsync(int month)
        {
            var endDate = DateTime.Today;
            //var startDate = new DateTime(endDate.Year, endDate.Month, 1); // Bắt đầu từ ngày 1 của tháng
            var startDate = endDate.AddMonths(-month);
            return await GetVipOrdersByDateRangeAsync(startDate, endDate);
        }

        // Lấy orderVip trong tháng 
        public async Task<List<Order>> GetVipOrdersByInputMonthAsync(int month)
        {
            int year = DateTime.Now.Year;
            return await GetVipOrdersByMonthRangeAsync(month, year);
        }

        // Lấy order trong tháng 
        public async Task<List<Order>> GetOrdersByInputMonthAsync(int month)
        {
            int year = DateTime.Now.Year;
            return await GetOrdersByMonthRangeAsync(month, year);
        }

        // Hàm dùng chung để lấy danh sách orderVip theo khoảng thời gian
        private async Task<List<Order>> GetVipOrdersByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var orderList = await _context.Orders.Include(o => o.OrderVipDetails)
                .Where(o => o.isVipUpgrade && o.CreateDate >= startDate && o.CreateDate <= endDate)
                .ToListAsync();
            foreach (Order order in orderList)
            {
                var user = await _context.Users.FindAsync(order.UserId);
                order.Email = user.Email;
                order.Phone = user.PhoneNumber;
                order.FullName = user.FirstName + " " + user.LastName;
            }
            return orderList;
        }

        private async Task<List<Order>> GetVipOrdersByMonthRangeAsync(int month, int year)
        {
            var orderList = await _context.Orders.Include(o => o.OrderVipDetails)
                .Where(o => o.isVipUpgrade && o.CreateDate.Month == month && o.CreateDate.Year == year)
                .ToListAsync();
            foreach (Order order in orderList)
            {
                var user = await _context.Users.FindAsync(order.UserId);
                order.Email = user.Email;
                order.Phone = user.PhoneNumber;
                order.FullName = user.FirstName + " " + user.LastName;
            }
            return orderList;
        }

        private async Task<List<Order>> GetOrdersByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Orders.Include(o => o.OrderDetails)
                .Where(o => !o.isVipUpgrade && o.CreateDate >= startDate && o.CreateDate <= endDate)
                .ToListAsync();
        }

        private async Task<List<Order>> GetOrdersByDateMemberRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Orders.Include(o => o.OrderDetails)
                .Where(o => !o.isVipUpgrade && o.CreateDate >= startDate && o.CreateDate <= endDate && o.ShopId == null)
                .ToListAsync();
        }

        private async Task<List<Order>> GetOrdersForShopByDateRangeAsync(DateTime startDate, DateTime endDate, int shopId)
        {
            return await _context.Orders.Include(o => o.OrderDetails)
                .Where(o => !o.isVipUpgrade && o.CreateDate >= startDate && o.CreateDate <= endDate && o.ShopId == shopId)
                .ToListAsync();
        }

        private async Task<List<Order>> GetOrdersByMonthRangeAsync(int month, int year)
        {
            return await _context.Orders.Include(o => o.OrderDetails)
                .Where(o => !o.isVipUpgrade && o.CreateDate.Month == month && o.CreateDate.Year == year)
                .ToListAsync();
        }

    }
}
