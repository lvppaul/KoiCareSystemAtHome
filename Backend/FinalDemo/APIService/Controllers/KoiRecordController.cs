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
    public class KoiRecordController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public KoiRecordController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<KoiRecordDTO>>> GetAllSync()
        {
            var koiRecords = await _unitOfWork.KoiRecordRepository.GetAllAsync();
            var koiRecordDTOs = _mapper.Map<List<KoiRecordDTO>>(koiRecords);
            return Ok(koiRecordDTOs);
        }

        [HttpGet("GetKoiRecordByKoiId/{KoiId}")]
        public async Task<IActionResult> GetKoiRecordByKoiIdAsync(int KoiId)
        {
            var result = await _unitOfWork.KoiRecordRepository.GetRecordByKoiIdAsync(KoiId);
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<KoiRecordDTO>>(result);
            return Ok(show);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<KoiRecordDTO>> GetByIdAsync(int id)
        {
            var koiRecord = await _unitOfWork.KoiRecordRepository.GetByIdAsync(id);
            if (koiRecord == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<KoiRecordDTO>(koiRecord);
            return result;
        }

        [HttpGet("GetSampleRecord")]
        public async Task<ActionResult<KoiRecordSample>> GetSampleRecord(int age)
        {
            var koiRecord = await _unitOfWork.KoiRecordRepository.GetKoiRecordByAge(age);
            if (koiRecord == null)
            {
                return NotFound();
            }
            return koiRecord;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<KoiRecordDTO> GetById(int id)
        {
            var koiRecord = _unitOfWork.KoiRecordRepository.GetById(id);
            if (koiRecord == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<KoiRecordDTO>(koiRecord);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<KoiRecordDTO>> CreateKoiRecord([FromBody] KoiRecordRequestDTO koiRecorddto)
        {
            if (koiRecorddto == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var koiRecordMap = _mapper.Map<KoiRecord>(koiRecorddto);
            var createResult = await _unitOfWork.KoiRecordRepository.CreateAsync(koiRecordMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            var koiRecordReturn = _mapper.Map<KoiRecordDTO>(koiRecordMap);
            return CreatedAtAction("GetById", new { id = koiRecordReturn.RecordId }, koiRecordReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKoiRecord(int id, [FromBody] KoiRecordUpdateDTO koiRecorddto)
        {
            if (koiRecorddto == null)
            {
                return BadRequest();
            }

            var existingKoiRecord = await _unitOfWork.KoiRecordRepository.GetByIdAsync(id);
            if (existingKoiRecord == null)
            {
                return NotFound();
            }

            _mapper.Map(koiRecorddto, existingKoiRecord);


            var updateResult = await _unitOfWork.KoiRecordRepository.UpdateAsync(existingKoiRecord);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating koiRecord");
                return StatusCode(500, ModelState); 
            }


            return NoContent(); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKoiRecord(int id)
        {
            var koiRecord = await _unitOfWork.KoiRecordRepository.GetByIdAsync(id);

            if (koiRecord == null)
            {
                return NotFound();
            }

            await _unitOfWork.KoiRecordRepository.RemoveAsync(koiRecord);

            return NoContent();
        }
        private bool KoiRecordExists(int id)
        {
            return _unitOfWork.KoiRecordRepository.GetByIdAsync(id) == null;
        }
    }
}


