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
   public class KoiImageRepository: GenericRepository<KoiImage>
    {
        public KoiImageRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<KoiImage>> GetAllAsync()
        {
            return await _context.KoiImages.ToListAsync();
        }

        public async Task<KoiImage> GetByIdAsync(int id)
        {
            var result = await _context.KoiImages.FirstOrDefaultAsync(p => p.ImageId == id);

            return result;
        }
    }
}

