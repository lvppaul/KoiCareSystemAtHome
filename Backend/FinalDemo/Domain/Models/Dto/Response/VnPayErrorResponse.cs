using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class VnPayErrorResponse
    {
        public string ErrorCode { get; set; }
        public string Message { get; set; }
        public string TransactionId { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
