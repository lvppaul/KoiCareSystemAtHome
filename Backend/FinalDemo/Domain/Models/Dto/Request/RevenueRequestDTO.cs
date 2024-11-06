using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class RevenueRequestDTO
    {
        public int OrderId { get; set; }

        public int Income { get; set; }

        [JsonIgnore]
        public bool isVip { get; set; }

        [JsonIgnore]
        public DateTime CreateAt { get; set; } = DateTime.Now;
    }
}
