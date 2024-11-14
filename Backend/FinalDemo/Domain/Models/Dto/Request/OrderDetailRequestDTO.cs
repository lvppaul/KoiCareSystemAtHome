using System.Text.Json.Serialization;

namespace Domain.Models.Dto.Request
{
    public class OrderDetailRequestDTO
    {
        public int ProductId { get; set; }

        public int Quantity { get; set; }

        [JsonIgnore]
        public string OrderDetailStatus { get; set; } = "Pending";

    }
}
