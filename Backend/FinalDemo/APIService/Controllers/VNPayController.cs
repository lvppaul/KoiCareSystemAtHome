using Domain.Models.Dto.Request;
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
    public class VNPayController : ControllerBase
    {
        private readonly IVnPayService _vnpayService;
        private readonly UnitOfWork _unitOfWork;
        public VNPayController(IVnPayService vnPayService,UnitOfWork unitOfWork)
        {
            _vnpayService = vnPayService;
            _unitOfWork = unitOfWork;
        }
        [HttpPost("create-payment")]
        public async Task<IActionResult> CreatePayment([FromBody] VNPayRequestDTO model)
        {
            try
            {
                var result = await _vnpayService.CreatePaymentUrl(HttpContext, model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log exception
                return BadRequest(new { Message = "Có lỗi xảy ra", Error = ex.Message });
            }
            //using (var transaction = await _unitOfWork.BeginTransactionAsync())
            //{
            //    try
            //    {
            //        // Kiểm tra trạng thái đơn hàng trước khi thực hiện thanh toán
            //        var order = await _unitOfWork.OrderRepository.GetByIdAsync(model.OrderId);
            //        if (order == null)
            //        {
            //            return NotFound(new { Message = "Order not found" });
            //        }

            //        // Kiểm tra nếu đơn hàng đã được thanh toán
            //        if (order.OrderStatus == "Giao dịch thành công")
            //        {
            //            return BadRequest(new { Message = "This order has already been paid." });
            //        }

            //        // Đánh dấu đơn hàng là 'Pending' để ngăn chặn các giao dịch khác xử lý cùng lúc
            //        order.OrderStatus = "Đang chờ thanh toán";
            //        await _unitOfWork.OrderRepository.UpdateAsync(order);

            //        // Tạo URL thanh toán VNPay
            //        var result = await _vnpayService.CreatePaymentUrl(HttpContext, model);

            //        // Sau khi có URL thanh toán, commit transaction để lưu lại trạng thái 'Pending'
            //        await transaction.CommitAsync();

            //        return Ok(result);
            //    }
            //    catch (Exception ex)
            //    {
            //        // Nếu có lỗi xảy ra, rollback transaction để giữ nguyên trạng thái của đơn hàng
            //        await transaction.RollbackAsync();

            //        // Log lỗi (nếu cần)
            //        return BadRequest(new { Message = "Có lỗi xảy ra", Error = ex.Message });
            //    }
            //}
        }

        //[HttpGet("payment-callback")]
        //public async Task<IActionResult> PaymentCallback()
        //{
        //    try
        //    {
        //        var response = await _vnpayService.PaymentCallback(Request.Query);

        //        if (response.Success)
        //        {
        //            return Ok(response);
        //        }

        //        return BadRequest(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log exception
        //        return BadRequest(new { Message = "Có lỗi xảy ra", Error = ex.Message });
        //    }
        //}

        [HttpGet("vnpay-return")]
        public async Task<IActionResult> VnPayReturn([FromQuery] string returnUrl)
        {
            try
            {
                var (success, message) = await _vnpayService.ProcessVnPayReturn(returnUrl);

                if (!success)
                {
                    return BadRequest(new { Message = message });
                }

                return Ok(new { Message = message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while processing the payment" });
            }
        }

        //[HttpGet("vnpay-return-buynow")]
        //public async Task<IActionResult> VnPayReturnBuyNow([FromQuery] string returnUrl)
        //{
        //    try
        //    {
        //        var (success, message) = await _vnpayService.ProcessVnPayReturnBuyNow(returnUrl);

        //        if (!success)
        //        {
        //            return BadRequest(new { Message = message });
        //        }

        //        return Ok(new { Message = message });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { Message = "An error occurred while processing the payment" });
        //    }
        //}


    }
}
