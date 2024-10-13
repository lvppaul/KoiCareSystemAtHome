using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class ProductImage
{
    public int ImageId { get; set; }

    public string ProductId { get; set; } = null!;

    public string ImageUrl { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
