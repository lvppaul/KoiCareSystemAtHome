using Domain.Models;
using Domain.Models.Entity;
using KCSAH.APIServer.Dto;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;

namespace KCSAH.APIServer.Services
{
    public class PondService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly KoiCareSystemAtHomeContext _context;
        public PondService(UnitOfWork unitOfWork, KoiCareSystemAtHomeContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        public async Task<int> GetNumberofFish(int id)
        {
            var result = await _unitOfWork.PondRepository.GetByIdAsync1(id);
            if(result == null)
            {
                return 0;
            }
            var count = result.Kois.Count;
            return count;
        }

        public async Task<List<Pond>> GetPondByUserIdAsync(string id)
        {
            return await _context.Ponds.Where(p => p.UserId.Equals(id)).ToListAsync();
        }

        public async Task<List<Koi>> GetKoiInPond(int id)
        {
            return await _context.Kois.Include(k => k.KoiImages)
                .Include(k => k.KoiReminds)
                .Include(k => k.KoiRecords)
                .Where(k => k.PondId.Equals(id)).ToListAsync();
        }

        public async Task<List<WaterParameter>> GetPondWaterParameter(int id)
        {
            return await _context.WaterParameters.Where(w => w.PondId == id).ToListAsync();
        }
    }
}
