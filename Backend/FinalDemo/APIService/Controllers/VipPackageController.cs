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
    public class VipPackageController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VipPackageController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VipPackageDTO>>> GetAllSync()
        {
            var vips = await _unitOfWork.VipPackageRepository.GetAllAsync();
            var vipDTOs = _mapper.Map<List<ProductDTO>>(vips);
            return Ok(vipDTOs);
        }

        [HttpGet("GetVipById/{id}")]
        public async Task<ActionResult<VipPackageDTO>> GetByIdAsync(int id)
        {
            var vip = await _unitOfWork.VipPackageRepository.GetByIdAsync(id);
            if (vip == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<VipPackageDTO>(vip);
            return result;
        }

        [HttpGet("GetVipByUserId/{UserId}")]
        public async Task<ActionResult<VipPackageDTO>> GetVipPackageByUserId(string UserId)
        {
            var vip = await _unitOfWork.VipPackageRepository.GetVipByUserIdAsync(UserId);
            if (vip == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<VipPackageDTO>(vip);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<VipRecord>> CreateVipPackage([FromBody] VipPackageRequestDTO vippackagedto)
        {
            if (vippackagedto == null)
            {
                return BadRequest(ModelState);
            }

            var existingvippackage = await _unitOfWork.VipPackageRepository.GetVipPackageByName(vippackagedto.Name);

            if (existingvippackage != null)
            {
                return BadRequest("This vip package already exists.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vipPackageMap = _mapper.Map<VipRecord>(vippackagedto);

            var createResult = await _unitOfWork.VipPackageRepository.CreateAsync(vipPackageMap);

            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the vip package.");
                return StatusCode(500, ModelState);
            }
            var vipPackageShow = _mapper.Map<VipPackageDTO>(vipPackageMap);
            return CreatedAtAction("GetById", new { id = vipPackageShow.Id }, vipPackageShow);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVipPackage(int id, [FromBody] VipPackageRequestDTO vipdto)
        {
            if (vipdto == null)
            {
                return BadRequest();
            }

            var existingVip = await _unitOfWork.VipPackageRepository.GetByIdAsync(id);
            if (existingVip == null)
            {
                return NotFound();
            }

            _mapper.Map(vipdto, existingVip);

            var updateResult = await _unitOfWork.VipPackageRepository.UpdateAsync(existingVip);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating vip");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVipPackage(int id)
        {
            var vipPackage = await _unitOfWork.VipPackageRepository.GetByIdAsync(id);
            if (vipPackage == null)
            {
                return NotFound();
            }
            await _unitOfWork.VipPackageRepository.RemoveAsync(vipPackage);

            return NoContent();
        }
    }
}


