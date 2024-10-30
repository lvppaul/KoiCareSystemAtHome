namespace Domain.Models.Dto.Request
{
    public class ProductRequestDTO
    {

        public string Name { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }

        public bool? Status { get; set; }

        public int CategoryId { get; set; }

        public int ShopId { get; set; }

        public string? Thumbnail { get; set; }

    }
}
