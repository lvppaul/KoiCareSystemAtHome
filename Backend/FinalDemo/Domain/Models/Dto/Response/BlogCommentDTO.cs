using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class BlogCommentDTO
    {
        public int CommentId { get; set; }

        public int BlogId { get; set; }
        public string UserId { get; set; } = null!;

        public string Content { get; set; } = null!;

        public DateTime CreateDate { get; set; }= DateTime.Now;
    }
}
