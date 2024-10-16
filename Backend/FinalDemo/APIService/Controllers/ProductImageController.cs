using AutoMapper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductImageController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductImageDTO>>> GetAllSync()
        {
            var productImages = await _unitOfWork.ProductImageRepository.GetAllAsync();
            var productImageDTOs = _mapper.Map<List<ProductImageDTO>>(productImages);
            return Ok(productImageDTOs);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<ProductImageDTO>> GetByIdAsync(int id)
        {
            var productImage = await _unitOfWork.ProductImageRepository.GetByIdAsync(id);
            if (productImage == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ProductImageDTO>(productImage);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<ProductImageDTO> GetById(int id)
        {
            var productImage = _unitOfWork.ProductImageRepository.GetById(id);
            if (productImage == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ProductImageDTO>(productImage);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<ProductImageDTO>> CreateProductImage([FromBody] ProductImageRequestDTO productImagedto)
        {
            if (productImagedto == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var productImageMap = _mapper.Map<ProductImage>(productImagedto);
            var createResult = await _unitOfWork.ProductImageRepository.CreateAsync(productImageMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            // Cập nhật lại giá trị ShopId cho shopdto từ shopMap
            var productImageReturn = _mapper.Map<ProductImageDTO>(productImageMap);
            return CreatedAtAction("GetById", new { id = productImageReturn.ImageId }, productImageReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductImage(int id, [FromBody] ProductImageUpdateDTO productImagedto)
        {
            if (productImagedto == null)
            {
                return BadRequest();
            }

            var existingProductImage = await _unitOfWork.ProductImageRepository.GetByIdAsync(id);
            if (existingProductImage == null)
            {
                return NotFound();
            }

            _mapper.Map(productImagedto, existingProductImage);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.ProductImageRepository.UpdateAsync(existingProductImage);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating productImage");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }


            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductImage(int id)
        {
            var productImage = await _unitOfWork.ProductImageRepository.GetByIdAsync(id);

            if (productImage == null)
            {
                return NotFound();
            }

            await _unitOfWork.ProductImageRepository.RemoveAsync(productImage);

            return NoContent();
        }
    }
}
