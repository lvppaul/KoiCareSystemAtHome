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
    public class VipPackageRepository: GenericRepository<VipPackage>
    {
        public VipPackageRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<VipPackage>> GetAllAsync()
        {
            return await _context.VipPackages.ToListAsync();
        }

        public async Task<VipPackage> GetByIdAsync(int id)
        {
            var result = await _context.VipPackages.FirstOrDefaultAsync(p => p.VipId == id);

            return result;
        }

        public async Task<VipPackage> GetVipPackageByNameAsync(string name)
        {
            var result = await _context.VipPackages.Where(u => u.Name.Equals(name)).FirstOrDefaultAsync();

            return result;
        }

        public Task<bool> CheckVipPackageOptionsCreateAsync(int op)
        {
            var result = false;
            if (op ==1 || op==6 || op ==12)
            {
                result = true;
            }
            return Task.FromResult(result);
        }

        public async Task<bool> CheckVipPackageNameExistCreateAsync(string name)
        {
            var result = false;
            var exist = await GetVipPackageByNameAsync(name);
            if(exist != null)
            {
                result = true;
            }
            return result;
        }

        public async Task<bool> CheckVipPackageNameExistUpdateAsync(int id,string name)
        {
            var result = false;
            var exist = await GetVipPackageByNameAsync(name);
            if (exist != null )
            {
                if(exist.VipId == id)
                {
                    return false;
                }
                else
                {
                    result = true;
                }
            }
            return result;
        }

        public async Task<VipPackage> GetVipPackageByOrderIdAsync(int orderId)
        {
            var order = await _context.Orders.Where(o => o.OrderId == orderId).Include(p => p.OrderVipDetails).ThenInclude(v => v.VipPackage).FirstOrDefaultAsync();
            if(order != null)
            {
                foreach (var item in order.OrderVipDetails)
                {
                    return item.VipPackage;
                }
            }
            return null;
            
        }
    }
}
