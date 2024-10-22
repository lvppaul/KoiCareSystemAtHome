using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class SaltCalculateDTO
    {
        public int AmountOfSalt { get; set; }
        public float? AmountOfSaltRefill { get; set; }
        public int? NumberOfChanges { get; set; }
    }
}
