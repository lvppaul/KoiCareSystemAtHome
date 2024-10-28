using Domain.Helper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Domain.Services
{
    public interface IVnPayService
    {
        Task<string> CreatePaymentUrl(HttpContext context, VNPayRequestDTO model);
        Task<VnPaymentResponseModel> PaymentCallback(IQueryCollection collections);
    }
}
