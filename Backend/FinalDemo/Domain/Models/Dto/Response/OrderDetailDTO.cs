namespace Domain.Models.Dto.Response
{
    public class OrderDetailDTO
    {

        public int OrderId { get; set; }

        public int ProductId { get; set; }

        public string OrderDetailStatus { get; set; }

        public int Quantity { get; set; }

        public int UnitPrice { get; set; }

    }
}
