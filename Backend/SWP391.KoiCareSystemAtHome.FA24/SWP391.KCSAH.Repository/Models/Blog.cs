using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class Blog
{
    public int BlogId { get; set; }

    public string UserId { get; set; } = null!;

    public DateOnly PublishDate { get; set; }

    public string Content { get; set; } = null!;

    public string Title { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
