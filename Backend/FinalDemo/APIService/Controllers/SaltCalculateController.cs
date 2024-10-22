using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaltCalculateController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly SaltCalculator _saltCalculator;

        public SaltCalculateController(UnitOfWork unitOfWork, SaltCalculator saltCalculator)
        {
            _unitOfWork = unitOfWork;
            _saltCalculator = saltCalculator;
        }

        [HttpGet("pond-volume/{id}")]
        public async Task<ActionResult<int>> GetPondVolume(int id)
        {
            var volume = await _saltCalculator.GetVolumesOfPondById(id);
            if (volume == 0)
            {
                return NotFound();
            }
            return Ok(volume);
        }

        [HttpPost("increase-concentration")]
        public async Task<ActionResult<SaltCalculateDTO>> CalculateIncreaseConcentration(
        [FromBody] SaltCalculateRequestDTO request)
        {
            if (request == null)
            {
                return BadRequest(ModelState);
            }

            if (!request.CurrentConcentration.HasValue)
            {
                request.CurrentConcentration = 0;
            }

            var amountOfSalt = await _saltCalculator.AmountOfSaltChangeHigherConcentration(
                request.PondId,
                request.DesiredConcentration,
                request.CurrentConcentration.Value);

            return Ok(new SaltCalculateDTO
            {
                AmountOfSalt = amountOfSalt,
            });
        }

        [HttpPost("water-change-salt")]
        public async Task<ActionResult<SaltCalculateDTO>> CalculateWaterChangeSalt(
        [FromBody] SaltCalculateRequestDTO request)
        {
            if (request == null)
            {
                return BadRequest(ModelState);
            }

            //if (!request.PercentWaterChange.HasValue)
            //{
            //    request.PercentWaterChange = 0;
            //}

            var amountOfSaltRefill = await _saltCalculator.AmountOfSaltPerWaterChangeHigherConcentration(
                request.PondId,
                request.DesiredConcentration,
                request.PercentWaterChange.Value);

            return Ok(new SaltCalculateDTO
            {AmountOfSalt = 0,
                AmountOfSaltRefill = amountOfSaltRefill,
            });
        }

        [HttpPost("decrease-concentration")]
        public async Task<ActionResult<SaltCalculateDTO>> CalculateDecreaseConcentration(
        [FromBody] SaltCalculateRequestDTO request)
        {
                if (request == null)
            {
                return BadRequest(ModelState);
            }

            if (!request.PercentWaterChange.HasValue)
            {
                request.PercentWaterChange = 0;
            }
                if (!request.CurrentConcentration.HasValue)
                {
                    request.CurrentConcentration = 0;
                }

                var numberOfChanges = await _saltCalculator.NumberOfWaterChangesChangeLowerConcentration(
                    request.PondId,
                    request.DesiredConcentration,
                    request.CurrentConcentration.Value,
                    request.PercentWaterChange.Value);

                return Ok(new SaltCalculateDTO
                {
                    NumberOfChanges = numberOfChanges,
                });
            }
            
        }
    }

