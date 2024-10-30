﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Entity
{
    public class OrderVipDetail
    {
        public int OrderId { get; set; }

        public int VipId { get; set; }

        public decimal UnitPrice { get; set; }

        public virtual Order Order { get; set; } = null!;

        public virtual VipPackage Vip { get; set; } = null!;
    }
}
