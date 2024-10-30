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
    public class ProductRepository: GenericRepository<Product>
    {
        public ProductRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.Include(c => c.Category).ToListAsync();
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            var result = await _context.Products.Include(p => p.Category).FirstAsync(p => p.ProductId.Equals(id));

            return result;
        }

        public async Task<List<Product>> GetProductByCategoryId(int categoryId)
        {
            var result = _context.Products.Include(p => p.Category).Where(p => p.CategoryId == categoryId).ToListAsync();

            return await result;
        }

        public async Task<List<Product>> GetProductByName(string name)
        { 
            return await _context.Products.Include(p => p.Category).Where(p => p.Name.Contains(name)).ToListAsync(); ;
        }

        public async Task<List<Product>> GetProductsBySID(int id)
        {
            var products = await _context.Products.Include(c =>c.Category)
                .Where(u => u.ShopId.Equals(id))
                .ToListAsync();

            return products ?? new List<Product> ();
        }
        public async Task<Product> GetProductsByProductID(int id)
        {
            var products = await _context.Products
                .Where(u => u.ProductId == id)
                .FirstOrDefaultAsync();

            return products;
        }

        public async Task<List<Product>> GetProductByCategoryIdInShop(int categoryId, int shopId)
        {
            var result = await _context.Products
            .Include(p => p.Category)
            .Where(p => p.CategoryId == categoryId && p.ShopId == shopId)
            .ToListAsync();
            return result;
        }

        public async Task<List<Product>> SearchProducts(string name = null,
                            int? categoryId = null,
                            decimal? minPrice = null,
                            decimal? maxPrice = null,
                            int? shopId = null)
        {
            IQueryable<Product> result = _context.Products.Include(p => p.Category);
            if (!string.IsNullOrEmpty(name))
            {
                result = result.Where(p => p.Name.Contains(name));
            }
            if (categoryId.HasValue)
            {
                result = result.Where(p => p.CategoryId == categoryId);
            }
            if (minPrice.HasValue)
            {
                result = result.Where(p => p.Price >= minPrice);
            }
            if (maxPrice.HasValue)
            {
                result = result.Where(p => p.Price <= maxPrice);
            }
            if (shopId.HasValue)
            {
                result = result.Where(p => p.ShopId == shopId);
            }
            
            return await result.ToListAsync();
        }
    }
}
