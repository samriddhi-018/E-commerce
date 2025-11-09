using E_commerce.Models;
using E_commerce.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public ProductsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _dbContext.Products.ToListAsync();
            return Ok(products);
        }

        // GET: api/Products/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _dbContext.Products.FindAsync(id);
            if (product == null) return NotFound(new { message = "Product not found" });
            return Ok(product);
        }

        // POST: api/Products
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] AddProducts addProducts)
        {
            if (addProducts == null) return BadRequest("Invalid product data");

            var product = new Products
            {
                Name = addProducts.Name,
                Description = addProducts.Description,
                Price = addProducts.Price,
                StockQuantity = addProducts.StockQuantity
            };

            await _dbContext.Products.AddAsync(product);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        // PUT: api/Products/{id}
        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProducts updateProducts)
        {
            var product = await _dbContext.Products.FindAsync(id);
            if (product == null) return NotFound(new { message = "Product not found" });

            product.Name = updateProducts.Name;
            product.Description = updateProducts.Description;
            product.Price = updateProducts.Price;
            product.StockQuantity = updateProducts.StockQuantity;

            await _dbContext.SaveChangesAsync();
            return Ok(product);
        }

        // DELETE: api/Products/{id}
        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _dbContext.Products.FindAsync(id);
            if (product == null) return NotFound(new { message = "Product not found" });

            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Product deleted successfully" });
        }
    }
}