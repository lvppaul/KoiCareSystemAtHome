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
    public class PaymentTransactionRepository:GenericRepository<PaymentTransaction>
    {
        public PaymentTransactionRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<PaymentTransaction>> GetImageByProductId(int id)
        {
            return await _context.PaymentTransactions.Where(p => p.Id.Equals(id)).ToListAsync();
        }
    }
}
