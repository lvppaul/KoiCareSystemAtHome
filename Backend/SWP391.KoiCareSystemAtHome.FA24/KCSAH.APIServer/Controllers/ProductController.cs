using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Models;
using SWP391.KCSAH.Repository;
using AutoMapper;
using KCSAH.APIServer.Dto;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProductController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetAllSync()
        {
            var products = await _unitOfWork.ProductRepository.GetAllAsync();
            var productDTOs = _mapper.Map<List<ProductDTO>>(products);
            return Ok(productDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetByIdAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ProductDTO>(product);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] ProductDTO productdto)
        {
            if (productdto == null)
            {
                return BadRequest(ModelState);
            }

            var shop = _unitOfWork.ProductRepository.GetAll().Where(c => c.Name.ToUpper() == productdto.Name.ToUpper()).FirstOrDefault();

            if (shop != null)
            {
                ModelState.AddModelError("", "This name has already existed.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var productMap = _mapper.Map<Product>(productdto);
            var createResult = await _unitOfWork.ProductRepository.CreateAsync(productMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductDTO productdto)
        {
            if (productdto == null)
            {
                return BadRequest();
            }

            // Lấy thực thể category hiện tại từ cơ sở dữ liệu
            var existingProduct = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy category
            }

            // Cập nhật các thuộc tính của existingCategory bằng cách ánh xạ từ categoryDto
            _mapper.Map(productdto, existingProduct);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.ProductRepository.UpdateAsync(existingProduct);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating category");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }

            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            await _unitOfWork.ProductRepository.RemoveAsync(product);

            return NoContent();
        }
        private bool ProductExists(string id)
        {
            return _unitOfWork.ProductRepository.GetByIdAsync(id) != null;
        }
    }
}

