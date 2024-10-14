using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository.Models.Dto;
using SWP391.KCSAH.Repository.Models;
using SWP391.KCSAH.Repository;
using Domain.Models;
using Domain.Models.Dto;
using KCSAH.APIServer.Dto;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrderController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetAllAsync()
        {
            var order = await _unitOfWork.OrderRepository.GetAllAsync();
            var result = _mapper.Map<List<OrderDTO>>(order);
            return Ok(result);
        }
        [HttpGet("{id}")]
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
            var order = await _unitOfWork.OrderRepository.GetByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<OrderDTO>(order);
            return Ok(result);
        }

        [HttpGet("ShopId/{id}")]
        public async Task<ActionResult<List<OrderDTO>>> GetOrderByShopIdAsync(int id)
        {
            var order = await _unitOfWork.ShopRepository.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<OrderDTO>>(order);
            return Ok(result);
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

            // Lưu vào cơ sở dữ liệu
            var createResult = await _unitOfWork.OrderRepository.CreateAsync(orderMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            foreach(var detail in orderMap.OrderDetails)
            {
                var product = await GetProductAsync(detail.ProductId);
                detail.UnitPrice = product.Price;
            }
            var order = _mapper.Map<OrderDTO>(orderMap);
            return CreatedAtAction(nameof(ReturnOrderById), new { id = order.OrderId }, order);
        }

        private async Task<Product> GetProductAsync(string id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);

            // Sử dụng AutoMapper để ánh xạ từ Category sang CategoryDTO
            return product;
        }
    }
}
