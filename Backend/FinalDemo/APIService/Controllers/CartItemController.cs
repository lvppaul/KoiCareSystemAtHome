using AutoMapper;
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
    public class CartItemController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CartItemController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        private async Task<Product> GetProductAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            return product;
        }

        [HttpPut("{userId}/items/{productId}")]
        public async Task<IActionResult> UpdateCartItem(string userId, int productId, [FromBody] CartItemUpdateDTO cartItemUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingCart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(userId);
            if (existingCart == null)
            {
                return NotFound("Cart not found.");
            }

            // Tìm CartItem hiện có trong giỏ hàng với ProductId cần cập nhật
            var cartItem = existingCart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
            if (cartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            // Cập nhật số lượng và tính lại giá
            cartItem.Quantity = cartItemUpdateDto.Quantity;

            var product = await GetProductAsync(cartItem.ProductId);
            if (product != null)
            {
                cartItem.Price = product.Price;
                cartItem.TotalPrice = cartItem.Price * cartItem.Quantity;
            }

            // Cập nhật tổng số tiền của giỏ hàng
            existingCart.TotalAmount = existingCart.CartItems.Sum(x => x.TotalPrice);

            var updateResult = await _unitOfWork.CartRepository.UpdateAsync(existingCart);

            if (updateResult <= 0)
            {
                return StatusCode(500, "Error updating the cart item.");
            }

            var result = _mapper.Map<CartDTO>(existingCart);
            return Ok(result);
        }

        [HttpDelete("{userId}/{productId}")]
        public async Task<IActionResult> DeleteCartItem(string userId, int productId)
        {
            var existingCart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(userId);
            if (existingCart == null)
            {
                return NotFound("Cart not found.");
            }

            var cartItem = existingCart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
            if (cartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            existingCart.CartItems.Remove(cartItem);

            existingCart.TotalAmount = existingCart.CartItems.Sum(x => x.TotalPrice);

            var updateResult = await _unitOfWork.CartRepository.UpdateAsync(existingCart);
            if (updateResult <= 0)
            {
                return StatusCode(500, "Error deleting the cart item.");
            }

            return Ok("Cart item deleted successfully.");
        }

    }
}
