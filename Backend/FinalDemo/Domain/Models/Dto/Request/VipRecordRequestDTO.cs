using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class VipRecordRequestDTO
    {
        public int VipId { get; set; }
        public string UserId { get; set; } = null!;
        [JsonIgnore]
        public DateTime StartDate { get; set; } = DateTime.Now;
        [JsonIgnore]
        public DateTime EndDate { get; set; }
    }
}
