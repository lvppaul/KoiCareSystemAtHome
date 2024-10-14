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
    public class BlogImageRepository: GenericRepository<BlogImage>
    {
        public BlogImageRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<BlogImage>> GetAllAsync()
        {
            return await _context.BlogImages.ToListAsync();
        }

        public async Task<BlogImage> GetByIdAsync(int id)
        {
            var result = await _context.BlogImages.FirstOrDefaultAsync(p => p.ImageId.Equals(id));

            return result;
        }
    }
}
