using AutoMapper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
using Domain.Models.Entity;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CartController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<CartDTO>>> GetAllAsync()
        {
            var cart = await _unitOfWork.CartRepository.GetAllAsync();
            var result = _mapper.Map<List<CartDTO>>(cart);
            return Ok(result);
        }
        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<CartDTO> ReturnCartById(int id)
        {
            var cart = _unitOfWork.CartRepository.GetByIdAsync(id);
            if (cart == null)
            {
                return NoContent();
            }
            var result = _mapper.Map<CartDTO>(cart);
            return Ok(result);
        }

        [HttpGet("CartId/{id}")]
        public async Task<ActionResult<CartDTO>> GetCartByIdAsync(int id)
        {
            var cart = await _unitOfWork.CartRepository.GetCartByIdAsync(id);
            if (cart == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<CartDTO>(cart);
            return Ok(result);
        }

        [HttpGet("UserId/{UserId}")]
        public async Task<ActionResult<CartDTO>> GetCartByUserIdAsync(string UserId)
        {
            var cart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(UserId);
            if (cart == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<CartDTO>(cart);
            return Ok(result);
        }

        //[HttpGet("ShopId/{id}")]
        //public async Task<ActionResult<List<OrderDTO>>> GetOrderByShopIdAsync(int id)
        //{
        //    var order = await _unitOfWork.ShopRepository.GetOrderById(id);
        //    if (order == null)
        //    {
        //        return NotFound();
        //    }
        //    var result = _mapper.Map<List<OrderDTO>>(order);
        //    return Ok(result);
        //}

        //[HttpGet("UserId/{id}")]
        //public async Task<IActionResult> GetCartByUserIdAsync(string id)
        //{
        //    var result = await _getService.GetOrderByUserIdAsync(id);
        //    if (result == null)
        //    {
        //        return NotFound();
        //    }
        //    var show = _mapper.Map<List<OrderDTO>>(result);
        //    return Ok(show);
        //}
        [HttpPost]
        public async Task<ActionResult<CartDTO>> CreateOrder([FromBody] CartRequestDTO cartdto)
        {
            if (cartdto == null)
            {
                return BadRequest("Cart data cannot be null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingCart = await _unitOfWork.CartRepository.GetByIdAsync(cartdto.UserId);

            if (existingCart != null)
            {
                return BadRequest("Cart for this user already exists.");
            }

            var cartMap = _mapper.Map<Cart>(cartdto);
            if (cartMap == null)
            {
                return BadRequest("Mapping to cart entity failed.");
            }
            int total = 0; // Khởi tạo giá trị cho total
            foreach (var detail in cartMap.CartItems)
            {
                var cartitem = await GetProductAsync(detail.ProductId);
                detail.ProductName = cartitem.Name;
                detail.Price = cartitem.Price;
                detail.TotalPrice = detail.Price * detail.Quantity;
                detail.Thumbnail = cartitem.Thumbnail;
                total += detail.Price * detail.Quantity;
            }
            cartMap.TotalAmount = total;
            // Lưu vào cơ sở dữ liệu
            var createResult = await _unitOfWork.CartRepository.CreateAsync(cartMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            var cart = _mapper.Map<CartDTO>(cartMap);
            return CreatedAtAction(nameof(ReturnCartById), new { id = cart.CartId }, cart);
        }

        [HttpPost("AddItem")]
        public async Task<IActionResult> AddItemToCart(string userId, [FromBody] CartItemRequestDTO cartItemDto)
        {
            var cart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(userId);
            if (cart == null)
            {
                return NotFound("Cart not found for this user.");
            }

            var product = await GetProductAsync(cartItemDto.ProductId);
            if (product == null)
            {
                return BadRequest("Product not found.");
            }

            var existingItem = cart.CartItems.FirstOrDefault(x => x.ProductId == cartItemDto.ProductId);
            int totalQuantityRequested = cartItemDto.Quantity;

            if (existingItem != null)
            {
                totalQuantityRequested += existingItem.Quantity;
            }

            if (totalQuantityRequested > product.Quantity)
            {
                return BadRequest($"Only {product.Quantity} units of {product.Name} are available in stock.");
            }

            if (existingItem != null)
            {
                existingItem.Quantity += cartItemDto.Quantity;
                existingItem.TotalPrice = existingItem.Price * existingItem.Quantity;
            }
            else
            {
                var newItem = new CartItem
                {
                    ProductId = product.ProductId,
                    ProductName = product.Name,
                    Price = product.Price,
                    Quantity = cartItemDto.Quantity,
                    TotalPrice = product.Price * cartItemDto.Quantity,
                    Thumbnail = product.Thumbnail
                };
                cart.CartItems.Add(newItem);
            }

            cart.TotalAmount = cart.CartItems.Sum(x => x.TotalPrice);

            var updateResult = await _unitOfWork.CartRepository.UpdateAsync(cart);

            if (updateResult <= 0)
            {
                return StatusCode(500, "Error updating the cart.");
            }

            var result = _mapper.Map<CartDTO>(cart);
            return Ok(result);
        }


        [HttpPost("RemoveItem")]
        public async Task<IActionResult> RemoveItemFromCart(string userId, [FromBody] CartItemRequestDTO cartItemDto)
        {
            var cart = await _unitOfWork.CartRepository.GetCartByUserIdAsync(userId);
            if (cart == null)
            {
                return NotFound("Cart not found for this user.");
            }

            var existingItem = cart.CartItems.FirstOrDefault(x => x.ProductId == cartItemDto.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity -= cartItemDto.Quantity;

                if (existingItem.Quantity <= 0)
                {
                    cart.CartItems.Remove(existingItem);
                }
                else
                {
                    existingItem.TotalPrice = existingItem.Price * existingItem.Quantity;
                }
            }
            else
            {
                return BadRequest("Product is not in the cart.");
            }

            cart.TotalAmount = cart.CartItems.Sum(x => x.TotalPrice);

            var updateResult = await _unitOfWork.CartRepository.UpdateAsync(cart);
            if (updateResult <= 0)
            {
                return StatusCode(500, "Error updating the cart.");
            }

            var result = _mapper.Map<CartDTO>(cart);
            return Ok(result);
        }



        private async Task<Product> GetProductAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            return product;
        }

    }
}
