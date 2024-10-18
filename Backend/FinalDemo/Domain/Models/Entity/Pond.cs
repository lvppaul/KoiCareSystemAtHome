using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class Pond
{
    public int PondId { get; set; }
    public string UserId { get; set; } = null!;
    public string Name { get; set; } = null!;

    public int Volume { get; set; }

    public string? Thumbnail { get; set; }

    public float Depth { get; set; }

    public int PumpingCapacity { get; set; }

    public int Drain { get; set; }

    public int Skimmer { get; set; }

    public string? Note { get; set; }

    public virtual ICollection<Koi> Kois { get; set; } = new List<Koi>();

    public virtual ICollection<WaterParameter> WaterParameters { get; set; } = new List<WaterParameter>();
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
