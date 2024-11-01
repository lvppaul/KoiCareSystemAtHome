using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class VipPackageDTO
    {
        public int VipId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Options { get; set; }
        public int Price { get; set; }
    }
}
