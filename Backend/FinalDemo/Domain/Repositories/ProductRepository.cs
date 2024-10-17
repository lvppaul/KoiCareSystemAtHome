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

        public async Task<List<Product>> GetProductByCategoryId(int categoryId)
        {
            var result = _context.Products.Where(p => p.CategoryId == categoryId).ToListAsync();

            return await result;
        }

        public async Task<List<Product>> GetProductsBySID(int id)
        {
            var products = await _context.Products.Include(c =>c.Category)
                .Where(u => u.ShopId.Equals(id))
                .ToListAsync();

            return products ?? new List<Product> ();
        }
    }
}
