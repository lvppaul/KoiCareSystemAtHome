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
    public class KoiRecordRepository:GenericRepository<KoiRecord>
    {
        public KoiRecordRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<KoiRecord>> GetAllAsync()
        {
            return await _context.KoiRecords.ToListAsync();
        }

        public async Task<KoiRecord> GetByIdAsync(int id)
        {
            var result = await _context.KoiRecords.FirstOrDefaultAsync(p => p.RecordId == id);

            return result;
        }

        public async Task<List<KoiRecord>> GetRecordByKoiIdAsync(int koiId)
        {
            var result = await _context.KoiRecords.Where(k => k.KoiId == koiId).ToListAsync();

            return result;
        }
    }
}
