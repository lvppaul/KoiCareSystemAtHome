using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class KoiRemind
{
    public int RemindId { get; set; }

    public string KoiId { get; set; } = null!;
    public string UserId { get; set; } = null!;

    public string? RemindDescription { get; set; }

    public DateTime DateRemind { get; set; }

    public virtual Koi Koi { get; set; } = null!;
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
