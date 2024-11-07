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
        public ActionResult<List<string>> CheckWaterParameter([FromBody] WaterParameterRequestDTO waterparameterDto)
        {
            var warnings = new List<string>();

            double maxNitrite = 0.25;
            double minOxygen = 5.0;
            double maxOxygen = 18;
            double maxNitrate = 40;
            double minKH = 5.04;
            double maxKH = 6.44;
            double maxChlorine = 0.003;
            double minGH = 4;
            double maxGH = 10;
            double minAmmonium = 0.2;
            double maxAmmonium = 2;
            double minSalt = 0.3;
            double maxSalt = 0.7;
            double maxPhosphate = 0.035;
            double minCarbonDioxide = 5;
            double maxCarbonDioxide = 35;
            double maxTemperature = 29;
            double minTemperature = 20;
            double minPH = 4;
            double maxPH = 9;

            if (waterparameterDto.Nitrite > maxNitrite)
            {
                warnings.Add("Nitrite should be in 0 - 0.25");
            }

            if (waterparameterDto.Oxygen < minOxygen || waterparameterDto.Oxygen > maxOxygen)
            {
                warnings.Add("Oxygen should be in 5.0 - 18.0");
            }

            if (waterparameterDto.Nitrate > maxNitrate)
            {
                warnings.Add("Nitrate should be less than or equal to 40");
            }

            if (waterparameterDto.CarbonHardness < minKH || waterparameterDto.CarbonHardness > maxKH)
            {
                warnings.Add("Carbon Hardness (KH) should be in 5.04 - 6.44");
            }

            if (waterparameterDto.TotalChlorines > maxChlorine)
            {
                warnings.Add("Chlorine should be less than or equal to 0.003");
            }

            if (waterparameterDto.Hardness < minGH || waterparameterDto.Hardness > maxGH)
            {
                warnings.Add("General Hardness (GH) should be in 4 - 10");
            }

            if (waterparameterDto.Ammonium < minAmmonium || waterparameterDto.Ammonium > maxAmmonium)
            {
                warnings.Add("Ammonium should be in 0.2 - 2");
            }

            if (waterparameterDto.Salt < minSalt || waterparameterDto.Salt > maxSalt)
            {
                warnings.Add("Salt should be in 0.3 - 0.7");
            }

            if (waterparameterDto.Phosphate > maxPhosphate)
            {
                warnings.Add("Phosphate should be less than or equal to 0.035");
            }

            if (waterparameterDto.CarbonDioxide < minCarbonDioxide || waterparameterDto.CarbonDioxide > maxCarbonDioxide)
            {
                warnings.Add("Calcium Carbonate should be in 5 - 35");
            }

            if (waterparameterDto.Temperature > maxTemperature || waterparameterDto.Temperature < minTemperature)
            {
                warnings.Add("Temperature should be in 20 - 29");
            }

            if (waterparameterDto.PH < minPH || waterparameterDto.PH > maxPH)
            {
                warnings.Add("pH should be in 4 - 9");
            }

            if (!warnings.Any())
            {
                return Ok("All water parameters are within the safe range.");
            }

            return Ok(warnings);
        }

        [HttpPost("WaterParameterAdvice")]
        public ActionResult<List<string>> WaterParameterAdvice([FromBody] WaterParameterRequestDTO waterparameterDto)
        {
            var warnings = new StringBuilder();

            double maxNitrite = 0.25;
            double minOxygen = 5.0;
            double maxOxygen = 18;
            double maxNitrate = 40;
            double minKH = 5.04;
            double maxKH = 6.44;
            double maxChlorine = 0.003;
            double minGH = 4;
            double maxGH = 10;
            double minAmmonium = 0.2;
            double maxAmmonium = 2;
            double minSalt = 0.3;
            double maxSalt = 0.7;
            double maxPhosphate = 0.035;
            double minCarbonDioxide = 5;
            double maxCarbonDioxide = 35;
            double maxTemperature = 29;
            double minTemperature = 20;
            double minPH = 4;
            double maxPH = 9;

            if (waterparameterDto.Salt > maxSalt) 
            {
                warnings.Append("- Salt: Your salt level is a bit higher than recommended.For the health and vitality of your koi, it's essential to monitor and maintain appropriate salt levels in the pond.");
            }

            if (waterparameterDto.PH > maxPH)
            {
                warnings.AppendLine("- pH: pH level is exceeded recommended range.In cases of mild infection, your fish may experience stunted growth and become more susceptible to disease.");
            }
            if (waterparameterDto.PH < minPH)
            {
                warnings.AppendLine("- pH: pH level is considered highly acidic.This can directly affect the protective slime coat on the fish’s skin and hinder their respiration. Additionally, hydrogen sulfide (H₂S) compounds produced in this environment can be toxic to your koi fish, posing a serious risk to their health.");
            }
            if (waterparameterDto.CarbonHardness > maxKH)
            {
                warnings.AppendLine("- KH(Carbon Hardness): The KH(Carbon Hardness) is too high, the pH will be less likely to change and may cause the water to become alkaline (high pH). This can stress the koi fish, as a high pH can cause discomfort and reduce the fish's overall health.");
            }
            if (waterparameterDto.CarbonHardness < minKH)
            {
                warnings.AppendLine("- KH(Carbon Hardness): The KH(Carbon Hardness) is too low, may cause the pH level changes rapidly. This can stress the koi fish, as a high pH can cause discomfort and reduce the fish's overall health.");
            }
            if (waterparameterDto.Hardness > maxGH)
            {
                warnings.AppendLine("- GH(Hardness): The GH is too high, as it can create a favorable environment for pathogens and bacteria, potentially leading to contamination.Regularly monitoring and adjusting water hardness can help safeguard the health of your koi and the overall balance of the pond ecosystem.");
            }

            if(waterparameterDto.Oxygen < minOxygen)
            {
                warnings.AppendLine("- O₂: The Oxygen level in pond is too low.The fish will swim to the surface continuously.This can lead to death in long period.");
            }

            if (waterparameterDto.Oxygen < maxOxygen)
            {
                warnings.AppendLine("- O₂: The Oxygen level in pond is too high.This will then affect the fish's skin and can cause air bubble disease, which in the long run can cause the fish to die.");
            }

            if (waterparameterDto.Hardness < minGH)
            {
                warnings.AppendLine("- GH(Hardness): The GH is too low, the filtration system may not function effectively. Maintaining an appropriate level of water hardness is essential to support the efficiency of the filtration process, helping to keep the pond environment clean and healthy for your koi.");
            }

            if (waterparameterDto.Temperature < minTemperature)
            {
                warnings.AppendLine("- Temperature: The temperature is in the low level. Therefore, the fish will consume less,so feeding should be reduced to avoid leftover food, which can pollute the water.");
            }

            if (waterparameterDto.Temperature > maxTemperature)
            {
                warnings.AppendLine("- Temperature: The temperature is above the ideal level.This leads to the shortage of Oxygen in pond, the fish will become tired, weak, and rise to the surface to gulp air. Additionally, this can lead to reduced appetite and a lack of vitality.");
            }

            if (waterparameterDto.Nitrite > maxNitrite)
            {
                warnings.AppendLine("- Nitrite: Nitrite levels are above the safe range. High nitrite is toxic to fish and can interfere with their ability to transport oxygen, potentially leading to fish fatalities.");
            }
            if (waterparameterDto.Nitrate > maxNitrate)
            {
                warnings.AppendLine("- Nitrate: Nitrate levels are above the recommended range. Elevated nitrate levels can stress fish, stunt their growth, and encourage algae blooms, which can reduce water quality.");
            }
            if (waterparameterDto.Ammonium > maxAmmonium)
            {
                warnings.AppendLine("- Ammonium: Ammonium levels are too high. Elevated ammonium can be toxic to fish and can disrupt water quality, particularly in higher pH environments.");
            }

            if (waterparameterDto.Ammonium < minAmmonium)
            {
                warnings.AppendLine("- Ammonium: Ammonium levels are too low. Insufficient ammonium can impair the nitrogen cycle, affecting overall water quality and potentially hindering the growth and health of your koi fish.");
            }

            if (waterparameterDto.CarbonDioxide > maxCarbonDioxide)
            {
                warnings.Append("- CO₂: Carbon dioxide levels are too high. Elevated CO2 can cause oxygen depletion in the water and create a stressful environment for your koi fish, leading to respiratory problems and reduced vitality.");
            }

            if (waterparameterDto.CarbonDioxide < minCarbonDioxide)
            {
                warnings.AppendLine("- CO₂: Carbon dioxide levels are too low. Insufficient CO2 can disrupt the overall balance of the pond’s ecosystem and impact plant growth, affecting the overall health of your koi fish.");
            }

            if (waterparameterDto.TotalChlorines > maxChlorine)
            {
                warnings.AppendLine("- Chlorine: Chlorine levels are too high. High chlorine concentrations can be toxic to your koi, affecting their gills and overall health. It's essential to ensure the water is adequately dechlorinated to prevent harm to your fish.");
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
