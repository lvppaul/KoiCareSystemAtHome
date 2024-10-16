using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class KoiImage
{
    public int ImageId { get; set; }

    public int KoiId { get; set; }

    public string? ImageUrl { get; set; }

    public virtual Koi Koi { get; set; } = null!;
}
