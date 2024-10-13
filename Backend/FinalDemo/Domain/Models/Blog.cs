using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class Blog
{
    public int BlogId { get; set; }
    public string UserId { get; set; } = null!;

    public DateTime PublishDate { get; set; }

    public string Content { get; set; } = null!;

    public string Title { get; set; } = null!;

    public virtual ICollection<BlogComment> BlogComments { get; set; } = new List<BlogComment>();

    public virtual ICollection<BlogImage> BlogImages { get; set; } = new List<BlogImage>();
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
