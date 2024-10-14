﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto
{
    public class KoiUpdateDTO
    {
        public string UserId { get; set; }

        public string PondId { get; set; }

        public int Age { get; set; }

        public string Name { get; set; }

        public string Note { get; set; }

        public string Origin { get; set; }

        public int Length { get; set; }

        public int Weight { get; set; }

        public string Color { get; set; }

        public bool Status { get; set; }

        public string? Thumbnail { get; set; }
    }
}