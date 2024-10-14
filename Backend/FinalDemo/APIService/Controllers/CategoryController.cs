using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;
using AutoMapper;
using KCSAH.APIServer.Dto;
using Domain.Models;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CategoryController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetAllASync()
        {
            var categories = await _unitOfWork.CategoryRepository.GetAllAsync();
            var categoryDTOs = _mapper.Map<List<CategoryDTO>>(categories);
            return Ok(categoryDTOs);
        }


        [HttpGet("{id}")]
        public  ActionResult<CategoryDTO> GetById(string id)
        {
            var category =  _unitOfWork.CategoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<CategoryDTO>(category);
            return result;
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<CategoryDTO>> GetByIdAsync(string id)
        {
            var category = await _unitOfWork.CategoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<CategoryDTO>(category);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory([FromBody] CategoryDTO category)
        {
            if (category == null)
            {
                return BadRequest(ModelState);
            }

            var cate = _unitOfWork.CategoryRepository.GetAll().Where(c => c.Name.ToUpper() == category.Name.ToUpper()).FirstOrDefault();

            if (cate != null)
            {
                ModelState.AddModelError("", "Category already exists.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var categoryMap = _mapper.Map<Category>(category);
            var createResult = await _unitOfWork.CategoryRepository.CreateAsync(categoryMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }

            return CreatedAtAction("GetById", new {id = category.CategoryId},category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(string id, [FromBody] CategoryDTO categoryDto)
        {
            if (categoryDto == null)
            {
                return BadRequest();
            }

            // Lấy thực thể category hiện tại từ cơ sở dữ liệu
            var existingCategory = await _unitOfWork.CategoryRepository.GetByIdAsync(id);
            if (existingCategory == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy category
            }

            // Cập nhật các thuộc tính của existingCategory bằng cách ánh xạ từ categoryDto
            _mapper.Map(categoryDto, existingCategory);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.CategoryRepository.UpdateAsync(existingCategory);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating category");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }

            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
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

