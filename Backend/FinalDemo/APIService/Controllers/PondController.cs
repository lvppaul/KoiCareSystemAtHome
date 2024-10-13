using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Models;
using SWP391.KCSAH.Repository;
using AutoMapper;
using KCSAH.APIServer.Dto;
using KCSAH.APIServer.Services;
using Domain.Models;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PondController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly PondService _getfood;
        public PondController(UnitOfWork unitOfWork, IMapper mapper, PondService getfood)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _getfood = getfood;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PondDTO>>> GetAllAsync()
        {
            var ponds = await _unitOfWork.PondRepository.GetAllAsync();
            var pondMap = _mapper.Map<IEnumerable<PondDTO>>(ponds);
            return Ok(pondMap);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<PondDTO>> GetByIdAsync(string id)
        {
            var pond = await _unitOfWork.PondRepository.GetByIdAsync(id);
            if (pond == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<PondDTO>(pond);
            return result;
        }

        [HttpGet("{id}")]
        public ActionResult<PondDTO> GetById(string id)
        {
            var pond =  _unitOfWork.PondRepository.GetById(id);
            if (pond == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<PondDTO>(pond);
            return result;
        }

        [HttpGet("GetFishNumber/{id}")]
        public async Task<IActionResult> GetFood(string id)
        {
            var result = await _getfood.GetNumberofFish(id);
            return Ok(result);
        }

        [HttpGet("GetPondByUserId/{id}")]
        public async Task<IActionResult> GetPond(string id)
        {
            var result = await _getfood.GetNumberofFish(id);
            return Ok(result);
        }
        [HttpPost]
        public async Task<ActionResult<Pond>> CreatePond([FromBody] PondDTO ponddto)
        {
            if (ponddto == null)
            {
                return BadRequest(ModelState);
            }

            var pond = _unitOfWork.PondRepository.GetAll().Where(c => c.Name.ToUpper() == ponddto.Name.ToUpper()).FirstOrDefault();

            if (pond != null)
            {
                ModelState.AddModelError("", "This name has already existed.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var pondMap = _mapper.Map<Pond>(ponddto);
            var createResult = await _unitOfWork.PondRepository.CreateAsync(pondMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }

            return CreatedAtAction("GetById",new {id = ponddto.PondId},ponddto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePond(int id, [FromBody] PondDTO ponddto)
        {
            if (ponddto == null)
            {
                return BadRequest();
            }

            // Lấy thực thể category hiện tại từ cơ sở dữ liệu
            var existingPond = await _unitOfWork.PondRepository.GetByIdAsync(id);
            if (existingPond == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy category
            }

            // Cập nhật các thuộc tính của existingCategory bằng cách ánh xạ từ categoryDto
            _mapper.Map(ponddto, existingPond);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.PondRepository.UpdateAsync(existingPond);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating category");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }

            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
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
