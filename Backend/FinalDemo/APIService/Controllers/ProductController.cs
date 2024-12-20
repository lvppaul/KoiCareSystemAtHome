﻿using AutoMapper;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using SWP391.KCSAH.Repository;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetAllSync()
        {
            var products = await _unitOfWork.ProductRepository.GetAllAsync();

            bool hasUpdates = false;
            foreach (var product in products)
            {
                if (product.ExpiredDate.HasValue && product.ExpiredDate.Value.Date <= DateTime.UtcNow.Date)
                {
                    product.Status = "Discontinued";
                    hasUpdates = true;
                }
            }

            if (hasUpdates)
            {
                await _unitOfWork.ProductRepository.UpdateRangeAsync(products);
            }

            var result = await _unitOfWork.ProductRepository.GetAllAsync();
            var productDTOs = _mapper.Map<List<ProductDTO>>(result);
            return Ok(productDTOs);
        }

        [HttpGet("GetProductById/{id}")]
        public async Task<ActionResult<ProductDTO>> GetByIdAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ProductDTO>(product);
            return result;
        }
        [HttpGet("GetProductImageByProductId/{ProductId}")]
        public async Task<ActionResult<List<ProductImageDTO>>> GetProductImage(int ProductId)
        {
            var image = await _unitOfWork.ProductImageRepository.GetImageByProductId(ProductId);
            if (image == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<ProductImageDTO>>(image);
            return result;
        }

        [HttpGet("GetProductOutOfStockInShop")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductOutOfStock(int ShopId)
        {
            var product = await _unitOfWork.ProductRepository.GetProductOutOfStock(ShopId);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<ProductDTO>>(product);
            return result;
        }

        [HttpGet("GetProductDiscontinuedInShop")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductDiscontinued(int ShopId)
        {
            var product = await _unitOfWork.ProductRepository.GetProductDiscontinued(ShopId);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<ProductDTO>>(product);
            return result;
        }

        [HttpGet("GetProductByName/{Name}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductByName(string Name)
        {
            var product = await _unitOfWork.ProductRepository.GetProductByName(Name);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<ProductDTO>>(product);
            return result;
        }

        [HttpGet("GetProductByCategoryId/{CategoryId}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductByCategoryId(int CategoryId)
        {
            var product = await _unitOfWork.ProductRepository.GetProductByCategoryId(CategoryId);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<ProductDTO>>(product);
            return result;
        }

        [HttpGet("GetProductByCategoryIdInShop/{ShopId}/{CategoryId}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductByCategoryIdInShop(int CategoryId, int ShopId)
        {
            var product = await _unitOfWork.ProductRepository.GetProductByCategoryIdInShop(CategoryId, ShopId);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<ProductDTO>>(product);
            return result;
        }

        [HttpGet("GetProductOnShop/{ShopId}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductOnShop(int ShopId)
        {
            var product = await _unitOfWork.ProductRepository.GetProductOnShop(ShopId);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<ProductDTO>>(product);
            return result;
        }

        [HttpGet("GetProductOutOfStockInShop/{ShopId}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductOutOfStockOnShop(int ShopId)
        {
            var product = await _unitOfWork.ProductRepository.GetProductOutOfStock(ShopId);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<List<ProductDTO>>(product);
            return result;
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public ActionResult<ProductDTO> GetById(int id)
        {
            var product = _unitOfWork.ProductRepository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            var result = _mapper.Map<ProductDTO>(product);
            return result;
        }

        [HttpGet("ShopId/{id}")]
        public async Task<IActionResult> GetProductByShopIdAsync(int id)
        {
            var result = await _unitOfWork.ProductRepository.GetProductsByShopID(id);

            if (result == null || !result.Any())
            {
                return NotFound();
            }

            bool hasUpdates = false;
            foreach (var product in result)
            {
                if (product.ExpiredDate.HasValue && product.ExpiredDate.Value.Date <= DateTime.UtcNow.Date)
                {
                    product.Status = "Discontinued";
                    hasUpdates = true;
                }
            }

            if (hasUpdates)
            {
                await _unitOfWork.ProductRepository.UpdateRangeAsync(result);
            }

            var show = _mapper.Map<List<ProductDTO>>(result);
            return Ok(show);
        }

        [HttpGet("Pagination")]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000)
        {
            var listProduct = await _unitOfWork.ProductRepository.GetAllPaginationAsync(pageNumber, pageSize);

            return Ok(_mapper.Map<List<ProductDTO>>(listProduct));
        }
        [HttpGet("ProductQuantityByCategory/{categoryId}")]
        public async Task<int> GetProductQuantityByCategoryIdAsync(int categoryId)
        {
            var result = await _unitOfWork.ProductRepository.GetProductByCategoryId(categoryId);
            if (result == null)
            {
                return 0;
            }
            var totalQuantity = result.Sum(p => p.Quantity);
            return totalQuantity;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] ProductRequestDTO productdto)
        {
            if (productdto == null)
            {
                return BadRequest(ModelState);
            }

            var isProductExists = await _unitOfWork.ProductRepository.ProductNameExisted(productdto.Name, productdto.ShopId);

            if (isProductExists)
            {
                return BadRequest("A product with the same name already exists in this shop.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productMap = _mapper.Map<Product>(productdto);
            productMap.CategoryId = productdto.CategoryId;
            productMap.Category = await _unitOfWork.CategoryRepository.GetByIdAsync(productdto.CategoryId);
            var createResult = await _unitOfWork.ProductRepository.CreateAsync(productMap);

            if (createResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving the product.");
                return StatusCode(500, ModelState);
            }
            var productShow = _mapper.Map<ProductDTO>(productMap);
            return CreatedAtAction("GetById", new { id = productShow.ProductId }, productShow);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductUpdateDTO productdto)
        {
            if (productdto == null)
            {
                return BadRequest();
            }

            var existingProduct = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            if (productdto.ExpiredDate == default || productdto.ExpiredDate < new DateTime(1753, 1, 1))
            {
                productdto.ExpiredDate = null;
            }

            _mapper.Map(productdto, existingProduct);

            var updateResult = await _unitOfWork.ProductRepository.UpdateAsync(existingProduct);

            if (updateResult <= 0)
            {
                ModelState.AddModelError("", "Something went wrong while updating product");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpGet("Search")]
        public async Task<ActionResult<List<ProductDTO>>> SearchProducts(
            string? name = null,
            int? categoryId = null,
            decimal? minPrice = null,
            decimal? maxPrice = null,
            int? shopId = null)
        {
            var products = await _unitOfWork.ProductRepository.SearchProducts(name, categoryId, minPrice, maxPrice, shopId);
            if (products == null || !products.Any())
            {
                return NotFound();
            }
            var productDTOs = _mapper.Map<List<ProductDTO>>(products);
            return Ok(productDTOs);
        }

        private async Task<CategoryDTO> GetCategoryAsync(int id)
        {
            var category = await _unitOfWork.CategoryRepository.GetByIdAsync(id);

            return _mapper.Map<CategoryDTO>(category);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            var cartsWithProduct = await _unitOfWork.CartRepository.GetCartsByProductIdAsync(id);

            product.IsDeleted = true;
            await _unitOfWork.ProductRepository.UpdateAsync(product);

            await _unitOfWork.ProductRepository.RemoveCartItemsByProductIdAsync(id);

            foreach (var cart in cartsWithProduct)
            {

                var updatedCart = await _unitOfWork.CartRepository.GetCartById(cart.CartId);

                if (updatedCart != null)
                {
                    int newTotal = updatedCart.CartItems
                        .Where(ci => ci.Product != null && !ci.Product.IsDeleted)
                        .Sum(ci => ci.Quantity * ci.Price);


                    updatedCart.TotalAmount = newTotal;
                    await _unitOfWork.CartRepository.UpdateAsync(updatedCart);
                }
            }

            return NoContent();
        }
    }
}

