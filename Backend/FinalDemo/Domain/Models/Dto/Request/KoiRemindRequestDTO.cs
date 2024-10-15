using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class KoiRemindRequestDTO
    {
        public int KoiId { get; set; }
        public string UserId { get; set; } = null!;

        public string? RemindDescription { get; set; }

        public DateTime DateRemind { get; set; }
    }
}
