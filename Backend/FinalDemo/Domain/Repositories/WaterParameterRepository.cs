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
    public class WaterParameterRepository : GenericRepository<WaterParameter>
    {
        public WaterParameterRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<WaterParameter>> GetByPondId(int pondId)
        {
            var result = _context.WaterParameters.Where(w => w.PondId == pondId).ToListAsync();

            return await result;
        }
    }
}
