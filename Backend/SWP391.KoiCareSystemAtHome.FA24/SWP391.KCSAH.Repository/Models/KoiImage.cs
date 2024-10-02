using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class KoiImage
{
    public int ImageId { get; set; }

    public string KoiId { get; set; } = null!;

    public string Path { get; set; } = null!;

    public virtual Koi Koi { get; set; } = null!;
}
