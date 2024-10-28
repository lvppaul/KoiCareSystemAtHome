using Domain.Models.Dto.Request;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("payment-callback")]
        public async Task<IActionResult> PaymentCallback()
        {
            try
            {
                var response = await _vnpayService.PaymentCallback(Request.Query);

                if (response.Success)
                {
                    return Ok(response);
                }

                return BadRequest(response);
            }
            catch (Exception ex)
            {
                // Log exception
                return BadRequest(new { Message = "Có lỗi xảy ra", Error = ex.Message });
            }
        }

    }
}
