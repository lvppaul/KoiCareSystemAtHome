using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Models;
using SWP391.KCSAH.Repository;
using AutoMapper;
using KCSAH.APIServer.Dto;
using Domain.Models;
using Domain.Models.Dto;

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
        public async Task<ActionResult<IEnumerable<ProductRequestDTO>>> GetAllSync()
        {
            var products = await _unitOfWork.ProductRepository.GetAllAsync();
            var productDTOs = _mapper.Map<List<ProductRequestDTO>>(products);
            return Ok(productDTOs);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<ProductRequestDTO>> GetByIdAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ProductRequestDTO>(product);
            return result;
        }

        [HttpGet("{id}")]
        public ActionResult<ProductRequestDTO> GetById(int id)
        {
            var product =  _unitOfWork.ProductRepository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ProductRequestDTO>(product);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] ProductRequestDTO productdto)
        {
            if (productdto == null)
            {
                return BadRequest(ModelState);
            }

            // Kiểm tra danh mục có tồn tại hay không
            var category = await _unitOfWork.CategoryRepository.GetByIdAsync(productdto.CategoryId);

            // Nếu danh mục không tồn tại, tạo danh mục mới
            if (category == null)
            {
                ModelState.AddModelError("", "This category does not exist.");
                return BadRequest(ModelState);
            }

            // Kiểm tra xem sản phẩm có tên trùng lặp hay không
            var existingProduct = _unitOfWork.ProductRepository.GetAll()
                .FirstOrDefault(c => c.Name.ToUpper() == productdto.Name.ToUpper());

            if (existingProduct != null)
            {
                ModelState.AddModelError("", "This name has already existed.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Ánh xạ từ ProductDTO sang Product và liên kết với danh mục đã có hoặc mới tạo
            var productMap = _mapper.Map<Product>(productdto);
            productMap.CategoryId = category.CategoryId;  // Liên kết với danh mục hiện tại

            var createResult = await _unitOfWork.ProductRepository.CreateAsync(productMap);

            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the product.");
                return StatusCode(500, ModelState);
            }
            return CreatedAtAction("GetById",new { id = productdto.ProductId }, productdto);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, [FromBody] ProductRequestDTO productdto)
        {
            if (productdto == null)
            {
                return BadRequest();
            }

            // Lấy thực thể product hiện tại từ cơ sở dữ liệu
            var existingProduct = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy sản phẩm
            }

            // Cập nhật các thuộc tính của existingProduct bằng cách ánh xạ từ productDto
            _mapper.Map(productdto, existingProduct);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.ProductRepository.UpdateAsync(existingProduct);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating product");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }

            // Gọi phương thức bất đồng bộ để lấy thông tin Category
            var category = await GetCategoryAsync(productdto.CategoryId);

            // Trả về kết quả cập nhật
            var productReturn = _mapper.Map<ProductDTO>(productdto);
            productReturn.category = category;

            return Ok(productReturn); // Trả về 200 OK với sản phẩm đã cập nhật
        }

        private async Task<CategoryDTO> GetCategoryAsync(int id)
        {
            var category = await _unitOfWork.CategoryRepository.GetByIdAsync(id);

            // Sử dụng AutoMapper để ánh xạ từ Category sang CategoryDTO
            return _mapper.Map<CategoryDTO>(category);
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

