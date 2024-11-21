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
        private readonly UserService _userService;

        public RevenueController(UnitOfWork unitOfWork, IMapper mapper, UserService getService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userService = getService;
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

        [HttpGet("TotalAdminRevenueThisMonth")]
        public async Task<IActionResult> GetTotalRevenueThisMonth()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalAdminRevenueThisMonth();

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

        [HttpGet("GetTotalProductRevenueThisMonth")]
        public async Task<IActionResult> GetTotalProductRevenueThisMonth()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalProductAdminRevenueThisMonth();

            return Ok(result);
        }

        [HttpGet("GetTotalVipUpgradeRevenue")]
        public async Task<IActionResult> GetTotalVipUpgradeRevenue()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalVipUpgradeRevenue();

            return Ok(result);
        }

        [HttpGet("GetTotalVipUpgradeRevenueThisMonth")]
        public async Task<IActionResult> GetTotalVipUpgradeRevenueThisMonth()
        {
            var result = await _unitOfWork.RevenueRepository.GetTotalVipUpgradeRevenueThisMonth();

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

        [HttpGet("GetTotalRevenueByShopFromOrders/{shopId}")]
        public async Task<IActionResult> GetTotalRevenueByShopFromOrdersAsync(int shopId)
        {
            var total = await _unitOfWork.RevenueRepository.GetTotalRevenueByShopFromOrders(shopId);
            return Ok(total);
        }

        [HttpGet("GetTotalRevenueByShopFromOrdersThisMonth/{shopId}")]
        public async Task<IActionResult> GetTotalRevenueByShopFromOrdersThisMonthAsync(int shopId)
        {
            var total = await _unitOfWork.RevenueRepository.GetTotalRevenueByShopFromOrdersThisMonth(shopId);
            return Ok(total);
        }

        [HttpGet("GetTotalRevenueNoCommissionByShopFromOrders/{shopId}")]
        public async Task<IActionResult> GetTotalRevenueNoCommissionByShopFromOrdersAsync(int shopId)
        {
            var total = await _unitOfWork.RevenueRepository.GetTotalRevenueNoCommissionFee(shopId);
            return Ok(total);
        }

        [HttpGet("GetTotalRevenueNoCommissionByShopFromOrdersThisMonth/{shopId}")]
        public async Task<IActionResult> GetTotalRevenueNoCommissionByShopFromOrdersThisMonthAsync(int shopId)
        {
            var total = await _unitOfWork.RevenueRepository.GetTotalRevenueNoCommissionFeeThisMonth(shopId);
            return Ok(total);
        }

        [HttpGet("GetCommissionFeeByShopFromOrders/{shopId}")]
        public async Task<IActionResult> GetCommissionFeeByShopFromOrdersAsync(int shopId)
        {
            var total = await _unitOfWork.RevenueRepository.GetCommissionFee(shopId);
            return Ok(total);
        }

        [HttpGet("GetCommissionFeeByShopFromOrdersThisMonth/{shopId}")]
        public async Task<IActionResult> GetCommissionFeeByShopFromOrdersThisMonthAsync(int shopId)
        {
            var total = await _unitOfWork.RevenueRepository.GetCommissionFeeThisMonth(shopId);
            return Ok(total);
        }

        [HttpGet("top-5-shops")]
        public async Task<IActionResult> GetTop5ShopsByRevenue()
        {
            var topShops = await _unitOfWork.RevenueRepository.GetTop5ShopsByRevenue();

            if (topShops == null || !topShops.Any())
            {
                return NotFound(new { Message = "No shops found with revenue data." });
            }

            return Ok(topShops.Select(shop => new
            {
                ShopId = shop.ShopId,
                ShopName = shop.shopName,
                TotalRevenue = shop.TotalRevenue
            }));
        }

    }
}
