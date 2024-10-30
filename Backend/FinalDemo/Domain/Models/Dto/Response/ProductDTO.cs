using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class ProductDTO
    {
        public int ProductId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }

        public bool? Status { get; set; }

        public CategoryDTO category { get; set; }

        public int shopId { get; set; }

        public string? Thumbnail { get; set; }
    }
}
