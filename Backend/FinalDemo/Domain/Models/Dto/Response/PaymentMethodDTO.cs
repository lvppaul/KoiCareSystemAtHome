using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class PaymentMethodDTO
    {
        public int PaymentMethodId { get; set; }

        public string PaymentName { get; set; } = null!;
    }
}
