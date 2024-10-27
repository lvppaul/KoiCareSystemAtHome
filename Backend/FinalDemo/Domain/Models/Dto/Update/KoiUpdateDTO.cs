using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class KoiUpdateDTO
    {

        public int Age { get; set; }

        public string Name { get; set; }

        public string Sex { get; set; }

        public string Variety { get; set; }

        public string Physique { get; set; }

        public string Note { get; set; }

        public string Origin { get; set; }

        public string Color { get; set; }

        public bool Status { get; set; }

        public string? Thumbnail { get; set; }

        [JsonIgnore]
        public DateTime CreateAt { get; set; } = DateTime.Now;
    }
}
