using Domain.Models.Entity;
using SWP391.KCSAH.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public class PaymentMethodRepository : GenericRepository<PaymentMethod>
    {
        public PaymentMethodRepository(KoiCareSystemAtHomeContext context) => _context = context;
        

    }
}
