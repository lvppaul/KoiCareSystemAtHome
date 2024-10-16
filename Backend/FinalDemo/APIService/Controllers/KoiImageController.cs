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
    public class KoiImageController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public KoiImageController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<KoiImageDTO>>> GetAllSync()
        {
            var koiImages = await _unitOfWork.KoiImageRepository.GetAllAsync();
            var koiImageDTOs = _mapper.Map<List<KoiImageDTO>>(koiImages);
            return Ok(koiImageDTOs);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<KoiImageDTO>> GetByIdAsync(int id)
        {
            var koiImage = await _unitOfWork.KoiImageRepository.GetByIdAsync(id);
            if (koiImage == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<KoiImageDTO>(koiImage);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<KoiImageDTO> GetById(int id)
        {
            var koiImage = _unitOfWork.KoiImageRepository.GetById(id);
            if (koiImage == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<KoiImageDTO>(koiImage);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<KoiImageDTO>> CreateKoiImage([FromBody] KoiImageRequestDTO koiImagedto)
        {
            if (koiImagedto == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var koiImageMap = _mapper.Map<KoiImage>(koiImagedto);
            var createResult = await _unitOfWork.KoiImageRepository.CreateAsync(koiImageMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            // Cập nhật lại giá trị ShopId cho shopdto từ shopMap
            var koiImageReturn = _mapper.Map<KoiImageDTO>(koiImageMap);
            return CreatedAtAction("GetById", new { id = koiImageReturn.ImageId }, koiImageReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKoiImage(int id, [FromBody] KoiImageUpdateDTO koiImagedto)
        {
            if (koiImagedto == null)
            {
                return BadRequest();
            }

            var existingKoiImage = await _unitOfWork.KoiImageRepository.GetByIdAsync(id);
            if (existingKoiImage == null)
            {
                return NotFound(); 
            }

            _mapper.Map(koiImagedto, existingKoiImage);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.KoiImageRepository.UpdateAsync(existingKoiImage);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating koiImage");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }


            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKoiImage(int id)
        {
            var koiImage = await _unitOfWork.KoiImageRepository.GetByIdAsync(id);

            if (koiImage == null)
            {
                return NotFound();
            }

            await _unitOfWork.KoiImageRepository.RemoveAsync(koiImage);

            return NoContent();
        }
    }
}

