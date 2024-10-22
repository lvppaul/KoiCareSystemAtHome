using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class ShopUpdateDTO
    {
        public string ShopName { get; set; }

        public string Description { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }


        public string? Thumbnail { get; set; }
    }
}
