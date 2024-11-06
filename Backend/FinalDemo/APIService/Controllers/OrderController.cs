using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;
using KCSAH.APIServer.Dto;
using Domain.Models.Entity;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Request;
using Domain.Services;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private UserService _getService;

        public OrderController(UnitOfWork unitOfWork, IMapper mapper, UserService getService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _getService = getService;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetAllAsync()
        {
            var order = await _unitOfWork.OrderRepository.GetAllAsync();
            var result = _mapper.Map<List<OrderDTO>>(order);
            return Ok(result);
        }
        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<OrderDTO> ReturnOrderById(int id)
        {
            var order = _unitOfWork.OrderRepository.GetById(id);
            if (order == null)
            {
                return NoContent();
            }
            var result = _mapper.Map<OrderDTO>(order);
            return Ok(result);
        }

        [HttpGet("OrderId/{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrderByIdAsync(int id)
        {
            var order = await _unitOfWork.OrderRepository.GetByOrderIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<OrderDTO>(order);
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

        [HttpGet("UserId/{id}")]
        public async Task<IActionResult> GetOrderByUserIdAsync(string id)
        {
            var result = await _getService.GetOrderByUserIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(result);
            return Ok(show);
        }

        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder([FromBody] OrderRequestDTO orderdto)
        {
            if (orderdto == null)
            {
                return BadRequest("Order data cannot be null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderMap = _mapper.Map<Order>(orderdto);
            if (orderMap == null)
            {
                return BadRequest("Mapping to order entity failed.");
            }

            int total = 0;

            foreach (var detail in orderMap.OrderDetails)
            {
                var product = await GetProductAsync(detail.ProductId);
                if (product == null)
                {
                    return NotFound($"Product with ID {detail.ProductId} not found.");
                }

                detail.UnitPrice = product.Price;
                total += detail.UnitPrice * detail.Quantity;

                product.Quantity -= detail.Quantity;
                if (product.Quantity <= 0)
                {
                    product.Quantity = 0;
                    product.Status = false;
                }

                var updateProductResult = await _unitOfWork.ProductRepository.UpdateAsync(product);
                if (updateProductResult <= 0)
                {
                    ModelState.AddModelError("", "Something went wrong while updating product.");
                    return StatusCode(500, ModelState);
                }
            }

            orderMap.TotalPrice = total;

            var createResult = await _unitOfWork.OrderRepository.CreateAsync(orderMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the order.");
                return StatusCode(500, ModelState);
            }

            var revenue = _mapper.Map<Revenue>(orderMap);
            revenue.Income = (total * 10 / 100);
            var createResultRevenue = await _unitOfWork.RevenueRepository.CreateAsync(revenue);
            if (createResultRevenue <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving revenue.");
                return StatusCode(500, ModelState);
            }

            var cart = await _unitOfWork.CartRepository.GetByIdAsync(orderdto.UserId);
            if (cart != null)
            {
                var deleteCartResult = await _unitOfWork.CartRepository.RemoveAsync(cart);
                if (!deleteCartResult)
                {
                    ModelState.AddModelError("", "Something went wrong while deleting the cart.");
                    return StatusCode(500, ModelState);
                }
            }

            var order = _mapper.Map<OrderDTO>(orderMap);
            return CreatedAtAction(nameof(ReturnOrderById), new { id = order.OrderId }, order);
        }



        [HttpPost("CreateOrderVip")]
        public async Task<ActionResult<OrderDTO>> CreateOrderVip([FromBody] OrderVipRequestDTO ordervipdto)
        {
            if (ordervipdto == null)
            {
                return BadRequest("Order data cannot be null.");
            }

            

            var orderVipMap = _mapper.Map<Order>(ordervipdto);
            if (orderVipMap == null)
            {
                return BadRequest("Mapping to order entity failed.");
            }

            int total=0;

            foreach (var detail in orderVipMap.OrderVipDetails)
            {
                var vip = await _unitOfWork.VipPackageRepository.GetByIdAsync(detail.VipId);
                if (vip == null)
                {
                    return NotFound($"Vip with ID {detail.VipId} not found.");
                }

                total = vip.Price;    
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            orderVipMap.isVipUpgrade = true;
            orderVipMap.TotalPrice = total;
            

            var createResult = await _unitOfWork.OrderRepository.CreateAsync(orderVipMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the order.");
                return StatusCode(500, ModelState);
            }

            var revenue = _mapper.Map<Revenue>(orderVipMap);
            revenue.Income = total;
            var createResultRevenue = await _unitOfWork.RevenueRepository.CreateAsync(revenue);
            if (createResultRevenue <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving revenue.");
                return StatusCode(500, ModelState);
            }

            var order = _mapper.Map<OrderVipDTO>(orderVipMap);
            return CreatedAtAction(nameof(ReturnOrderById), new { id = order.OrderId }, order);
        }


        private async Task<Product> GetProductAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            return product;
        }
    }
}
