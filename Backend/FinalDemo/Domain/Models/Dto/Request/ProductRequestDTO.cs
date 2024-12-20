﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Dto.Request
{
    public class ProductRequestDTO
    {

        public string Name { get; set; }

        public string Description { get; set; }

        [DefaultValue(null)]
        public DateTime? ExpiredDate { get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }

        public string Status { get; set; }

        public int CategoryId { get; set; }

        public int ShopId { get; set; }

        public string? Thumbnail { get; set; }

    }
}
