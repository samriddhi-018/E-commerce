using E_commerce.Models;
using E_commerce.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public ProductsController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var result = await dbContext.Products.ToListAsync();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var result = await dbContext.Products.FindAsync(id);
            if (result is null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(AddProducts addProducts)
        {
            var product = new Products
            {
                Name = addProducts.Name,
                Description = addProducts.Description,
                Price = addProducts.Price,
                StockQuantity = addProducts.StockQuantity
            };

            await dbContext.Products.AddAsync(product);
            await dbContext.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProduct(int id, UpdateProducts updateProducts)
        {
            var productToUpdate = await dbContext.Products.FindAsync(id);
            if (productToUpdate is null) return NotFound();

            productToUpdate.Name = updateProducts.Name;
            productToUpdate.Description = updateProducts.Description;
            productToUpdate.Price = updateProducts.Price;
            productToUpdate.StockQuantity = updateProducts.StockQuantity;

            await dbContext.SaveChangesAsync();
            return Ok(productToUpdate);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productToDelete = await dbContext.Products.FindAsync(id);
            if (productToDelete is null) return NotFound();

            dbContext.Products.Remove(productToDelete);
            await dbContext.SaveChangesAsync();
            return Ok(productToDelete);
        }



    }
}
