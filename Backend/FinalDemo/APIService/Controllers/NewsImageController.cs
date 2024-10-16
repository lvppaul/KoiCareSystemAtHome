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
    public class NewsImageController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NewsImageController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("Async/{id}")]
        public async Task<ActionResult<NewsImageDTO>> GetByIdAsync(int id)
        {
            var news = await _unitOfWork.NewsImageRepository.GetByIdAsync(id);
            if (news == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<NewsImageDTO>(news);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<NewsImageDTO> GetById(int id)
        {
            var news = _unitOfWork.NewsImageRepository.GetById(id);
            if (news == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<NewsImageDTO>(news);
            return result;
        }
        [HttpPost]
        public async Task<ActionResult<NewsImageDTO>> CreateNews([FromBody] NewsImageRequestDTO newsdto)
        {
            if (newsdto == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newsMap = _mapper.Map<NewsImage>(newsdto);

            var createResult = await _unitOfWork.NewsImageRepository.CreateAsync(newsMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }

            var newsReturn = _mapper.Map<NewsImageDTO>(newsMap);
            return CreatedAtAction("GetById", new { id = newsReturn.NewsId }, newsReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNewsImage(int id, [FromBody] NewsImageRequestDTO newsdto)
        {
            if (newsdto == null)
            {
                return BadRequest();
            }

            // Lấy thực thể category hiện tại từ cơ sở dữ liệu
            var existingNews = await _unitOfWork.NewsImageRepository.GetByIdAsync(id);
            if (existingNews == null)
            {
                return NotFound();
            }
            _mapper.Map(newsdto, existingNews);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.NewsImageRepository.UpdateAsync(existingNews);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating news");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }


            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            var news = await _unitOfWork.NewsImageRepository.GetByIdAsync(id);

            if (news == null)
            {
                return NotFound();
            }

            // Xóa bản ghi News
            await _unitOfWork.NewsImageRepository.RemoveAsync(news);

            return NoContent();
        }
    }
}
