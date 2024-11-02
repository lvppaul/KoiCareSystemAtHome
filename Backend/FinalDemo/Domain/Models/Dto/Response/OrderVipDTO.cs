using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class OrderVipDTO
    {
        public int OrderId { get; set; }
        public string UserId { get; set; } = null!;
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public string OrderStatus { get; set; } = null!;
        public List<OrderVipDetailDTO> orderVipDetails { get; set; }
        public int TotalPrice { get; set; }
    }
}
