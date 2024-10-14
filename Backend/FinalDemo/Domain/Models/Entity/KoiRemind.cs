using System;
using System.Collections.Generic;
using Domain.Models.Entity;

namespace Domain.Models;

public partial class KoiRemind
{
    public int RemindId { get; set; }

    public int KoiId { get; set; }
    public string UserId { get; set; } = null!;

    public string? RemindDescription { get; set; }

    public DateTime DateRemind { get; set; }

    public virtual Koi Koi { get; set; } = null!;
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
