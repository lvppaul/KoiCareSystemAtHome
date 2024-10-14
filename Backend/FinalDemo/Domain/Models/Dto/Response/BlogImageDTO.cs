using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class BlogImageDTO
    {
        public int ImageId { get; set; }

        public string ImageUrl { get; set; } = null!;

        public int BlogId { get; set; }
    }
}
