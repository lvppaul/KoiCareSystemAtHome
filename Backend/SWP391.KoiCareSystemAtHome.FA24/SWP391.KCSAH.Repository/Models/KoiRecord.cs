using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class KoiRecord
{
    public int RecordId { get; set; }

    public string UserId { get; set; } = null!;

    public string KoiId { get; set; } = null!;

    public int Weight { get; set; }

    public int Length { get; set; }

    public DateTime UpdatedTime { get; set; }

    public virtual Koi Koi { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
