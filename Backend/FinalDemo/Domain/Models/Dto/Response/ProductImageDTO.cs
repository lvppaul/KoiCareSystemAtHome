using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class ProductImageDTO
    {
        public int ImageId { get; set; }

        public int ProductId { get; set; }

        public string ImageUrl { get; set; } = null!;
    }
}
