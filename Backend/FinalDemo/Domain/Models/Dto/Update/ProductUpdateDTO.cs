using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class ProductUpdateDTO
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }

        public bool? Status { get; set; }

        public int CategoryId { get; set; }

        public string? Thumbnail {  get; set; }
    }
}
