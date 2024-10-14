using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class KoiImage
{
    public int ImageId { get; set; }

    public int KoiId { get; set; }

    public string? Url { get; set; }

    public virtual Koi Koi { get; set; } = null!;
}
