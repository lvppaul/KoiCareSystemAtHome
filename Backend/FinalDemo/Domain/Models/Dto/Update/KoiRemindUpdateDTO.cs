using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class KoiRemindUpdateDTO
    {
        public string? RemindDescription { get; set; }

        public DateTime DateRemind { get; set; }
    }
}
