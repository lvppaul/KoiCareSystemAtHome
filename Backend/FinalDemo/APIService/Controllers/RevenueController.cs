using AutoMapper;
using Domain.Models.Dto.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RevenueController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RevenueController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<RevenueDTO>>> GetAllAsync()
        {
            var revenue = await _unitOfWork.RevenueRepository.GetAllAsync();
            var result = _mapper.Map<List<RevenueDTO>>(revenue);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RevenueDTO>> GetByIdAsync(int id)
        {
            var revenue = _unitOfWork.RevenueRepository.GetById(id);
            if (revenue == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<RevenueDTO>(revenue);
            return result;
        }
    }
}
