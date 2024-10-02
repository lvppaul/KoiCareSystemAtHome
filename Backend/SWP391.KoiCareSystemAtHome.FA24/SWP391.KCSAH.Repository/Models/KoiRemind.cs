using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class KoiRemind
{
    public int RemindId { get; set; }

    public string UserId { get; set; } = null!;

    public string KoiId { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly DateRemind { get; set; }

    public virtual Koi Koi { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
