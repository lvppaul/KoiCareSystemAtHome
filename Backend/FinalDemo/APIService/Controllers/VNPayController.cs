using Domain.Models.Dto.Request;
using Domain.Models.Entity;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VNPayController : ControllerBase
    {
        private readonly IVnPayService _vnpayService;
        public VNPayController(IVnPayService vnPayService)
        {
            _vnpayService = vnPayService;
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


    }
}
