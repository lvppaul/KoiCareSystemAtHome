using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class KoiRecord
{
    public int RecordId { get; set; }

    public int KoiId { get; set; }
    public string UserId { get; set; } = null!;

    public float Weight { get; set; }

    public int Length { get; set; }

    public string? Thumbnail { get; set; }
    public DateTime UpdatedTime { get; set; }

    public virtual Koi Koi { get; set; } = null!;
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
