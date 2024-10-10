namespace KCSAH.APIServer.Dto
{
    public class CartDTO
    {
        public int CartId { get; set; }

        public string UserId { get; set; } = null!;

        public int TotalQuantity { get; set; }

        public double TotalPrice { get; set; }

        public int TotalItems { get; set; }

    }
}
