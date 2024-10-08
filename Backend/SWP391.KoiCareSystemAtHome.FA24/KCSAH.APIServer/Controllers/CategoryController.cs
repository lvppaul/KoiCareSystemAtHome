using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Models;
using SWP391.KCSAH.Repository;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public CategoryController(UnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllSync()
        {
            return await _unitOfWork.CategoryRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetByIdAsync(string id)
        {
            var result = await _unitOfWork.CategoryRepository.GetByIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category category)
        {
            try
            {
                await _unitOfWork.CategoryRepository.CreateAsync(category);
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error saving category");
            }

            return CreatedAtAction("GetCategoryById", new { id = category.CategoryId }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(string id, Category category)
        {
            if (!id.Equals(category.CategoryId))
            {
                return BadRequest();
            }
            try
            {
                _unitOfWork.CategoryRepository.UpdateAsync(category);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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
        public async Task<IActionResult> DeleteCategory(string id)
        {
            var category = await _unitOfWork.CategoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            await _unitOfWork.CategoryRepository.RemoveAsync(category);

            return NoContent();
        }
        private bool CategoryExists(string id)
        {
            return _unitOfWork.CategoryRepository.GetByIdAsync(id) == null;
        }
    }
}

