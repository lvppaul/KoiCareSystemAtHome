using AutoMapper;
using Domain.Helper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
using Domain.Models.Entity;
using KCSAH.APIServer.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;

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
        //[Authorize(Roles = AppRole.Admin)]
        //[Authorize(Roles = AppRole.Member)]
        //[Authorize(Roles = AppRole.Vip)]
        public async Task<ActionResult<IEnumerable<ShopDTO>>> GetAllSync()
        {
            var shops = await _unitOfWork.ShopRepository.GetAllAsync();
            var shopDTOs = _mapper.Map<List<ShopDTO>>(shops);
            return Ok(shopDTOs);
        }

        [HttpGet("GetShopByShopId/{id}")]
        //[Authorize(Roles = AppRole.Admin)]
        //[Authorize(Roles = AppRole.Member)]
        //[Authorize(Roles = AppRole.Vip)]
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

        [HttpGet("UserId/{id}")]
   //     [Authorize(Roles =AppRole.Admin)]
        public async Task<IActionResult> GetShopByUserIdAsync(string id)
        {
            var result = await _unitOfWork.ShopRepository.GetShopByUID(id);
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<ShopDTO>(result);
            return Ok(show);
        }


        //[HttpGet("GetShopCategoryList/{shopId}")]
        //     [Authorize(Roles =AppRole.Admin)]
        //public async Task<IActionResult> GetShopByUserIdAsync(int shopId)
        //{
        //    var result = await _unitOfWork.ShopRepository.GetCategoryListByShopId(shopId);
        //    if (result == null)
        //    {
        //        return NotFound();
        //    }
        //    var show = _mapper.Map<List<CategoryDTO>>(result);
        //    return Ok(show);
        //}

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
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
        public async Task<ActionResult<Shop>> CreateShop([FromBody] ShopRequestDTO shopdto)
        {
            if (shopdto == null)
            {
                return BadRequest("Invalid request. Shop data cannot be null.");
            }
            var name = _unitOfWork.ShopRepository.GetAll().Where(c => c.ShopName.ToUpper().Equals(shopdto.ShopName.ToUpper())).FirstOrDefault();
            var phone = _unitOfWork.ShopRepository.GetAll().Where(c => c.Phone == shopdto.Phone).FirstOrDefault();
            var email = _unitOfWork.ShopRepository.GetAll().Where(c => c.Email == shopdto.Email).FirstOrDefault();

            if(name != null)
            {
                return StatusCode(422, "This shop name cant be the same with another shop.");
            }
            if (phone != null)
            {
                return StatusCode(422, "This phone number has already existed.");
            }

            if (email != null)
            {
                return StatusCode(422, "This email has already been registered.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model state.");
            }

            var shopMap = _mapper.Map<Shop>(shopdto);
            var createResult = await _unitOfWork.ShopRepository.CreateAsync(shopMap);

            if (createResult <= 0)
            {
                return StatusCode(500, "Something went wrong while saving the shop.");
            }

            var shopReturn = _mapper.Map<ShopDTO>(shopMap);
            return CreatedAtAction("GetById", new { id = shopReturn.ShopId }, shopReturn);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShop(int id, [FromBody] ShopUpdateDTO shopdto)
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
