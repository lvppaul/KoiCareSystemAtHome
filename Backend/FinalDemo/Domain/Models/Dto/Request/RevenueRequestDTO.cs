using System.Text.Json.Serialization;

namespace Domain.Models.Dto.Request
{
    public class RevenueRequestDTO
    {
        public int OrderId { get; set; }

        public int Income { get; set; }

        [JsonIgnore]
        public bool isVip { get; set; }

        [JsonIgnore]
        public bool isShopRevenue { get; set; }
        [JsonIgnore]
        public DateTime CreateAt { get; set; } = DateTime.Now;
    }
}
