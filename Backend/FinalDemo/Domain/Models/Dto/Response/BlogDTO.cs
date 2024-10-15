using Domain.Models.Dto.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class BlogDTO
    {
        public int BlogId { get; set; }
        public string UserId { get; set; } = null!;
        public string? Thumbnail { get; set; }

        public DateTime PublishDate { get; set; } = DateTime.Now;

        public string Content { get; set; } = null!;

        public string Title { get; set; } = null!;

        public List<BlogImageDTO>? Images { get; set; }
        public List<BlogCommentDTO>? Comments { get; set; }
    }
}
