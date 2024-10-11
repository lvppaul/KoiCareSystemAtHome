using AutoMapper;
using KCSAH.APIServer.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository.Models;
using SWP391.KCSAH.Repository;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CartController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartDTO>>> GetAllSync()
        {
            var carts = await _unitOfWork.CartRepository.GetAllAsync();
            var cartDTOs = _mapper.Map<List<CartDTO>>(carts);
            return Ok(cartDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CartDTO>> GetByIdAsync(int id)
        {
            var cart = await _unitOfWork.CartRepository.GetByIdAsync(id);
            if (cart == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<CartDTO>(cart);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Cart>> CreateCart([FromBody] CartDTO cartdto)
        {
            if (cartdto == null)
            {
                return BadRequest(ModelState);
            }

            var cart = _unitOfWork.CartRepository.GetAll().Where(c => c.CartId == cartdto.CartId).FirstOrDefault();

            if (cart != null)
            {
                ModelState.AddModelError("", "This id has already existed.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var cartMap = _mapper.Map<Cart>(cartdto);
            var createResult = await _unitOfWork.CartRepository.CreateAsync(cartMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCart(string id, [FromBody] CartDTO cartdto)
        {
            if (cartdto == null)
            {
                return BadRequest();
            }

            var existingCart = await _unitOfWork.CartRepository.GetByIdAsync(id);
            if (existingCart == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy 
            }

            // Cập nhật các thuộc tính của existingCategory bằng cách ánh xạ từ cartDto
            _mapper.Map(cartdto, existingCart);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.CartRepository.UpdateAsync(existingCart);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating cart");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }

            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(string id)
        {
            var cart = await _unitOfWork.CartRepository.GetByIdAsync(id);
            if (cart == null)
            {
                return NotFound();
            }
            await _unitOfWork.CartRepository.RemoveAsync(cart);

            return NoContent();
        }
        private bool CartExists(string id)
        {
            return _unitOfWork.CartRepository.GetByIdAsync(id) != null;
        }
    }
}
