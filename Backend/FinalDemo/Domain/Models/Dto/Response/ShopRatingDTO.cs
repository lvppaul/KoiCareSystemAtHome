using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class ShopRatingDTO
    {
        public int RatingId { get; set; }
        public string UserId { get; set; } = null!;
        public int ShopId { get; set; }
        public int Rating { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
    }
}
