using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class RevenueDTO
    {
        public int RevenueId { get; set; }

        public int OrderId { get; set; }

        public int Income { get; set; }
    }
}
