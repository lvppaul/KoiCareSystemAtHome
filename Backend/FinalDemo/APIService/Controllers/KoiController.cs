using AutoMapper;
using Domain.Helper;
using Domain.Models;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;
using System.Security.Claims;
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
            var koiDTOs = _mapper.Map<List<KoiDTO>>(kois);
            return Ok(koiDTOs);
        }


        [HttpGet("GetKoiById/{id}")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<KoiDTO>> GetByIdAsync(int id)
        {
            var koi = await _unitOfWork.KoiRepository.GetByIdAsync(id);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<KoiDTO>(koi);
            return result;
        }

        [HttpGet("GetKoiByUserId/{userid}")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetByIdAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetByUserIdAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<KoiDTO> GetById(int id)
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
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
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
            var koirecord = new KoiRecordRequestDTO();
            koirecord.KoiId = koiShow.KoiId;
            koirecord.UserId = koi.UserId;
            koirecord.Weight = koi.Weight;
            koirecord.Length = koi.Length;
            koirecord.UpdatedTime = DateTime.Now;

            var create = _mapper.Map<KoiRecord>(koirecord);
            var createResultKoiRecord = await _unitOfWork.KoiRecordRepository.CreateAsync(create);
            if (createResultKoiRecord <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            return CreatedAtAction("GetById",new {id = koiShow.KoiId },koiShow);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<IActionResult> UpdateKoi(int id, [FromBody] KoiUpdateDTO koidto)
        {
            if (koidto == null)
            {
                return BadRequest();
            }

            var existingKoi = await _unitOfWork.KoiRepository.GetByIdAsync(id);
            if (existingKoi == null)
            {
                return NotFound(); 
            }

            _mapper.Map(koidto, existingKoi);

            var updateResult = await _unitOfWork.KoiRepository.UpdateAsync(existingKoi);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating koi");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }

            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<IActionResult> DeleteKoi(int id)
        {
            var koi = await _unitOfWork.KoiRepository.GetByIdAsync(id);
            if (koi == null)
            {
                return NotFound();
            }
            await _unitOfWork.KoiRepository.RemoveAsync(koi);

            return NoContent();
        }
    }
}
