using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Models;
using SWP391.KCSAH.Repository;

namespace KCSAH.APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        public ProductController(UnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllAsync()
        {
            return await _unitOfWork.ProductRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(string id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            try
            {
                await _unitOfWork.ProductRepository.CreateAsync(product);
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error saving the product.");
            }
            return CreatedAtAction("GetProductById", new { id = product.ProductId }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, Product product)
        {
            if (!id.Equals(product.ProductId))
            {
                return BadRequest();
            }

            try
            {
                _unitOfWork.ProductRepository.UpdateAsync(product);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            await _unitOfWork.ProductRepository.RemoveAsync(product);

            return NoContent();
        }
        private bool ProductExists(string id)
        {
            return _unitOfWork.ProductRepository.GetByIdAsync(id) != null;
        }
    }
}

