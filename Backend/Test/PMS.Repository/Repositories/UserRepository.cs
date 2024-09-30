using PMS.Repository.Base;
using PMS.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Repository.Repositories
{
    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(KoiCareSystemAtHomeContext context) { _context = context;  }
    }
}
