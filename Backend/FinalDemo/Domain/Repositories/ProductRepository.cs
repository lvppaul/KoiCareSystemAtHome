﻿using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SWP391.KCSAH.Repository.KCSAH.Repository
{
    public class ProductRepository: GenericRepository<Product>
    {
        public ProductRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.Include(c => c.Category).ToListAsync();
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            var result = await _context.Products.FirstAsync(p => p.ProductId.Equals(id));

            return result;
        }

        public async Task<List<Product>> GetProductsByUID(string id)
        {
            var products = await _context.Products.Include(c => c.Category)
                .Where(u => u.UserId.Equals( id))
                .ToListAsync();

           

            return products ?? new List<Product>();
        }
    }
}
