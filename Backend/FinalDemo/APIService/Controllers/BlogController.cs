using AutoMapper;
using Domain.Helper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
using Domain.Models.Entity;
using KCSAH.APIServer.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;
using System.Reflection.Metadata;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BlogController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogDTO>>> GetAllSync()
        {
            var blogs = await _unitOfWork.BlogRepository.GetAllAsync();
            var blogDTOs = _mapper.Map<List<BlogDTO>>(blogs);
            return Ok(blogDTOs);
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<BlogDTO>> GetByIdAsync(int id)
        {
            var blog = await _unitOfWork.BlogRepository.GetByIdAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<BlogDTO>(blog);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<BlogDTO> GetById(int id)
        {
            var blog = _unitOfWork.BlogRepository.GetById(id);
            if (blog == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<BlogDTO>(blog);
            return result;
        }

        [HttpPost]
        //[Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<ActionResult<BlogDTO>> CreateBlog([FromBody] BlogRequestDTO blogdto)
        {
            if (blogdto == null)
            {
                return BadRequest(ModelState);
            }

            var blog = _unitOfWork.BlogRepository.GetAll().Where(c => c.Title.ToUpper() == blogdto.Title.ToUpper()).FirstOrDefault();

            if (blog != null)
            {
                ModelState.AddModelError("", "This title has already existed.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var blogMap = _mapper.Map<Blog>(blogdto);
            var createResult = await _unitOfWork.BlogRepository.CreateAsync(blogMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            // Cập nhật lại giá trị ShopId cho shopdto từ shopMap
            var blogReturn = _mapper.Map<BlogDTO>(blogMap);
            return CreatedAtAction("GetById", new { id = blogReturn.BlogId }, blogReturn);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromBody] BlogUpdateDTO blogdto)
        {
            if (blogdto == null)
            {
                return BadRequest();
            }

            var existingBlog = await _unitOfWork.BlogRepository.GetByIdAsync(id);
            if (existingBlog == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy category
            }

            _mapper.Map(blogdto, existingBlog);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.BlogRepository.UpdateAsync(existingBlog);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating blog");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }


            return NoContent(); // Trả về 204 No Content nếu cập nhật thành công
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = $"{AppRole.Vip},{AppRole.Member}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var blog = await _unitOfWork.BlogRepository.GetByIdAsync(id);

            if (blog == null)
            {
                return NotFound();
            }


            await _unitOfWork.BlogRepository.RemoveAsync(blog);

            return NoContent();
        }
    }
}
