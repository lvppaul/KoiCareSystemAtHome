using SWP391.KCSAH.Repository.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto
{
    public class OrderRequestDTO
    {
        public string UserId { get; set; } = null!;

        public int ShopId { get; set; }

        public string FullName { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Street { get; set; } = null!;

        public string District { get; set; } = null!;

        public string City { get; set; } = null!;

        public string Country { get; set; } = null!;

        public int PaymentMethodId { get; set; }

        //public double TotalPrice { get; set; }

        public DateTime CreateDate { get; set; } = DateTime.Now;

        public bool? OrderStatus { get; set; }
        public List<OrderDetailRequestDTO> orderDetails { get; set; }
    }
}
