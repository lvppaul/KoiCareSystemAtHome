using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class NewsImage
{
    public int ImageId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public int NewsId { get; set; }

    public virtual News News { get; set; } = null!;
}
