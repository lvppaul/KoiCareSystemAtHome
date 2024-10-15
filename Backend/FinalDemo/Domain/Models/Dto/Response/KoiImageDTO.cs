using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class KoiImageDTO
    {
        public int ImageId { get; set; }

        public int KoiId { get; set; }

        public string? ImageUrl { get; set; }
    }
}
