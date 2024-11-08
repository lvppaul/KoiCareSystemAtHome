using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SWP391.KCSAH.Repository.KCSAH.Repository
{
    public class OrderRepository : GenericRepository<Order>
    {
            public OrderRepository(KoiCareSystemAtHomeContext context) => _context = context;

            public async Task<List<Order>> GetAllAsync()
            {
                return await _context.Orders.Include(p => p.OrderDetails).Where(p => p.isVipUpgrade==false).ToListAsync();
            }

            public async Task<Order> GetByOrderIdAsync(int id)
            {
                return await _context.Orders.Include(p => p.OrderDetails).FirstOrDefaultAsync(p => p.OrderId == id);
            }

            public async Task<List<Order>> GetVipOrder()
            {
                return await _context.Orders.Include(p => p.OrderVipDetails).Where(p => p.isVipUpgrade == true).ToListAsync();
            }

            public async Task<List<Order>> GetProductOrder()
            {
                return await _context.Orders.Include(p => p.OrderVipDetails).Where(p => p.isVipUpgrade == false).ToListAsync();
            }
    }
}
