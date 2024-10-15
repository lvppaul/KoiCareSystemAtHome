using System.Text.Json.Serialization;

namespace KCSAH.APIServer.Dto
{
    public class ShopDTO
    {
        public int ShopId { get; set; }

        public string UserId { get; set; }

        public string ShopName { get; set; }

        public string Description { get; set; } 

        public string Phone { get; set; }

        public string Email { get; set; }

        public decimal Rating { get; set; }

        public string? Thumbnail { get; set; }
    }
}
