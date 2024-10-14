using KCSAH.APIServer.Dto;
using SWP391.KCSAH.Repository;

namespace KCSAH.APIServer.Services
{
    public class PondService
    {
        private readonly UnitOfWork _unitOfWork;
        public PondService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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

        //public async Task<List<PondDTO>> GetPondByUserId(string id)
        //{
            
        //}
    }
}
