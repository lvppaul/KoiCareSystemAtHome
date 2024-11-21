using AutoMapper;
using Domain.Base;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Entity;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IAccountRepository accountRepository;
        private readonly IMapper _mapper;
        private UserService _getService;
        private readonly OrderService _orderService;

        public OrderController(UnitOfWork unitOfWork, IMapper mapper, UserService getService, IAccountRepository accountRepository, OrderService orderService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _getService = getService;
            this.accountRepository = accountRepository;
            _orderService = orderService;
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

        [HttpGet("GetVipOrder")]
        public async Task<IActionResult> GetVipOrder()
        {
            var order = await _unitOfWork.OrderRepository.GetVipOrder();
            if (order == null)
            {
                return NoContent();
            }
            var result = _mapper.Map<List<OrderVipDTO>>(order);
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

        [HttpGet("UserId-Order-History/{id}")]
        public async Task<IActionResult> GetOrderInOrderHistoryByUserIdAsync(string id)
        {
            var result = await _getService.GetOrderInHistoryByUserIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(result);
            return Ok(show);
        }

        [HttpGet("ShopId/{id}")]
        public async Task<IActionResult> GetOrderByShopIdAsync(int id)
        {
            var result = await _getService.GetOrderByShopIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(result);
            return Ok(show);
        }

        [HttpGet("Order-all-member")]
        public async Task<IActionResult> GetAllOrderMemberAsync()
        {
            var result = await _getService.GetAllOrderForMemberAsync();
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(result);
            return Ok(show);
        }

        [HttpGet("VipOrderByUserId/{id}")]
        public async Task<IActionResult> GetVipOrderByUserIdAsync(string id)
        {
            var result = await _getService.GetVipOrderByUserIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderVipDTO>>(result);
            return Ok(show);
        }

        // Lấy orderVip của ngày hôm nay
        [HttpGet("vip-orders-today")]
        public async Task<IActionResult> GetVipOrdersToday()
        {
            var orders = await _unitOfWork.OrderRepository.GetVipOrdersTodayAsync();
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderVipDTO>>(orders);
            return Ok(show);
        }

        // Lấy order của ngày 
        [HttpGet("orders-by-day")]
        public async Task<IActionResult> GetOrdersByDay([FromQuery] int days = 0)
        {
            var orders = await _unitOfWork.OrderRepository.GetOrdersByDayAsync(days);
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(orders);
            return Ok(show);
        }

        // Lấy order của ngày 
        [HttpGet("orders-by-day-member")]
        public async Task<IActionResult> GetOrdersByDayForMember([FromQuery] int days = 0)
        {
            var orders = await _unitOfWork.OrderRepository.GetOrdersMemberByDayAsync(days);
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(orders);
            return Ok(show);
        }

        // Lấy order của ngày 
        [HttpGet("orders-for-shop-by-day")]
        public async Task<IActionResult> GetOrdersForShopByDay([FromQuery] int shopId, int days = 0)
        {
            var orders = await _unitOfWork.OrderRepository.GetOrdersForShopByDayAsync(days, shopId);
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(orders);
            return Ok(show);
        }

        [HttpGet("all-vip-orders-successful")]
        public async Task<IActionResult> GetAllVipOrdersSuccessful()
        {
            var orders = await _unitOfWork.OrderRepository.GetAllVipOrdersSuccessfulAsync();
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderVipDTO>>(orders);
            return Ok(show);
        }

        [HttpGet("all-vip-orders-failed")]
        public async Task<IActionResult> GetAllVipOrdersFailed()
        {
            var orders = await _unitOfWork.OrderRepository.GetAllVipOrdersFailedAsync();
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderVipDTO>>(orders);
            return Ok(show);
        }

        [HttpGet("all-user-orders-successful")]
        public async Task<IActionResult> GetAllUserOrdersSuccessful()
        {
            var orders = await _unitOfWork.OrderRepository.GetAllUserOrdersSuccessfulAsync();
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(orders);
            return Ok(show);
        }

        [HttpGet("all-user-orders-failed")]
        public async Task<IActionResult> GetAllUserOrdersFailed()
        {
            var orders = await _unitOfWork.OrderRepository.GetAllUserOrdersFailedAsync();
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(orders);
            return Ok(show);
        }

        // Lấy orderVip của ngày 
        [HttpGet("vip-orders-by-day")]
        public async Task<IActionResult> GetVipOrdersByDay([FromQuery] int days = 0)
        {
            var orders = await _unitOfWork.OrderRepository.GetVipOrdersByDayAsync(days);
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderVipDTO>>(orders);
            return Ok(show);
        }

        // Lấy orderVip của tuần hiện tại (hoặc x tuần trước)
        [HttpGet("vip-orders-by-week")]
        public async Task<IActionResult> GetVipOrdersByWeek([FromQuery] int weeks = 1)
        {
            var orders = await _unitOfWork.OrderRepository.GetVipOrdersByWeekAsync(weeks);
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderVipDTO>>(orders);
            return Ok(show);
        }

        // Lấy orderVip của tháng hiện tại (hoặc x tháng trước)
        [HttpGet("vip-orders-by-month")]
        public async Task<IActionResult> GetVipOrdersByMonth([FromQuery] int month = 1)
        {
            var orders = await _unitOfWork.OrderRepository.GetVipOrdersByMonthAsync(month);
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderVipDTO>>(orders);
            return Ok(show);
        }

        // Lấy orderVip của tháng hiện tại (hoặc x tháng trước)
        [HttpGet("vip-orders-by-input-month")]
        public async Task<IActionResult> GetVipOrdersByInputMonth([FromQuery] int month = 1)
        {
            var orders = await _unitOfWork.OrderRepository.GetVipOrdersByInputMonthAsync(month);
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderVipDTO>>(orders);
            return Ok(show);
        }

        // Lấy orderVip của tháng hiện tại (hoặc x tháng trước)
        [HttpGet("orders-by-input-month")]
        public async Task<IActionResult> GetOrdersByInputMonth([FromQuery] int month = 1)
        {
            var orders = await _unitOfWork.OrderRepository.GetOrdersByInputMonthAsync(month);
            if (orders == null)
            {
                return NotFound();
            }
            var show = _mapper.Map<List<OrderDTO>>(orders);
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

                //product.Quantity -= detail.Quantity;
                //if (product.Quantity <= 0)
                //{
                //    product.Quantity = 0;
                //    product.Status = false;
                //}

                //var updateProductResult = await _unitOfWork.ProductRepository.UpdateAsync(product);
                //if (updateProductResult <= 0)
                //{
                //    ModelState.AddModelError("", "Something went wrong while updating product.");
                //    return StatusCode(500, ModelState);
                //}
            }

            orderMap.TotalPrice = total;

            var createResult = await _unitOfWork.OrderRepository.CreateAsync(orderMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the order.");
                return StatusCode(500, ModelState);
            }

            //var revenueDto = new RevenueRequestDTO
            //{
            //    OrderId = orderMap.OrderId,
            //    Income = (total * 8 / 100)
            //};

            //var revenue = _mapper.Map<Revenue>(revenueDto);

            //var createResultRevenue = await _unitOfWork.RevenueRepository.CreateAsync(revenue);
            //if (createResultRevenue <= 0)
            //{
            //    ModelState.AddModelError("", "Something went wrong while saving revenue.");
            //    return StatusCode(500, ModelState);
            //}

            var order = _mapper.Map<OrderDTO>(orderMap);
            return CreatedAtAction(nameof(ReturnOrderById), new { id = order.OrderId }, order);
        }

        [HttpPost("CreateOrderBuyNow")]
        public async Task<ActionResult<OrderDTO>> CreateOrderBuyNow([FromBody] OrderRequestDTO orderdto)
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
            }

            orderMap.TotalPrice = total;
            orderMap.isBuyNow = true;

            var createResult = await _unitOfWork.OrderRepository.CreateAsync(orderMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the order.");
                return StatusCode(500, ModelState);
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

            var user = await _unitOfWork.VipRecordRepository.GetAccountByUserIdAsync(ordervipdto.UserId);
            foreach (var item in user.VipRecords)
            {
                if (item.EndDate > DateTime.Now)
                {
                    return BadRequest("User is already VIP.");
                }
            }

            var orderVipMap = _mapper.Map<Order>(ordervipdto);
            if (orderVipMap == null)
            {
                return BadRequest("Mapping to order entity failed.");
            }

            int total = 0;

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
            orderVipMap.FullName = user.LastName + " " + user.FirstName;
            orderVipMap.Email = user.Email;
            orderVipMap.Phone = user.PhoneNumber;

            var createResult = await _unitOfWork.OrderRepository.CreateAsync(orderVipMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the order.");
                return StatusCode(500, ModelState);
            }

            //var revenueDto = new RevenueRequestDTO
            //{
            //    OrderId = orderVipMap.OrderId,
            //    isVip = true,
            //    Income = total
            //};

            //var revenue = _mapper.Map<Revenue>(revenueDto);
            //var createResultRevenue = await _unitOfWork.RevenueRepository.CreateAsync(revenue);
            //if (createResultRevenue <= 0)
            //{
            //    ModelState.AddModelError("", "Something went wrong while saving revenue.");
            //    return StatusCode(500, ModelState);
            //}
            var order = _mapper.Map<OrderVipDTO>(orderVipMap);

            return CreatedAtAction(nameof(ReturnOrderById), new { id = order.OrderId }, order);
        }

        [HttpPost("{orderId}/set-successful")]
        public async Task<IActionResult> SetOrderStatusSuccessful(int orderId)
        {
            try
            {
                var (updateShop, updateUser) = await _orderService.SetStatusSuccessfulOrderByShop(orderId);
                if (updateShop == 0)
                {
                    return BadRequest(new { Message = "Failed to update order detail status", OrderId = orderId });
                }
                return Ok(new { Message = "Order status updated to Successful", OrderId = orderId });
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                return StatusCode(500, new { Message = "An error occurred while updating order status", Details = ex.Message });
            }
        }

        [HttpPost("{orderId}/product/{productId}/set-successful")]
        public async Task<IActionResult> SetOrderDetailStatusSuccessful(int orderId, int productId)
        {
            try
            {
                var (updateShop, updateUser) = await _orderService.SetStatusSuccessfulOrderDetailByShop(orderId, productId);

                if (updateShop == 0)  // Giả sử result == 1 nghĩa là cập nhật thành công
                {
                    return BadRequest(new { Message = "Failed to update order detail status", OrderId = orderId, ProductId = productId });
                }
                else
                {
                    return Ok(new { Message = "Order detail and status updated successfully", OrderId = orderId, ProductId = productId });
                }
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần thiết
                return StatusCode(500, new { Message = "An error occurred while updating order detail status", Details = ex.Message });
            }
        }

        private async Task<Product> GetProductAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            return product;
        }
    }
}
