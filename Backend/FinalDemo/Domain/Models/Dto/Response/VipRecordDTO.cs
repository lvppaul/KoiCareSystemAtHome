using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class VipRecordDTO
    {
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public int VipId { get; set; }
        public string UserId { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
