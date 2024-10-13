using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class KoiImage
{
    public int ImageId { get; set; }

    public string KoiId { get; set; } = null!;

    public string? Url { get; set; }

    public virtual Koi Koi { get; set; } = null!;
}
