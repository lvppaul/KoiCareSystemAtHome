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
    public class NewsRepository : GenericRepository<News>
    {
        public NewsRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<News>> GetAllAsync()
        {
            return await _context.News.Include(p => p.NewsImages).ToListAsync();
        }
        public async Task<News> GetByIdAsync(int id)
        {
            var result = await _context.News.Include(p => p.NewsImages).FirstAsync(p => p.NewsId == id);

            return result;
        }
    }
}
