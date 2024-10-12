using AutoMapper;
using KCSAH.APIServer.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;
using SWP391.KCSAH.Repository.Models;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ShopController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShopDTO>>> GetAllSync()
        {
            var shops = await _unitOfWork.ShopRepository.GetAllAsync();
            var shopDTOs = _mapper.Map<List<ShopDTO>>(shops);
            return Ok(shopDTOs);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<ShopDTO>> GetByIdAsync(int id)
        {
            var shop = await _unitOfWork.ShopRepository.GetByIdAsync(id);
            if (shop == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ShopDTO>(shop);
            return result;
        }

        [HttpGet("{id}")]
        public ActionResult<ShopDTO> GetById(int id)
        {
            var shop =  _unitOfWork.ShopRepository.GetById(id);
            if (shop == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ShopDTO>(shop);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Shop>> CreateShop([FromBody] ShopDTO shopdto)
        {
            if (shopdto == null)
            {
                return BadRequest(ModelState);
            }

            var shop = _unitOfWork.ShopRepository.GetAll().Where(c => c.ShopName.ToUpper() == shopdto.ShopName.ToUpper()).FirstOrDefault();

            if (shop != null)
            {
                ModelState.AddModelError("", "This name has already existed.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var shopMap = _mapper.Map<Shop>(shopdto);
            var createResult = await _unitOfWork.ShopRepository.CreateAsync(shopMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }

            return CreatedAtAction("GetById", new { id = shopdto.ShopId }, shopdto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShop(int id, [FromBody] ShopDTO shopdto)
        {
            if (shopdto == null)
            {
                return BadRequest();
            }

            // Lấy thực thể category hiện tại từ cơ sở dữ liệu
            var existingShop = await _unitOfWork.ShopRepository.GetByIdAsync(id);
            if (existingShop == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy category
            }

            // Cập nhật các thuộc tính của existingCategory bằng cách ánh xạ từ categoryDto
            _mapper.Map(shopdto, existingShop);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.ShopRepository.UpdateAsync(existingShop);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating shop");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }

            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShop(int id)
        {
            var shop = await _unitOfWork.ShopRepository.GetByIdAsync(id);

            if (shop == null)
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
