using AutoMapper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;
using System.Text;

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

        [HttpPost("CheckWaterParameter")]
        public async Task<ActionResult<List<string>>> CheckWaterParameter([FromBody] WaterParameterRequestDTO waterparameterDto)
        {
            var warnings = new List<string>();

            var sample = await _unitOfWork.WaterParameterRepository.GetSample();

            if (waterparameterDto.Nitrite > sample.MaxNitrite)
            {
                warnings.Add($"Nitrite should be in 0 - {sample.MaxNitrite}");
            }

            if (waterparameterDto.Oxygen < sample.MinOxygen || waterparameterDto.Oxygen > sample.MaxOxygen)
            {
                warnings.Add($"Oxygen should be in {sample.MinOxygen} - {sample.MaxOxygen}");
            }

            if (waterparameterDto.Nitrate > sample.MaxNitrate)
            {
                warnings.Add($"Nitrate should be less than or equal to {sample.MaxNitrate}");
            }

            if (waterparameterDto.CarbonHardness < sample.MinKH || waterparameterDto.CarbonHardness > sample.MaxKH)
            {
                warnings.Add($"Carbon Hardness (KH) should be in {sample.MinKH} - {sample.MaxKH}");
            }

            if (waterparameterDto.TotalChlorines > sample.TotalChlorines)
            {
                warnings.Add($"Chlorine should be less than or equal to {sample.TotalChlorines}");
            }

            if (waterparameterDto.Hardness < sample.MinGH || waterparameterDto.Hardness > sample.MaxGH)
            {
                warnings.Add($"General Hardness (GH) should be in {sample.MinGH} - {sample.MaxGH}");
            }

            if (waterparameterDto.Ammonium < sample.MinAmmonium || waterparameterDto.Ammonium > sample.MaxAmmonium)
            {
                warnings.Add($"Ammonium should be in {sample.MinAmmonium} - {sample.MaxAmmonium}");
            }

            if (waterparameterDto.Salt < sample.MinSalt || waterparameterDto.Salt > sample.MaxSalt)
            {
                warnings.Add($"Salt should be in {sample.MinSalt} - {sample.MaxSalt}");
            }

            if (waterparameterDto.Phosphate > sample.MaxPhosphate)
            {
                warnings.Add($"Phosphate should be less than or equal to {sample.MaxPhosphate}");
            }

            if (waterparameterDto.CarbonDioxide < sample.MinCarbonDioxide || waterparameterDto.CarbonDioxide > sample.MaxCarbonDioxide)
            {
                warnings.Add($"Calcium Carbonate should be in {sample.MinCarbonDioxide} - {sample.MaxCarbonDioxide}");
            }

            if (waterparameterDto.Temperature > sample.MaxTemperature || waterparameterDto.Temperature < sample.MinTemperature)
            {
                warnings.Add($"Temperature should be in {sample.MinTemperature} - {sample.MaxTemperature}");
            }

            if (waterparameterDto.PH < sample.MinPH || waterparameterDto.PH > sample.MaxPH)
            {
                warnings.Add($"pH should be in {sample.MinPH} - {sample.MaxPH}");
            }

            if (!warnings.Any())
            {
                return Ok("All water parameters are within the safe range.");
            }

            return Ok(warnings);
        }

        [HttpPost("WaterParameterAdvice")]
        public async Task<ActionResult<List<string>>> WaterParameterAdvice([FromBody] WaterParameterRequestDTO waterparameterDto)
        {
            var warnings = new StringBuilder();

            var sample = await _unitOfWork.WaterParameterRepository.GetSample();

            if (waterparameterDto.Salt > sample.MaxSalt) 
            {
                warnings.AppendLine("Salt: Your salt level is a bit higher than recommended.For the health and vitality of your koi, it's essential to monitor and maintain appropriate salt levels in the pond.");
            }

            if (waterparameterDto.PH > sample.MaxPH)
            {
                warnings.AppendLine("pH: pH level is exceeded recommended range.In cases of mild infection, your fish may experience stunted growth and become more susceptible to disease.");
            }
            if (waterparameterDto.PH < sample.MinPH)
            {
                warnings.AppendLine("pH: pH level is considered highly acidic.This can directly affect the protective slime coat on the fish’s skin and hinder their respiration. Additionally, hydrogen sulfide (H₂S) compounds produced in this environment can be toxic to your koi fish, posing a serious risk to their health.");
            }
            if (waterparameterDto.CarbonHardness > sample.MaxKH)
            {
                warnings.AppendLine("KH(Carbon Hardness): The KH(Carbon Hardness) is too high, the pH will be less likely to change and may cause the water to become alkaline (high pH). This can stress the koi fish, as a high pH can cause discomfort and reduce the fish's overall health.");
            }
            if (waterparameterDto.CarbonHardness < sample.MinKH)
            {
                warnings.AppendLine("KH(Carbon Hardness): The KH(Carbon Hardness) is too low, may cause the pH level changes rapidly. This can stress the koi fish, as a high pH can cause discomfort and reduce the fish's overall health.");
            }
            if (waterparameterDto.Hardness > sample.MaxGH)
            {
                warnings.AppendLine("GH(Hardness): The GH is too high, as it can create a favorable environment for pathogens and bacteria, potentially leading to contamination.Regularly monitoring and adjusting water hardness can help safeguard the health of your koi and the overall balance of the pond ecosystem.");
            }

            if(waterparameterDto.Oxygen < sample.MinOxygen)
            {
                warnings.AppendLine("O₂: The Oxygen level in pond is too low.The fish will swim to the surface continuously.This can lead to death in long period.");
            }

            if (waterparameterDto.Oxygen < sample.MaxOxygen)
            {
                warnings.AppendLine("O₂: The Oxygen level in pond is too high.This will then affect the fish's skin and can cause air bubble disease, which in the long run can cause the fish to die.");
            }

            if (waterparameterDto.Hardness < sample.MinGH)
            {
                warnings.AppendLine("GH(Hardness): The GH is too low, the filtration system may not function effectively. Maintaining an appropriate level of water hardness is essential to support the efficiency of the filtration process, helping to keep the pond environment clean and healthy for your koi.");
            }

            if (waterparameterDto.Temperature < sample.MinTemperature)
            {
                warnings.AppendLine("Temperature: The temperature is in the low level. Therefore, the fish will consume less,so feeding should be reduced to avoid leftover food, which can pollute the water.");
            }

            if (waterparameterDto.Temperature > sample.MaxTemperature)
            {
                warnings.AppendLine("Temperature: The temperature is above the ideal level.This leads to the shortage of Oxygen in pond, the fish will become tired, weak, and rise to the surface to gulp air. Additionally, this can lead to reduced appetite and a lack of vitality.");
            }

            if (waterparameterDto.Nitrite > sample.MaxNitrite)
            {
                warnings.AppendLine("Nitrite: Nitrite levels are above the safe range. High nitrite is toxic to fish and can interfere with their ability to transport oxygen, potentially leading to fish fatalities.");
            }
            if (waterparameterDto.Nitrate > sample.MaxNitrate)
            {
                warnings.AppendLine("Nitrate: Nitrate levels are above the recommended range. Elevated nitrate levels can stress fish, stunt their growth, and encourage algae blooms, which can reduce water quality.");
            }
            if (waterparameterDto.Ammonium > sample.MaxAmmonium)
            {
                warnings.AppendLine("Ammonium: Ammonium levels are too high. Elevated ammonium can be toxic to fish and can disrupt water quality, particularly in higher pH environments.");
            }

            if (waterparameterDto.Ammonium < sample.MinAmmonium)
            {
                warnings.AppendLine("Ammonium: Ammonium levels are too low. Insufficient ammonium can impair the nitrogen cycle, affecting overall water quality and potentially hindering the growth and health of your koi fish.");
            }

            if (waterparameterDto.CarbonDioxide > sample.MaxCarbonDioxide)
            {
                warnings.Append("CO₂: Carbon dioxide levels are too high. Elevated CO2 can cause oxygen depletion in the water and create a stressful environment for your koi fish, leading to respiratory problems and reduced vitality.");
            }

            if (waterparameterDto.CarbonDioxide < sample.MinCarbonDioxide)
            {
                warnings.AppendLine("CO₂: Carbon dioxide levels are too low. Insufficient CO2 can disrupt the overall balance of the pond’s ecosystem and impact plant growth, affecting the overall health of your koi fish.");
            }

            if (waterparameterDto.TotalChlorines > sample.TotalChlorines)
            {
                warnings.AppendLine("Chlorine: Chlorine levels are too high. High chlorine concentrations can be toxic to your koi, affecting their gills and overall health. It's essential to ensure the water is adequately dechlorinated to prevent harm to your fish.");
            }

            return Ok(warnings.ToString());
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
