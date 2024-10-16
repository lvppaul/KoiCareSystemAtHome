using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class KoiRecordUpdateDTO
    {
        public int Weight { get; set; }

        public int Length { get; set; }

        public DateTime UpdatedTime { get; set; }
    }
}
