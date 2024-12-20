﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class WaterParameterRequestDTO
    {
        public int PondId { get; set; }
        public string UserId { get; set; } = null!;

        public double Nitrite { get; set; }

        public double Oxygen { get; set; }

        public double Nitrate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public double Temperature { get; set; }

        public double Phosphate { get; set; }

        public double PH { get; set; }

        public double Ammonium { get; set; }

        public double Hardness { get; set; }

        public double CarbonDioxide { get; set; }

        public double CarbonHardness { get; set; }

        public double Salt { get; set; }

        public double TotalChlorines { get; set; }

        public double OutdoorTemp { get; set; }

        public double AmountFed { get; set; }
    }
}
