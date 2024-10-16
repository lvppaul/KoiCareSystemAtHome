using AutoMapper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
using Domain.Models.Entity;
using KCSAH.APIServer.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NewsController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetAllSync()
        {
            var news = await _unitOfWork.NewRepository.GetAllAsync();
            var newsDTOs = _mapper.Map<List<NewsDTO>>(news);
            return Ok(newsDTOs);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<NewsDTO>> GetByIdAsync(int id)
        {
            var news = await _unitOfWork.NewRepository.GetByIdAsync(id);
            if (news == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<NewsDTO>(news);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<NewsDTO> GetById(int id)
        {
            var news = _unitOfWork.NewRepository.GetById(id);
            if (news == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<NewsDTO>(news);
            return result;
        }
        [HttpPost]
        public async Task<ActionResult<NewsDTO>> CreateNews([FromBody] NewsRequestDTO newsdto)
        {
            if (newsdto == null)
            {
                return BadRequest(ModelState);
            }

            var news = _unitOfWork.NewRepository.GetAll().Where(c => c.Title.ToUpper() == newsdto.Title.ToUpper()).FirstOrDefault();

            if (news != null)
            {
                ModelState.AddModelError("", "This title has already existed.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newsMap = _mapper.Map<News>(newsdto);

            var createResult = await _unitOfWork.NewRepository.CreateAsync(newsMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }

            var newsReturn = _mapper.Map<NewsDTO>(newsMap);
            return CreatedAtAction("GetById", new { id = newsReturn.NewsId }, newsReturn);
        }
        private async Task<News> GetNewsAsync(int id)
        {
            var news = await _unitOfWork.NewRepository.GetByIdAsync(id);

            return news;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNews(int id, [FromBody] NewsUpdateDTO newsdto)
        {
            if (newsdto == null)
            {
                return BadRequest();
            }

            var existingNews = await _unitOfWork.NewRepository.GetByIdAsync(id);
            if (existingNews == null)
            {
                return NotFound(); 
            }
            if (existingNews.Title.Equals(newsdto.Title))
            {
                ModelState.AddModelError("", "This title has already existed.");
                return StatusCode(422, ModelState);
            }
            _mapper.Map(newsdto, existingNews);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.NewRepository.UpdateAsync(existingNews);

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
            var news = await _unitOfWork.NewRepository.GetByIdAsync(id);

            if (news == null)
            {
                return NotFound();
            }

            // Xóa bản ghi News
            await _unitOfWork.NewRepository.RemoveAsync(news);

            return NoContent();
        }

    }
}
