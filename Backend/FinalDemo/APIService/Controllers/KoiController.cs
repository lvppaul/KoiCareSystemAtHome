using AutoMapper;
using Domain.Models;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;
//using SWP391.KCSAH.Repository.Models.;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KoiController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public KoiController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<KoiDTO>>> GetAllAsync()
        {
            var kois = await _unitOfWork.KoiRepository.GetAllAsync();
            var result = _mapper.Map<IEnumerable<KoiDTO>>(kois);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<KoiDTO>> GetByIdAsync(string id)
        {
            var koi = await _unitOfWork.KoiRepository.GetByIdAsync(id);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<KoiDTO>(koi);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<KoiDTO> GetById(string id)
        {
            var koi =  _unitOfWork.KoiRepository.GetById(id);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<KoiDTO>(koi);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Koi>> CreateKoi([FromBody] KoiRequestDTO koi)
        {
            if (koi == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var koiMap = _mapper.Map<Koi>(koi);
            var createResult = await _unitOfWork.KoiRepository.CreateAsync(koiMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            var koiShow = _mapper.Map<KoiDTO>(koiMap);
            return CreatedAtAction("GetById",new {id = koiShow.KoiId },koiShow);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKoi(int id, [FromBody] KoiRequestDTO koidto)
        {
            if (koidto == null)
            {
                return BadRequest();
            }

            // Lấy thực thể category hiện tại từ cơ sở dữ liệu
            var existingKoi = await _unitOfWork.KoiRepository.GetByIdAsync(id);
            if (existingKoi == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy category
            }

            // Cập nhật các thuộc tính của existingCategory bằng cách ánh xạ từ categoryDto
            _mapper.Map(koidto, existingKoi);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.KoiRepository.UpdateAsync(existingKoi);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating category");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }

            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKoi(string id)
        {
            var koi = await _unitOfWork.KoiRepository.GetByIdAsync(id);
            if (koi == null)
            {
                return NotFound();
            }
            await _unitOfWork.KoiRepository.RemoveAsync(koi);

            return NoContent();
        }
        private bool KoiExists(string id)
        {
            return _unitOfWork.KoiRepository.GetByIdAsync(id) != null;
        }
    }
}
