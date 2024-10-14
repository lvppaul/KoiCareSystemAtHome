using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class OrderDetailRequestDTO
    {
        public int ProductId { get; set; }

        public int Quantity { get; set; }

    }
}
