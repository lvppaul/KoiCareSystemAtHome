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
    public class BlogCommentController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BlogCommentController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogCommentDTO>>> GetAllSync()
        {
            var blogComments = await _unitOfWork.BlogCommentRepository.GetAllAsync();
            var blogCommentDTOs = _mapper.Map<List<BlogCommentDTO>>(blogComments);
            return Ok(blogCommentDTOs);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<BlogCommentDTO>> GetByIdAsync(int id)
        {
            var blogComment = await _unitOfWork.BlogCommentRepository.GetByIdAsync(id);
            if (blogComment == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<BlogCommentDTO>(blogComment);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<BlogCommentDTO> GetById(int id)
        {
            var blogComment = _unitOfWork.BlogCommentRepository.GetById(id);
            if (blogComment == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<BlogCommentDTO>(blogComment);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<BlogCommentDTO>> CreateBlogComment([FromBody] BlogCommentRequestDTO blogCommentdto)
        {
            if (blogCommentdto == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var blogCommentMap = _mapper.Map<BlogComment>(blogCommentdto);
            var createResult = await _unitOfWork.BlogCommentRepository.CreateAsync(blogCommentMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            // Cập nhật lại giá trị ShopId cho shopdto từ shopMap
            var blogCommentReturn = _mapper.Map<BlogCommentDTO>(blogCommentMap);
            return CreatedAtAction("GetById", new { id = blogCommentReturn.CommentId }, blogCommentReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlogComment(int id, [FromBody] BlogCommentUpdateDTO blogCommentdto)
        {
            if (blogCommentdto == null)
            {
                return BadRequest();
            }

            var existingBlogComment = await _unitOfWork.BlogCommentRepository.GetByIdAsync(id);
            if (existingBlogComment == null)
            {
                return NotFound(); 
            }

            _mapper.Map(blogCommentdto, existingBlogComment);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.BlogCommentRepository.UpdateAsync(existingBlogComment);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating blogComment");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }


            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogComment(int id)
        {
            var blogComment = await _unitOfWork.BlogCommentRepository.GetByIdAsync(id);

            if (blogComment == null)
            {
                return NotFound();
            }

            await _unitOfWork.BlogCommentRepository.RemoveAsync(blogComment);

            return NoContent();
        }
    }
}
