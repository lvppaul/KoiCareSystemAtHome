using AutoMapper;
using Domain.Models.Dto.Request;
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
    public class PaymentMethodController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public PaymentMethodController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentMethodDTO>>> GetAllASync()
        {
            var payments = await _unitOfWork.PaymentMethodRepository.GetAllAsync();
            var paymentDTOs = _mapper.Map<List<PaymentMethodDTO>>(payments);
            return Ok(paymentDTOs);
        }


        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<PaymentMethodDTO> GetById(int id)
        {
            var payment = _unitOfWork.PaymentMethodRepository.GetById(id);
            if (payment == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<PaymentMethodDTO>(payment);
            return result;
        }

        [HttpGet("async/{id}")]
        public async Task<ActionResult<PaymentMethodDTO>> GetByIdAsync(int id)
        {
            var payments = await _unitOfWork.PaymentMethodRepository.GetByIdAsync(id);
            if (payments == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<PaymentMethodDTO>(payments);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<PaymentMethodDTO>> CreatePaymentMethod([FromBody] PaymentMethodUpdateDTO payment)
        {
            if (payment == null)
            {
                return BadRequest(ModelState);
            }

            var pay = _unitOfWork.PaymentMethodRepository.GetAll().Where(c => c.PaymentName.ToUpper() == payment.PaymentName.ToUpper()).FirstOrDefault();

            if (pay != null)
            {
                ModelState.AddModelError("", "Payment Method already exists.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var payMap = _mapper.Map<PaymentMethod>(payment);
            var createResult = await _unitOfWork.PaymentMethodRepository.CreateAsync(payMap);
            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving.");
                return StatusCode(500, ModelState);
            }
            var paymentShow = _mapper.Map<PaymentMethodDTO>(payMap);

            return CreatedAtAction("GetById", new { id = paymentShow.PaymentMethodId }, paymentShow);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePaymentMethod(int id, [FromBody] PaymentMethodUpdateDTO paymentDto)
        {
            if (paymentDto == null)
            {
                return BadRequest();
            }

            var existingPayment = await _unitOfWork.PaymentMethodRepository.GetByIdAsync(id);
            if (existingPayment == null)
            {
                return NotFound(); 
            }

            _mapper.Map(paymentDto, existingPayment);

            // Cập nhật vào cơ sở dữ liệu
            var updateResult = await _unitOfWork.PaymentMethodRepository.UpdateAsync(existingPayment);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating payment method");
                return StatusCode(500, ModelState); // Trả về 500 nếu có lỗi khi cập nhật
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentMethod(int id)
        {
            var payment = await _unitOfWork.PaymentMethodRepository.GetByIdAsync(id);

            if (payment == null)
            {
                return NotFound();
            }

            await _unitOfWork.PaymentMethodRepository.RemoveAsync(payment);

            return NoContent();
        }
    }
}
