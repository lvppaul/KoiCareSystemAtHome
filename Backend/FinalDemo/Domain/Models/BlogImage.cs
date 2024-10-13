using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class BlogImage
{
    public int ImageId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public int BlogId { get; set; }

    public virtual Blog Blog { get; set; } = null!;
}
