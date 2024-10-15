using Domain.Models.Entity;
using SWP391.KCSAH.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public class NewsImageRepository : GenericRepository<NewsImage>
    {
        public NewsImageRepository(KoiCareSystemAtHomeContext context) => _context = context; 
    }
}
