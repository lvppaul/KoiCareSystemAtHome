using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Models;
using SWP391.KCSAH.Repository;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PondController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        public PondController(UnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pond>>> GetAllAsync()
        {
            return await _unitOfWork.PondRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pond>> GetPondById(string id)
        {
            var pond = await _unitOfWork.PondRepository.GetByIdAsync(id);
            if (pond == null)
            {
                return NotFound();
            }

            return pond;
        }

        [HttpPost]
        public async Task<ActionResult<Pond>> CreatePond(Pond pond)
        {
            try
            {
                await _unitOfWork.PondRepository.CreateAsync(pond);
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error saving the user.");
            }
            return CreatedAtAction("GetPondById", new { id = pond.PondId }, pond);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePond(string id, Pond pond)
        {
            if (!id.Equals(pond.PondId))
            {
                return BadRequest();
            }

            try
            {
                _unitOfWork.PondRepository.UpdateAsync(pond);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PondExists(id))
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePond(string id)
        {
            var pond = await _unitOfWork.PondRepository.GetByIdAsync(id);
            if (pond == null)
            {
                return NotFound();
            }
            await _unitOfWork.PondRepository.RemoveAsync(pond);

            return NoContent();
        }
        private bool PondExists(string id)
        {
            return _unitOfWork.PondRepository.GetByIdAsync(id) != null;
        }
    }
}
