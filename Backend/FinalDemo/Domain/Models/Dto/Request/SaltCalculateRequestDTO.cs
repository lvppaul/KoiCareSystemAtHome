using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class SaltCalculateRequestDTO
    {
        public int PondId { get; set; }
        public float DesiredConcentration { get; set; }
        public float? CurrentConcentration { get; set; }
        public int? PercentWaterChange { get; set; }
    }
}
