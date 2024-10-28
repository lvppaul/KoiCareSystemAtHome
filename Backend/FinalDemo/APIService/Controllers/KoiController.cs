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

        [HttpGet("GetKoiMaleInAllPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiByMaleSexAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiMaleAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiFemaleInAllPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiByFemaleSexAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiFemaleAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetAllKoiByUserId")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetAllKoiByUserIdAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetAllKoiByUserIdAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiAliveInAllPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiByUserIdAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiByUserIdAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiDeadInAllPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiDeadByUserIdAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiDeadAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiMaleDeadInAllPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiMaleDeadAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiMaleDeadAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiFemaleDeadInAllPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiFemaleDeadAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiFemaleDeadAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiMaleAliveInAllPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiMaleAliveAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiMaleAliveAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiFemaleAliveInAllPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiFemaleAliveAsync(string userid)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiFemaleAliveAsync(userid);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiFemaleAliveInPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiFemaleAliveInPondAsync(string userid, int pondId)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiFemaleAliveInPondAsync(userid, pondId);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiMaleAliveInPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiMaleAliveInPondAsync(string userid, int pondId)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiMaleAliveInPondAsync(userid, pondId);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiFemaleDeadInPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiFemaleDeadInPondAsync(string userid, int pondId)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiFemaleDeadInPondAsync(userid, pondId);
            if (koi == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<KoiDTO>>(koi);
            return result;
        }

        [HttpGet("GetKoiMaleDeadInPond")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<List<KoiDTO>>> GetKoiMaleDeadInPondAsync(string userid, int pondId)
        {
            var koi = await _unitOfWork.KoiRepository.GetKoiMaleDeadInPondAsync(userid, pondId);
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
                return StatusCode(500, ModelState);
            }

            return NoContent(); 
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
