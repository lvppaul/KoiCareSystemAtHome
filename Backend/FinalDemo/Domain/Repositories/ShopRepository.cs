﻿using AutoMapper;
using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SWP391.KCSAH.Repository.KCSAH.Repository
{
    public class ShopRepository : GenericRepository<Shop>
    {
        private readonly IMapper _mapper;
        public ShopRepository(KoiCareSystemAtHomeContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<Order>> GetOrderById(int id)
        {
            var orders = await _context.Orders.Include(o => o.OrderDetails)
                .Where(o => o.ShopId == id)
                .ToListAsync();

            if (orders == null || !orders.Any())
            {
                return new List<Order>();
            }

            return orders;
        }

        public async Task<Shop?> GetShopByUID(string id)
        {
            var shop = await _context.Shops.Where(u => u.UserId == id).FirstOrDefaultAsync();

            return shop;
        }
    }
}
