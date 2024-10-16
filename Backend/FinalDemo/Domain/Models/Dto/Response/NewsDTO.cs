using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class NewsDTO
    {
        public int NewsId { get; set; }

        public string Title { get; set; } = null!;
        public string? Thumbnail { get; set; }

        public DateTime PublishDate { get; set; } = DateTime.Now;

        public string Content { get; set; } = null!;

        public List<NewsImageDTO>? NewsImage { get; set; }
    }
}
