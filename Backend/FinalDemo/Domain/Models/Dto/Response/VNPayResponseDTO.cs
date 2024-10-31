using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    //Mô tả lớp kết quả trả về khi thanh toán:
    public class VNPayResponseDTO
    {
        public bool Success { get; set; }
        public string PaymentMethod { get; set; }
        public string OrderDescription { get; set; }
        public string OrderId { get; set; }
        public string PaymentId { get; set; }
        public string TransactionId { get; set; }
        public string Token { get; set; }
        public string VnPayResponseCode { get; set; }

        public DateTime TransactionDate { get; set; }
        public int Amount { get; set; }
        public string Message { get; set; }
    }
}
