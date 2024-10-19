using System;
using System.Collections.Generic;
using Domain.Models.Entity;

namespace Domain.Models;

public partial class Koi
{
    public int KoiId { get; set; }

    public int PondId { get; set; }
    public string UserId { get; set; } = null!;

    public int Age { get; set; }
    public string? Thumbnail {  get; set; }

    public string Name { get; set; } = null!;

    public string? Note { get; set; }

    public string Origin { get; set; }

    public int Length { get; set; }

    public float Weight { get; set; }

    public string Color { get; set; }

    public DateTime CreateAt { get; set; }
    public string Sex { get; set; }

    public string Variety { get; set; }

    public string Physique { get; set; } = null!;

    public bool? Status { get; set; }


    public virtual ICollection<KoiImage> KoiImages { get; set; } = new List<KoiImage>();

    public virtual ICollection<KoiRecord> KoiRecords { get; set; } = new List<KoiRecord>();

    public virtual ICollection<KoiRemind> KoiReminds { get; set; } = new List<KoiRemind>();

    public virtual Pond Pond { get; set; } = null!;
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
