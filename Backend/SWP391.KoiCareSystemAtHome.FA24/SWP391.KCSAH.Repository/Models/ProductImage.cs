using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class ProductImage
{
    public int ImageId { get; set; }

    public string ProductId { get; set; } = null!;

    public string Path { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
