using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;
using SWP391.KCSAH.Repository.Models;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KoiController : Controller
    {
        private readonly UnitOfWork _unitOfWork;
        public KoiController(UnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Koi>>> GetAllAsync()
        {
            return await _unitOfWork.KoiRepository.GetAllAsync();
        }


    }
}
