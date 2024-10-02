using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;
using SWP391.KCSAH.Repository.Models;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : Controller
    {
        private readonly UnitOfWork _unitOfWork;

        public ShopController(UnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shop>>> GetAllSync()
        {
            return await _unitOfWork.ShopRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shop>> GetByIdAsync(int id)
        {
            var result = await _unitOfWork.ShopRepository.GetByIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Shop>> CreateShop(Shop shop)
        {
            try
            {
                await _unitOfWork.ShopRepository.CreateAsync(shop);
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error saving object");
            }

            return shop;
        }
    }
}
