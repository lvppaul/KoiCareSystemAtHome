using SWP391.KCSAH.Repository.Models;

namespace KCSAH.APIServer.Dto
{
    public class ProductRequestDTO
    {
        public string ProductId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }

        public bool? Status { get; set; }

        public int CategoryId { get; set; }

        public string UserId { get; set; }

        public string? Thumbnail { get; set; }

    }
}
