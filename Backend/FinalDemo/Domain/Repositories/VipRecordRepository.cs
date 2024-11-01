using Domain.Models.Dto.Request;
using Domain.Models.Dto.Update;
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
    public class VipRecordRepository : GenericRepository<VipRecord>
    {
        public VipRecordRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<VipRecord> GetVipRecordByUserIdAsync(string id)
        {
            var result = await _context.VipRecords.Include(u => u.User).Where(u => u.UserId.Equals(id)).FirstOrDefaultAsync();

            return result;
        }

        public async Task<List<VipRecord>> GetAllAsync()
        {
            return await _context.VipRecords.ToListAsync();
        }

        public async Task<VipRecord> GetByIdAsync(int id)
        {
            var result = await _context.VipRecords.FirstOrDefaultAsync(p => p.Id == id);

            return result;
        }

        public async Task<bool> CheckDateCreateInput(VipRecordRequestDTO viprecorddto)
        {
            if(viprecorddto == null) return false;
            //if(viprecorddto.StartDate< viprecorddto.CreateDate) return false;
            if(viprecorddto.StartDate > viprecorddto.EndDate) return false;

            return true;
        }

        //public async Task<bool> CheckDateUpdateInput(VipRecordUpdateDTO viprecorddto)
        //{
        //    if (viprecorddto == null) return false;
        //    if (viprecorddto.StartDate < viprecorddto.CreateDate) return false;
        //    if (viprecorddto.StartDate > viprecorddto.EndDate) return false;

        //    return true;
        //}
    }
}
