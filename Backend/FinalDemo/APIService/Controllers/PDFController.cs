using AutoMapper;
using Domain.Helper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Entity;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDFController : ControllerBase
    {
        private readonly PdfGenerator _pdfGenerator;
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public PDFController(UnitOfWork unitOfWork, IMapper mapper, PdfGenerator pdfGenerator) { 
            this._pdfGenerator = pdfGenerator;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> GeneratePDF(int orderId) {
            var orderFound = await _unitOfWork.OrderRepository.GetByOrderIdAsync(orderId);
            var order = _mapper.Map<OrderDTO>(orderFound);
            string htmlContent = _pdfGenerator.GenerateHtmlContent(order);
            byte[] pdfbytes = _pdfGenerator.GeneratePDF(htmlContent);

            return File(pdfbytes, "application/pdf", "Invoice.pdf");
        }
    }
}
