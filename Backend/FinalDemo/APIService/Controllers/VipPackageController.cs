using AutoMapper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
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
            var vipDTOs = _mapper.Map<List<VipPackageDTO>>(vips);
            return Ok(vipDTOs);
        }

        [HttpGet("GetVipPackageById/{id}")]
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

        [HttpGet("GetVipPackageByName/{Name}")]
        public async Task<ActionResult<VipPackageDTO>> GetVipPackageByName(string Name)
        {
            var vip = await _unitOfWork.VipPackageRepository.GetVipPackageByNameAsync(Name);
            if (vip == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<VipPackageDTO>(vip);
            return result;
        }

        [HttpGet("GetVipPackageByOrderId")]
        public async Task<ActionResult<VipPackageDTO>> GetVipPackageByOrderId(int orderId)
        {
            var vip = await _unitOfWork.VipPackageRepository.GetVipPackageByOrderIdAsync(orderId);
            if (vip == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<VipPackageDTO>(vip);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<VipPackage>> CreateVipRecord([FromBody] VipPackageRequestDTO vippackagedto)
        {
            if (vippackagedto == null)
            {
                return BadRequest(ModelState);
            }

            var existName = await _unitOfWork.VipPackageRepository.CheckVipPackageNameExistCreateAsync(vippackagedto.Name);

            if (existName == true)
            {
                return BadRequest("This vip package name is already exists.");
            }

            var checkOptions = await _unitOfWork.VipPackageRepository.CheckVipPackageOptionsCreateAsync(vippackagedto.Options);
            if(checkOptions== false)
            {
                return BadRequest("This options is invalid. Please choose only 1,6 or 12");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vipPackageMap = _mapper.Map<VipPackage>(vippackagedto);

            var createResult = await _unitOfWork.VipPackageRepository.CreateAsync(vipPackageMap);

            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the vip package.");
                return StatusCode(500, ModelState);
            }
            var vipPackageShow = _mapper.Map<VipPackageDTO>(vipPackageMap);
            return CreatedAtAction("GetById", new { id = vipPackageShow.VipId }, vipPackageShow);
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

            var existName = await _unitOfWork.VipPackageRepository.CheckVipPackageNameExistUpdateAsync(id,vipdto.Name);

            if (existName == true)
            {
                return BadRequest("This vip package name is already exists.");
            }

            var checkOptions = await _unitOfWork.VipPackageRepository.CheckVipPackageOptionsCreateAsync(vipdto.Options);
            if (checkOptions == false)
            {
                return BadRequest("This options is invalid. Please choose only 1,6 or 12");
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
