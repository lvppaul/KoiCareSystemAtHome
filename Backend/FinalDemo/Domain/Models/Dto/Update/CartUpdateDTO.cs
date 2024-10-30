using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class CartUpdateDTO
    {
        public string UserId { get; set; } = null!;
        [JsonIgnore]
        public int TotalAmount { get; set; } = 0;

        public List<CartItemUpdateDTO> CartItems { get; set; } = new List<CartItemUpdateDTO>();
    }
}
