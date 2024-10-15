using Domain.Models.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class NewsUpdateDTO
    {
        public string Title { get; set; } = null!;

        public string Thumbnail { get; set; } = null!;

        public string Content { get; set; } = null!;

    }
}
