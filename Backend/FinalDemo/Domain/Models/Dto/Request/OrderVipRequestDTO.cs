using Domain.Models.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class OrderVipRequestDTO
    {
        public string UserId { get; set; } = null!;
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public string OrderStatus { get; set; } = null!;
        public List<OrderDetailDTO> orderDetails { get; set; }
        public int TotalPrice => orderDetails.Sum(od => od.Quantity * od.UnitPrice);
    }
}
