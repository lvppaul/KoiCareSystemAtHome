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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShop(int id, Shop shop)
        {
            if (id != shop.ShopId)
            {
                return BadRequest();
            }
            try
            {
                _unitOfWork.ShopRepository.UpdateAsync(shop);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopExists(shop.ShopId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShop(int id)
        {
            var shop = await _unitOfWork.ShopRepository.GetByIdAsync(id);

            if(shop == null)
            {
                return NotFound();
            }

            await _unitOfWork.ShopRepository.RemoveAsync(shop);

            return NoContent();
        }
        private bool ShopExists(int id) 
        { 
            return _unitOfWork.ShopRepository.GetByIdAsync(id) == null;    
        }
    }
}
