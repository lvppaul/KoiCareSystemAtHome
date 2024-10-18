using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class CartItemRequestDTO
    {
        public int ProductId { get; set; }

        public int Quantity { get; set; }
        [JsonIgnore]
        public string? Thumbnail { get; set; }
    }
}
