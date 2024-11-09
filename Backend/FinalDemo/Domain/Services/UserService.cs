using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class UserService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly KoiCareSystemAtHomeContext _context;

        public UserService(UnitOfWork unitOfWork, KoiCareSystemAtHomeContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        public async Task<List<Order>> GetOrderByUserIdAsync(string id)
        {
            List<Order> orderList = await _context.Orders.Where(p => p.UserId.Equals(id)).Include(p => p.OrderDetails).ToListAsync();
            List<Order> orderDetailList = new List<Order>(); 
            foreach(var item in orderList)
            {
                if (!item.isVipUpgrade)
                {
                    orderDetailList.Add(item);
                }
            }
            return orderDetailList;
        }

        public async Task<List<Order>> GetVipOrderByUserIdAsync(string id)
        {
            List<Order> orderVipList = await _context.Orders.Where(p => p.UserId.Equals(id)).Include(p => p.OrderVipDetails).ToListAsync();
            List<Order> orderVipDetailList = new List<Order>();
            foreach (var order in orderVipList)
            {
                if (order.isVipUpgrade)
                {
                    var user = await _context.Users.FindAsync(order.UserId);
                    order.Email = user.Email;
                    order.Phone = user.PhoneNumber;
                    order.FullName = user.FirstName + " " + user.LastName;
                    orderVipDetailList.Add(order);
                }
            }
            return orderVipDetailList;
        }
    }
}
