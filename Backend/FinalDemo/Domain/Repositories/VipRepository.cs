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
    public class VipRepository: GenericRepository<Vip>
    {
        public VipRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<Vip>> GetAllAsync()
        {
            return await _context.Vips.ToListAsync();
        }

        public async Task<Vip> GetByIdAsync(int id)
        {
            var result = await _context.Vips.FirstOrDefaultAsync(p => p.Id == id);

            return result;
        }
    }
}
