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


        public async Task<VipPackage> GetVipPackageByName(string name)
        {
            var result = await _context.VipPackages.Where(u => u.Name.Equals(name)).FirstOrDefaultAsync();

            return result;
        }
    }
}
