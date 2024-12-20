﻿using Domain.Models;
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
    public class KoiRemindRepository: GenericRepository<KoiRemind>
    {
        public KoiRemindRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<KoiRemind>> GetAllAsync()
        {
            return await _context.KoiReminds.ToListAsync();
        }

        public async Task<KoiRemind> GetByIdAsync(int id)
        {
            var result = await _context.KoiReminds.FirstOrDefaultAsync(p => p.RemindId == id);

            return result;
        }

        public async Task<List<KoiRemind>> GetKoiRemindByKoiId(int koiId)
        {
            var result = await _context.KoiReminds.Where(k => k.KoiId == koiId).ToListAsync();  

            return result;
        }

        public async Task<List<KoiRemind>> GetKoiRemindByUserId(string userId)
        {
            var result = await _context.KoiReminds.Where(k => k.UserId.Equals(userId)).ToListAsync();

            return result;
        }
    }
}
