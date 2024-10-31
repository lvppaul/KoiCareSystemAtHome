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
    public class VipPackageRepository: GenericRepository<VipRecord>
    {
        public VipPackageRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<VipRecord>> GetAllAsync()
        {
            return await _context.VipPackages.ToListAsync();
        }

        public async Task<VipRecord> GetByIdAsync(int id)
        {
            var result = await _context.VipPackages.FirstOrDefaultAsync(p => p.Id == id);

            return result;
        }

        public async Task<VipRecord> GetVipByUserIdAsync(string id)
        {
            var result = await _context.VipPackages.Include(u => u.User).Where(u => u.UserId.Equals(id)).FirstOrDefaultAsync();

            return result;
        }

        public async Task<VipRecord> GetVipPackageByName(string name)
        {
            var result = await _context.VipPackages.Where(u => u.Name.Equals(name)).FirstOrDefaultAsync();

            return result;
        }
    }
}
