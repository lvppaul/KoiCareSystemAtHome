using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class KoiRecordDTO
    {
        public int RecordId { get; set; }

        public int KoiId { get; set; }
        public string UserId { get; set; } = null!;

        public float Weight { get; set; }

        public int Length { get; set; }

        public DateTime UpdatedTime { get; set; }
    }
}
