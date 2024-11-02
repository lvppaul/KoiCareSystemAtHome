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
            var result = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.ProductId.Equals(id) && p.IsDeleted == false && p.Status == true);

            return result;
        }

        public async Task RemoveCartItemsByProductIdAsync(int productId)
        {
            var cartItems = _context.CartItems.Where(ci => ci.ProductId == productId).ToList();
            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Product>> GetProductByCategoryId(int categoryId)
        {
            var result = _context.Products.Include(p => p.Category).Where(p => p.CategoryId == categoryId && p.IsDeleted == false).ToListAsync();

            return await result;
        }

        public async Task<List<Product>> GetProductOnShop(int ShopId)
        {
            var result = _context.Products.Include(p => p.Category).Where(p => p.Status == true && p.IsDeleted == false && p.ShopId == ShopId).ToListAsync();

            return await result;
        }

        public async Task<List<Product>> GetProductOutOfStock(int ShopId)
        {
            var result = _context.Products.Include(p => p.Category).Where(p => p.ShopId == ShopId && p.Status == false && p.IsDeleted == false).ToListAsync();

            return await result;
        }

        public async Task<List<Product>> GetProductByName(string name)
        { 
            return await _context.Products.Include(p => p.Category).Where(p => p.Name.Contains(name) && p.IsDeleted == false).ToListAsync(); ;
        }

        public async Task<List<Product>> GetProductsByShopID(int id)
        {
            var products = await _context.Products.Include(c =>c.Category)
                .Where(u => u.ShopId.Equals(id) && u.IsDeleted == false)
                .ToListAsync();

            return products ?? new List<Product> ();
        }
        public async Task<Product> GetProductsByProductID(int id)
        {
            var products = await _context.Products
                .Where(u => u.ProductId == id && u.IsDeleted == false)
                .FirstOrDefaultAsync();

            return products;
        }

        public async Task<List<Product>> GetProductByCategoryIdInShop(int categoryId, int shopId)
        {
            var result = await _context.Products
            .Include(p => p.Category)
            .Where(p => p.CategoryId == categoryId && p.ShopId == shopId && p.IsDeleted == false)
            .ToListAsync();
            return result;
        }

        public async Task<List<Product>> SearchProducts(string name = null,
                            int? categoryId = null,
                            decimal? minPrice = null,
                            decimal? maxPrice = null,
                            int? shopId = null)
        {
            IQueryable<Product> result = _context.Products.Include(p => p.Category).Where(p => p.IsDeleted == false);
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
