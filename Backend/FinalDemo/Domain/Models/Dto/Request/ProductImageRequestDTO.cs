using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class ProductImageRequestDTO
    {

        public int ProductId { get; set; }

        public string ImageUrl { get; set; } = null!;
    }
}
