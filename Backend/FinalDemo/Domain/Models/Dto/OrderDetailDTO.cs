using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SWP391.KCSAH.Repository.Models.Dto
{
    public class OrderDetailDTO
    {

        public int OrderId { get; set; }

        public string ProductId { get; set; } = null!;

        public int Quantity { get; set; }

        public double UnitPrice { get; set; }

    }
}
