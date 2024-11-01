using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class OrderDTO
    {
        public int OrderId { get; set; }

        public string UserId { get; set; } = null!;


        public string FullName { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Street { get; set; } = null!;

        public string District { get; set; } = null!;

        public string City { get; set; } = null!;

        public string Country { get; set; } = null!;

        public DateTime CreateDate { get; set; } = DateTime.Now;
        public bool isVipUpgrade { get; set; }
        public string OrderStatus { get; set; } = null!;
        public List<OrderDetailDTO> orderDetails { get; set; }
        public int TotalPrice => orderDetails.Sum(od => od.Quantity * od.UnitPrice);
    }
}
