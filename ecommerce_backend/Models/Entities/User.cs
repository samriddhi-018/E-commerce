using System.ComponentModel.DataAnnotations;

namespace E_commerce.Models.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; } = null!;
        [Required]
        public string PasswordHash { get; set; } = null!;
        // Track when the user was created. Some DBs may have this column as NOT NULL.

        public DateTime CreatedAt { get; set; }
    }
}