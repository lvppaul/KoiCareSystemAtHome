using Domain.Models;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;
using SWP391.KCSAH.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SWP391.KCSAH.Repository.KCSAH.Repository
{
    public class KoiRepository : GenericRepository<Koi>
    {
        public KoiRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<Koi>> GetAllAsync()
        {
            return await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).ToListAsync();
        }

        public async Task<Koi> GetByIdAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).FirstAsync(p => p.KoiId.Equals(id));

            return result;
        }

    }
}
