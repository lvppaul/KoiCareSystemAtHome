using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Entity
{
    public class VipRecord
    {
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public int VipId { get; set; }
        public string UserId { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public virtual VipPackage VipPackage { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
