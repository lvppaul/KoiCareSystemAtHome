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
    }
}
