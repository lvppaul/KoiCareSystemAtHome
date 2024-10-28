using AutoMapper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopRatingController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly KoiCareSystemAtHomeContext _context;

        public ShopRatingController(UnitOfWork unitOfWork, IMapper mapper, KoiCareSystemAtHomeContext context)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<ShopRatingDTO> GetById(int id)
        {
            var rating = _unitOfWork.ShopRatingRepository.GetById(id);
            if (rating == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ShopRatingDTO>(rating);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<ShopRatingDTO>> CreateRating([FromBody] ShopRatingRequestDTO ratingdto)
        {
            if (ratingdto == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existRating = await _unitOfWork.ShopRatingRepository.RatingExist(ratingdto.ShopId, ratingdto.UserId);
            if(existRating != null)
            {
                return StatusCode(422, "You have rated for this shop already.");
            }
            // Map dữ liệu
            var ratingMap = _mapper.Map<ShopRating>(ratingdto);

            // Tạo rating mới
            var createResult = await _unitOfWork.ShopRatingRepository.CreateAsync(ratingMap);

            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }

            // Cập nhật giá trị trung bình rating cho Shop
            await UpdateShopRatingAsync(ratingMap.ShopId);

            var ratingReturn = _mapper.Map<ShopRatingDTO>(ratingMap);
            return CreatedAtAction("GetById", new { id = ratingReturn.RatingId }, ratingReturn);
        }

        private async Task UpdateShopRatingAsync(int shopId)
        {
            var averageRating = await _context.ShopRatings
                .Where(sr => sr.ShopId == shopId)
                .AverageAsync(sr => (decimal?)sr.Rating);

            var shop = await _context.Shops.FindAsync(shopId);
            if (shop != null)
            {
                shop.Rating = averageRating.HasValue ? Math.Round(averageRating.Value, 1) : 0;
                await _context.SaveChangesAsync();
            }
        }

    }
}
