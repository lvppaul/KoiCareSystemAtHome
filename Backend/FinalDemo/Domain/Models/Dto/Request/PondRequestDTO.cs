using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class PondRequestDTO
    {
        public string UserId { get; set; }

        public string Name { get; set; }

        public double Volume { get; set; }

        public int Depth { get; set; }

        public int PumpingCapacity { get; set; }

        public int Drain { get; set; }

        public int Skimmer { get; set; }

        public string? Note { get; set; }

        public string? Thumbnail { get; set; }
    }
}
