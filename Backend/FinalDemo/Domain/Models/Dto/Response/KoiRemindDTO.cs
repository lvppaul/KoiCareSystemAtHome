using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class KoiRemindDTO
    {
        public int RemindId { get; set; }

        public int KoiId { get; set; }
        public string UserId { get; set; } = null!;

        public string? RemindDescription { get; set; }

        public DateTime DateRemind { get; set; }
    }
}
