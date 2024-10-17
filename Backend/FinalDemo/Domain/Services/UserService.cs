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
            return await _context.Orders.Where(p => p.UserId.Equals(id)).ToListAsync();
        }
    }
}
