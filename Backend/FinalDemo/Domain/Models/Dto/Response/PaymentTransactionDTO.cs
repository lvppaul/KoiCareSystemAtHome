using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class PaymentTransactionDTO
    {
        public string VnpTxnRef { get; set; } = null!;
        public string userId { get; set; } = null!;
        public string VnpAmount { get; set; } = null!;
        public string VnpBankCode { get; set; } = null!;
        public string VnpBankTranNo { get; set; } = null!;
        public string VnpCardType { get; set; } = null!;
        public int VnpOrderInfo { get; set; } 
        public string VnpPayDate { get; set; } = null!;
        public string VnpResponseCode { get; set; } = null!;
        public string VnpTransactionNo { get; set; } = null!;
        public string VnpTransactionStatus { get; set; } = null!;
        public string VnpSecureHash { get; set; } = null!;
        public string VnpTmnCode { get; set; } = null!;
        public bool PaymentStatus { get; set; }
    }
}
