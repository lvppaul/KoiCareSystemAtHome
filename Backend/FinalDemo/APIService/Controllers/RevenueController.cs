using AutoMapper;
using Domain.Models.Dto.Response;
using Domain.Services;
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

        public RevenueController(UnitOfWork unitOfWork, IMapper mapper, UserService getService)
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

        [HttpGet("TotalAdminRevenue")]
        public async Task<IActionResult> GetTotalRevenue()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalAdminRevenue();

            return Ok(result);
        }

        [HttpGet("GetVipUpgradeRevenue")]
        public async Task<ActionResult<List<RevenueDTO>>> GetVipUpgradeRevenue()
        {
            var revenue = await _unitOfWork.RevenueRepository.GetVipUpgradeRevenue();

            var result = _mapper.Map<List<RevenueDTO>>(revenue);

            return result;
        }

        [HttpGet("GetProductAdminRevenue")]
        public async Task<ActionResult<List<RevenueDTO>>> GetProductRevenue()
        {
            var revenue = await _unitOfWork.RevenueRepository.GetProductAdminRevenue();

            var result = _mapper.Map<List<RevenueDTO>>(revenue);

            return result;
        }

        [HttpGet("GetVipPackageOrderNumber")]
        public async Task<IActionResult> GetVipPackageOrder()
        {
            var result = await _unitOfWork.RevenueRepository.GetNumberofVipUpgrade();
            return Ok(result);
        }

        [HttpGet("GetProductOrderNumberByAdmin")]
        public async Task<IActionResult> GetProductOrderNumber()
        {
            var result = await _unitOfWork.RevenueRepository.GetNumberofProductOrderByAdmin();
            return Ok(result);
        }

        [HttpGet("GetTotalProductRevenue")]
        public async Task<IActionResult> GetTotalProductRevenue()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalProductAdminRevenue();

            return Ok(result);
        }

        [HttpGet("GetTotalVipUpgradeRevenue")]
        public async Task<IActionResult> GetTotalVipUpgradeRevenue()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalVipUpgradeRevenue();

            return Ok(result);
        }

        [HttpGet("GetRevenueByShop/{shopId}")]
        public async Task<IActionResult> GetRevenueByShopAsync(int shopId)
        {
            var revenue = await _unitOfWork.RevenueRepository.GetRevenueByShop(shopId);
            if (revenue == null || !revenue.Any())
            {
                return NotFound($"No revenue found for shop with ID {shopId}.");
            }

            var result = _mapper.Map<List<RevenueDTO>>(revenue);
            return Ok(result);
        }

    }
}
