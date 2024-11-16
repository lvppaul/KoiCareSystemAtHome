using Domain.Models;
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
            var result = await _context.Ponds.Include(p => p.Kois).FirstAsync(p => p.PondId.Equals(id) && p.IsDeleted == false);

            return result;
        }

        public async Task<bool> PondNameExisted(string userId, string name)
        {
            return await _context.Ponds.AnyAsync(p => p.UserId.Equals(userId) && p.Name.Equals(name) && p.IsDeleted == false);
        }

        public async Task<bool> KoiExistInPond(int pondId)
        {
            return await _context.Kois.AnyAsync(p => p.PondId == pondId && p.IsDeleted == false);
        }

        public async Task<List<Koi>> GetKoisByPondId(int pondId)
        {
            return await _context.Kois.Where(k => k.PondId == pondId && k.IsDeleted == false).ToListAsync();
        }
    }
}
