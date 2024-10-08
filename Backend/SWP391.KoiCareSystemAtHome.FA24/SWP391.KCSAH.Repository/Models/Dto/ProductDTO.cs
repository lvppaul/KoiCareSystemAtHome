using SWP391.KCSAH.Repository.Models;

namespace KCSAH.APIServer.Dto
{
    public class ProductDTO
    {
        public string ProductId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }

        public bool? Status { get; set; }

        public string CategoryId { get; set; }

        public string UserId { get; set; }

        public CategoryDTO Categories { get; set; }
    }
}
