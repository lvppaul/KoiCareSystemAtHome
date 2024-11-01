using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Entity
{
    public class VipPackage
    {
        public int VipId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int Options { get; set; }
        public int Price { get; set; }

        public virtual ICollection<OrderVipDetail> OrderVipDetails { get; set; } = new List<OrderVipDetail>();

        public virtual ICollection<VipRecord> VipRecords { get; set; } = new List<VipRecord>();
    }
}
