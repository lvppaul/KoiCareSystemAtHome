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
    public class PondRepository : GenericRepository<Pond>
    {
        public PondRepository(KoiCareSystemAtHomeContext context) => _context = context;


        public async Task<Pond> GetByIdAsync1(int id)
        {
            var result = await _context.Ponds.Include(p => p.Kois).FirstAsync(p => p.PondId.Equals(id));

            return result;
        }
    }
}
