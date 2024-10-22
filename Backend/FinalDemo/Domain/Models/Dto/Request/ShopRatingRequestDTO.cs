using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class ShopRatingRequestDTO
    {
        public string UserId { get; set; } = null!;
        public int ShopId { get; set; }
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }
        [JsonIgnore]
        public DateTime CreateAt { get; set; } = DateTime.Now;
    }
}
