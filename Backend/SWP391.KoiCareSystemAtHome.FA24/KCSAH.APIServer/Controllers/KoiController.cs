using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Koi>> GetKoiById(string id)
        {
            var koi = await _unitOfWork.KoiRepository.GetByIdAsync(id);
            if(koi == null)
            {
                return NotFound();
            }

            return koi;
        }

        [HttpPost]
        public async Task<ActionResult<Koi>> CreateKoi(Koi koi)
        {
            try
            {
                await _unitOfWork.KoiRepository.CreateAsync(koi);
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error saving the user.");
            }
            return CreatedAtAction("GetKoiById", new { id = koi.KoiId }, koi);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKoi(string id, Koi koi)
        {
            if (!id.Equals(koi.KoiId))
            {
                return BadRequest();
            }

            try
            {
                _unitOfWork.KoiRepository.UpdateAsync(koi);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KoiExists(id))
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKoi(string id)
        {
            var koi = await _unitOfWork.KoiRepository.GetByIdAsync(id);
            if(koi == null)
            {
                return NotFound();
            }
            await _unitOfWork.KoiRepository.RemoveAsync(koi);

            return NoContent();
        }
        private bool KoiExists(string id)
        {
            return _unitOfWork.KoiRepository.GetByIdAsync(id) != null;
        }
    }
}
