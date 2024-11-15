using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Entity
{
    public class WaterParameterSample
    {
        public double MaxNitrite { get; set; }
        public double MinOxygen { get; set; }
        public double MaxOxygen { get; set; }
        public double MaxNitrate { get; set; }
        public double MinKH { get; set; }
        public double MaxKH { get; set; }
        public double TotalChlorines { get; set; }
        public double MinGH { get; set; }
        public double MaxGH { get; set; }
        public double MinAmmonium { get; set; }
        public double MaxAmmonium { get; set; }
        public double MinSalt { get; set; }
        public double MaxSalt { get; set; }
        public double MaxPhosphate { get; set; }
        public double MinCarbonDioxide { get; set; }
        public double MaxCarbonDioxide { get; set; }
        public double MaxTemperature { get; set; }
        public double MinTemperature { get; set; }
        public double MinPH { get; set; }
        public double MaxPH { get; set; }
    }
}
