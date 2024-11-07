using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;
using SWP391.KCSAH.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<List<Revenue>> GetProductRevenue()
        {
            var result = await _context.Revenues.Where(r => r.isVip == false).ToListAsync();

            return result;
        }

        public async Task<int> GetNumberofVipUpgrade()
        {
            var count = await _context.Revenues.CountAsync(r => r.isVip == true);

            return count;
        }

        public async Task<int> GetNumberofProductOrder()
        {
            var count = await _context.Revenues.CountAsync(r => r.isVip == false);

            return count;
        }

        public async Task<int> GetTotalProductRevenue()
        {
            var list = await _context.Revenues.Where(r => r.isVip == false).ToListAsync();

            var total = list.Sum(r => r.Income);

            return total;
        }

        public async Task<int> GetTotalVipUpgradeRevenue()
        {
            var list = await _context.Revenues.Where(r => r.isVip == true).ToListAsync();

            var total = list.Sum(r => r.Income);

            return total;
        }

        public async Task<int> GetTotalRevenue()
        {
            var list = await _context.Revenues.ToListAsync();

            var total = list.Sum(r => r.Income);

            return total;
        }
    }
}
