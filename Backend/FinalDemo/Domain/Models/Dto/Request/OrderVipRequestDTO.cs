using Domain.Models.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class OrderVipRequestDTO
    {
        public string UserId { get; set; } = null!;
        [JsonIgnore]
        public DateTime CreateDate { get; set; } = DateTime.Now;
        [JsonIgnore]
        public string OrderStatus { get; set; } = "Đang chờ thanh toán";
        public List<OrderVipDetailRequestDTO> orderVipDetails { get; set; }
        [JsonIgnore]
        public int TotalPrice { get; set; }
    }
}
