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
        //Task<VNPayResponseDTO> PaymentCallback(IQueryCollection collections);

       // Task<(bool success, string message)> ProcessVnPayCallback(IQueryCollection queryCollection);
        Task<(bool success, string message)> ProcessVnPayReturn(string returnUrl);
        //Task<(bool Success, string Message)> ProcessVnPayCallback2(IQueryCollection queryCollection);
    }
}
