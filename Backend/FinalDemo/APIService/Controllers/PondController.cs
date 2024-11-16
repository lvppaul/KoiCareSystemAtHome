using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;
using AutoMapper;
using KCSAH.APIServer.Services;
using Domain.Models.Entity;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Update;
using Domain.Helper;
using Microsoft.AspNetCore.Authorization;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PondController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly PondService _getService;
        public PondController(UnitOfWork unitOfWork, IMapper mapper, PondService getService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _getService = getService;
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<PondDTO>> GetByIdAsync(int id)
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
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<PondDTO> GetById(int id)
        {
            var pond =  _unitOfWork.PondRepository.GetById(id);
            if (pond == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<PondDTO>(pond);
            return result;
        }

        [HttpGet("GetFishNumberByPondId/{id}")]
        public async Task<IActionResult> GetFood(int id)
        {
            var result = await _getService.GetNumberofFish(id);
            return Ok(result);
        }

        [HttpGet("ListKoiInPond/{id}")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<IActionResult> GetFishInPond(int id)
        {
            var result = await _getService.GetKoiInPond(id);
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<KoiDTO>>(result);
            return Ok(show);
        }

        [HttpGet("GetPondsByUserId/{id}")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<IActionResult> GetPondByUserIdAsync(string id)
        {
            var result = await _getService.GetPondByUserIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<PondDTO>>(result);
            return Ok(show);
        }

        [HttpGet("ListWaterParameter/{id}")]
        public async Task<IActionResult> WaterParameterListByPondId(int id)
        {
            var result = await _getService.GetPondWaterParameter(id);
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<WaterParameterDTO>>(result);
            return Ok(show);
        }
        [HttpPost]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<Pond>> CreatePond([FromBody] PondRequestDTO ponddto)
        {
            if (ponddto == null)
            {
                return BadRequest(ModelState);
            }

            var isPondNameExisted = await _unitOfWork.PondRepository.PondNameExisted(ponddto.UserId, ponddto.Name);
            if (isPondNameExisted)
            {
                return BadRequest("Pond name can not be the same.");
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
            var pondShow = _mapper.Map<PondDTO>(pondMap);
            return CreatedAtAction("GetById",new {id = pondShow.PondId}, pondShow);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<IActionResult> UpdatePond(int id, [FromBody] PondUpdateDTO ponddto)
        {
            if (ponddto == null)
            {
                return BadRequest();
            }

            var existingPond = await _unitOfWork.PondRepository.GetByIdAsync(id);
            if (existingPond == null)
            {
                return NotFound();
            }

            var isPondNameExisted = await _unitOfWork.PondRepository.PondNameExisted(existingPond.UserId, ponddto.Name);
            if (isPondNameExisted)
            {
                return BadRequest("Pond name can not be the same.");
            }

            _mapper.Map(ponddto, existingPond);

            var updateResult = await _unitOfWork.PondRepository.UpdateAsync(existingPond);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating Pond");
                return StatusCode(500, ModelState); 
            }

            return NoContent(); 
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<IActionResult> DeletePond(int id)
        {
            var pond = await _unitOfWork.PondRepository.GetByIdAsync(id);

            var koiList = await _unitOfWork.PondRepository.GetKoisByPondId(id);

            if (koiList.Any())
            {
                foreach (var koi in koiList)
                {
                    koi.PondId = null;
                    await _unitOfWork.KoiRepository.UpdateAsync(koi);
                }
            }

            pond.IsDeleted = true;
            await _unitOfWork.PondRepository.UpdateAsync(pond);

            return NoContent();
        }
    }
}
