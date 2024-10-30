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
    public class OrderVipDetailRepository:GenericRepository<OrderVipDetail>
    {
        public OrderVipDetailRepository(KoiCareSystemAtHomeContext context) => _context = context;

    }
}
