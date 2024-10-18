using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class News
{
    public int NewsId { get; set; }

    public string UserId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string? Thumbnail { get; set; }

    public DateTime PublishDate { get; set; }

    public string Content { get; set; } = null!;

    public virtual ApplicationUser User { get; set; } = null!;
    public virtual ICollection<NewsImage> NewsImages { get; set; } = new List<NewsImage>();
}
