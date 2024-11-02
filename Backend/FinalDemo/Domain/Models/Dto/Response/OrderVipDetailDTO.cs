using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class OrderVipDetailDTO
    {
        public int OrderId { get; set; }

        public int VipId { get; set; }

      //  public DateTime CreateDate { get; set; } = DateTime.Now;
    }
}
