using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class BlogComment
{
    public int CommentId { get; set; }

    public int BlogId { get; set; }
    public string UserId { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime CreateDate { get; set; }

    public virtual Blog Blog { get; set; } = null!;
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
