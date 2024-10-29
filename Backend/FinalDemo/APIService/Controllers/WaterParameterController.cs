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
    public class WaterParameterController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public WaterParameterController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WaterParameterDTO>>> GetAllAsync()
        {
            var waterParameters = await _unitOfWork.WaterParameterRepository.GetAllAsync();
            var waterparameterMap = _mapper.Map<IEnumerable<WaterParameterDTO>>(waterParameters);
            return Ok(waterparameterMap);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<WaterParameterDTO>> GetByIdAsync(int id)
        {
            var waterParameter = await _unitOfWork.WaterParameterRepository.GetByIdAsync(id);
            if (waterParameter == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<WaterParameterDTO>(waterParameter);
            return result;
        }

        [HttpGet("WaterParameterByPondId/{pondId}")]
        public async Task<ActionResult<List<WaterParameterDTO>>> GetByPondIdAsync(int pondId)
        {
            var waterParameter = await _unitOfWork.WaterParameterRepository.GetByPondId(pondId);
            if (waterParameter == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<WaterParameterDTO>>(waterParameter);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<WaterParameterDTO> GetById(int id)
        {
            var waterParameter = _unitOfWork.WaterParameterRepository.GetById(id);
            if (waterParameter == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<WaterParameterDTO>(waterParameter);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<WaterParameter>> CreateWaterParameter([FromBody] WaterParameterRequestDTO waterparameterDto)
        {
            if (waterparameterDto == null)
            {
                return BadRequest(ModelState);
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var waterMap = _mapper.Map<WaterParameter>(waterparameterDto);
            var createResult = await _unitOfWork.WaterParameterRepository.CreateAsync(waterMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            var waterShow = _mapper.Map<WaterParameterDTO>(waterMap);
            return CreatedAtAction("GetById", new { id = waterShow.PondId }, waterShow);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWater(int id, [FromBody] WaterParameterUpdateDTO waterdto)
        {
            if (waterdto == null)
            {
                return BadRequest();
            }

            var existingWaterParameter = await _unitOfWork.WaterParameterRepository.GetByIdAsync(id);
            if (existingWaterParameter == null)
            {
                return NotFound(); 
            }

            _mapper.Map(waterdto, existingWaterParameter);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.WaterParameterRepository.UpdateAsync(existingWaterParameter);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating Water Parameter");
                return StatusCode(500, ModelState);
            }

            return NoContent(); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWaterParameter(int id)
        {
            var water = await _unitOfWork.WaterParameterRepository.GetByIdAsync(id);
            if (water == null)
            {
                return NotFound();
            }
            await _unitOfWork.WaterParameterRepository.RemoveAsync(water);

            return NoContent();
        }
    }
}
