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

        [HttpGet("TotalRevenue")]
        public async Task<IActionResult> GetTotalRevenue()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalRevenue();

            return Ok(result);
        }

        [HttpGet("GetVipUpgradeRevenue")]
        public async Task<ActionResult<List<RevenueDTO>>> GetVipUpgradeRevenue()
        {
            var revenue = await _unitOfWork.RevenueRepository.GetVipUpgradeRevenue();

            var result = _mapper.Map<List<RevenueDTO>>(revenue);

            return result;
        }

        [HttpGet("GetProductRevenue")]
        public async Task<ActionResult<List<RevenueDTO>>> GetProductRevenue()
        {
            var revenue = await _unitOfWork.RevenueRepository.GetProductRevenue();

            var result = _mapper.Map<List<RevenueDTO>>(revenue);

            return result;
        }

        [HttpGet("GetVipPackageOrderNumber")]
        public async Task<IActionResult> GetVipPackageOrder()
        {
            var result = await _unitOfWork.RevenueRepository.GetNumberofVipUpgrade();
            return Ok(result);
        }

        [HttpGet("GetProductOrderNumber")]
        public async Task<IActionResult> GetProductOrderNumber()
        {
            var result = await _unitOfWork.RevenueRepository.GetNumberofProductOrder();
            return Ok(result);
        }

        [HttpGet("GetTotalProductRevenue")]
        public async Task<IActionResult> GetTotalProductRevenue()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalProductRevenue();

            return Ok(result);
        }

        [HttpGet("GetTotalVipUpgradeRevenue")]
        public async Task<IActionResult> GetTotalVipUpgradeRevenue()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalVipUpgradeRevenue();

            return Ok(result);
        }

    }
}
