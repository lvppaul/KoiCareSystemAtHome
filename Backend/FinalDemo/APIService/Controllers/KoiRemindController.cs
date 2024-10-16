using AutoMapper;
using Domain.Models;
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
    public class KoiRemindController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public KoiRemindController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<KoiRemindDTO>>> GetAllSync()
        {
            var koiReminds = await _unitOfWork.KoiRemindRepository.GetAllAsync();
            var koiRemindDTOs = _mapper.Map<List<KoiRemindDTO>>(koiReminds);
            return Ok(koiRemindDTOs);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<KoiRemindDTO>> GetByIdAsync(int id)
        {
            var koiRemind = await _unitOfWork.KoiRemindRepository.GetByIdAsync(id);
            if (koiRemind == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<KoiRemindDTO>(koiRemind);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<KoiRemindDTO> GetById(int id)
        {
            var koiRemind = _unitOfWork.KoiRemindRepository.GetById(id);
            if (koiRemind == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<KoiRemindDTO>(koiRemind);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<KoiRemindDTO>> CreateKoiRemind([FromBody] KoiRemindRequestDTO koiReminddto)
        {
            if (koiReminddto == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var koiRemindMap = _mapper.Map<KoiRemind>(koiReminddto);
            var createResult = await _unitOfWork.KoiRemindRepository.CreateAsync(koiRemindMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            // Cập nhật lại giá trị ShopId cho shopdto từ shopMap
            var koiRemindReturn = _mapper.Map<KoiRemindDTO>(koiRemindMap);
            return CreatedAtAction("GetById", new { id = koiRemindReturn.RemindId }, koiRemindReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKoiRemind(int id, [FromBody] KoiRemindUpdateDTO koiReminddto)
        {
            if (koiReminddto == null)
            {
                return BadRequest();
            }

            // Lấy thực thể category hiện tại từ cơ sở dữ liệu
            var existingKoiRemind = await _unitOfWork.KoiRemindRepository.GetByIdAsync(id);
            if (existingKoiRemind == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy category
            }

            // Cập nhật các thuộc tính của existingCategory bằng cách ánh xạ từ categoryDto
            _mapper.Map(koiReminddto, existingKoiRemind);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.KoiRemindRepository.UpdateAsync(existingKoiRemind);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating koiRemind");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }


            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKoiRemind(int id)
        {
            var koiRemind = await _unitOfWork.KoiRemindRepository.GetByIdAsync(id);

            if (koiRemind == null)
            {
                return NotFound();
            }

            await _unitOfWork.KoiRemindRepository.RemoveAsync(koiRemind);

            return NoContent();
        }
        private bool KoiRemindExists(int id)
        {
            return _unitOfWork.KoiRemindRepository.GetByIdAsync(id) == null;
        }
    }
}


