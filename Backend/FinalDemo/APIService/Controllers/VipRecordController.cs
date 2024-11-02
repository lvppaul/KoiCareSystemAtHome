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
    public class VipRecordController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VipRecordController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VipRecordDTO>>> GetAllSync()
        {
            var vips = await _unitOfWork.vipRecordRepository.GetAllAsync();
            var vipDTOs = _mapper.Map<List<VipRecordDTO>>(vips);
            return Ok(vipDTOs);
        }

        [HttpGet("GetVipRecordById/{id}")]
        public async Task<ActionResult<VipRecordDTO>> GetByIdAsync(int id)
        {
            var vip = await _unitOfWork.vipRecordRepository.GetByIdAsync(id);
            if (vip == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<VipRecordDTO>(vip);
            return result;
        }

        [HttpGet("GetVipRecordByUserId/{UserId}")]
        public async Task<ActionResult<VipRecordDTO>> GetVipRecordByUserId(string UserId)
        {
            var vip = await _unitOfWork.vipRecordRepository.GetVipRecordByUserIdAsync(UserId);
            if (vip == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<VipRecordDTO>(vip);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<VipRecord>> CreateVipRecord([FromBody] VipRecordRequestDTO viprecorddto)
        {
            if (viprecorddto == null)
            {
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingVip = await _unitOfWork.vipRecordRepository.GetVipRecordByvipIdAndUserIdAsync(viprecorddto.VipId,viprecorddto.UserId);
            if (existingVip != null && existingVip.EndDate>DateTime.Now)
            {
                return BadRequest("User already upgrade vip");
            }
            var package = await _unitOfWork.VipPackageRepository.GetByIdAsync(viprecorddto.VipId);
            if(package == null)
            {
                return BadRequest("Invalid Package");
            }
            var viprecordcreate = await _unitOfWork.vipRecordRepository.CheckCreateAsync(viprecorddto, package.Options);

            var checkDate = await _unitOfWork.vipRecordRepository.CheckDateCreateInput(viprecorddto);

            if (checkDate == false)
            {
                return BadRequest("This vip record input date is invalid.");
            }
            

            

            var vipRecordMap = _mapper.Map<VipRecord>(viprecorddto);

            var createResult = await _unitOfWork.vipRecordRepository.CreateAsync(vipRecordMap);

            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the vip record.");
                return StatusCode(500, ModelState);
            }
            var vipRecordShow = _mapper.Map<VipRecordDTO>(vipRecordMap);
            return CreatedAtAction("GetById", new { id = vipRecordShow.Id }, vipRecordShow);
        }



        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateVipRecord(int id, [FromBody] VipRecordUpdateDTO vipdto)
        //{
        //    if (vipdto == null)
        //    {
        //        return BadRequest();
        //    }

        //    var existingVip = await _unitOfWork.vipRecordRepository.GetByIdAsync(id);
        //    if (existingVip == null)
        //    {
        //        return NotFound();
        //    }

        //    var checkDate = await _unitOfWork.vipRecordRepository.CheckDateUpdateInput(vipdto);

        //    if (checkDate == false)
        //    {
        //        return BadRequest("This vip record input date is invalid.");
        //    }

        //    _mapper.Map(vipdto, existingVip);

        //    var updateResult = await _unitOfWork.vipRecordRepository.UpdateAsync(existingVip);

        //    if (updateResult <= 0)
        //    {
        //        ModelState.AddModelError("", "Something went wrong while updating vip");
        //        return StatusCode(500, ModelState);
        //    }

        //    return NoContent();
        //}


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVipRecord(int id)
        {
            var vipRecord = await _unitOfWork.vipRecordRepository.GetByIdAsync(id);
            if (vipRecord == null)
            {
                return NotFound();
            }
            await _unitOfWork.vipRecordRepository.RemoveAsync(vipRecord);

            return NoContent();
        }
    }
}


