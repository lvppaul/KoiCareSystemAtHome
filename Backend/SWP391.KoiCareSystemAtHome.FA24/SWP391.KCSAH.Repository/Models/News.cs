using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class News
{
    public int NewsId { get; set; }

    public string Title { get; set; } = null!;

    public DateOnly PublishDate { get; set; }

    public string Content { get; set; } = null!;
}
