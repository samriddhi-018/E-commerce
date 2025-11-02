using E_commerce.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace E_commerce
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Products> Products { get; set; }

    }
}
