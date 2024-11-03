using Domain.Helper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Entity;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDFController : ControllerBase
    {
        private readonly PdfGenerator _pdfGenerator;
        public PDFController(PdfGenerator pdfGenerator) { 
            this._pdfGenerator = pdfGenerator;
        }

        [HttpPost]
        public IActionResult GeneratePDF(OrderDTO order) {
            string htmlContent = _pdfGenerator.GenerateHtmlContent(order);
            byte[] pdfbytes = _pdfGenerator.GeneratePDF(htmlContent);

            return File(pdfbytes, "application/pdf", "Invoice.pdf");
        }
    }
}
