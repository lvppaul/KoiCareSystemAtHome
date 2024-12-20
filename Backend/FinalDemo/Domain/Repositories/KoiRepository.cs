﻿using Domain.Models;
using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;

namespace SWP391.KCSAH.Repository.KCSAH.Repository
{
    public class KoiRepository : GenericRepository<Koi>
    {
        public KoiRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<Koi>> GetAllAsync()
        {
            return await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).ToListAsync();
        }

        public async Task<Koi> GetByIdAsync(int id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).FirstAsync(p => p.KoiId.Equals(id));

            return result;
        }

        public async Task<List<Koi>> GetAllKoiByUserIdAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiByUserIdAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == true && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiDeadAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == false && k.IsDeleted == false).ToListAsync();

            return result;
        }
        public async Task<List<Koi>> GetKoiFemaleAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Sex.ToUpper().Equals("FEMALE") && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiMaleAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Sex.ToUpper().Equals("MALE") && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiFemaleAliveAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == true && k.Sex.ToUpper().Equals("FEMALE") && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiFemaleDeadAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == false && k.Sex.ToUpper().Equals("FEMALE") && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiMaleAliveAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == true && k.Sex.ToUpper().Equals("MALE") && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiMaleDeadAsync(string id)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == false && k.Sex.ToUpper().Equals("MALE") && k.IsDeleted == false).ToListAsync();

            return result;
        }


        public async Task<List<Koi>> GetKoiMaleAliveInPondAsync(string id, int pondId)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == true && k.Sex.ToUpper().Equals("MALE") && k.PondId == pondId && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiFemaleAliveInPondAsync(string id, int pondId)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == true && k.Sex.ToUpper().Equals("FEMALE") && k.PondId == pondId && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiMaleDeadInPondAsync(string id, int pondId)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == false && k.Sex.ToUpper().Equals("MALE") && k.PondId == pondId && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<List<Koi>> GetKoiFemaleDeadInPondAsync(string id, int pondId)
        {
            var result = await _context.Kois.Include(p => p.ApplicationUser).Include(p => p.Pond).Include(p => p.KoiImages).Include(p => p.KoiRecords).Include(p => p.KoiReminds).Where(k => k.UserId.Equals(id) && k.Status == false && k.Sex.ToUpper().Equals("FEMALE") && k.PondId == pondId && k.IsDeleted == false).ToListAsync();

            return result;
        }

        public async Task<bool> KoiNameExisted(string userId, string name)
        {
            return await _context.Kois.AnyAsync(k => k.UserId.Equals(userId) && k.Name.Equals(name) && k.IsDeleted == false);
        }

        public async Task<bool> KoiNameUpdateExisted(string userId, string name, int id)
        {
            return await _context.Kois.AnyAsync(k => k.UserId.Equals(userId) && k.Name.Equals(name) && k.IsDeleted == false && k.KoiId != id);
        }
    }
}
