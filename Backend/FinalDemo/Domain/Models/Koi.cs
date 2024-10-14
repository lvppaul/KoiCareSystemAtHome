using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class Koi
{
    public string KoiId { get; set; } = null!;

    public string PondId { get; set; } = null!;
    public string UserId { get; set; } = null!;

    public int Age { get; set; }

    public string Name { get; set; } = null!;

    public string? Note { get; set; }

    public string Origin { get; set; } = null!;

    public int Length { get; set; }

    public int Weight { get; set; }

    public string Color { get; set; } = null!;

    public bool? Status { get; set; }

    public virtual ICollection<KoiImage> KoiImages { get; set; } = new List<KoiImage>();

    public virtual ICollection<KoiRecord> KoiRecords { get; set; } = new List<KoiRecord>();

    public virtual ICollection<KoiRemind> KoiReminds { get; set; } = new List<KoiRemind>();

    public virtual Pond Pond { get; set; } = null!;
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
