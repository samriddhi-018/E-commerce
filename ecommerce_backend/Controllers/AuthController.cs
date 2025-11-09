using E_commerce.Models.Auth;
using E_commerce.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IConfiguration _configuration;
    // we use PBKDF2 for password hashing


        public AuthController(AppDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            if (string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Password))
                return BadRequest("Username and password are required");

            var existing = _dbContext.Users.FirstOrDefault(u => u.Username == model.Username);
            if (existing != null) return BadRequest("Username already exists");

            var user = new User
            {
                Username = model.Username
            };
            user.PasswordHash = HashPassword(model.Password);

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "User registered" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest model)
        {
            if (string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Password))
                return BadRequest("Username and password are required");

            var user = _dbContext.Users.FirstOrDefault(u => u.Username == model.Username);
            if (user == null) return Unauthorized("Invalid credentials");

            if (!VerifyPassword(model.Password, user.PasswordHash)) return Unauthorized("Invalid credentials");

            var jwtSection = _configuration.GetSection("Jwt");
            var key = jwtSection.GetValue<string>("Key") ?? "please_change_this_secret";
            if (Encoding.UTF8.GetByteCount(key) < 32)
            {
                return StatusCode(500, "JWT signing key must be at least 32 bytes long.");
            }            
            var issuer = jwtSection.GetValue<string>("Issuer") ?? "EcommerceAPI";
            var audience = jwtSection.GetValue<string>("Audience") ?? "EcommerceClient";
            var duration = jwtSection.GetValue<int?>("DurationInMinutes") ?? 60;

            var tokenHandler = new JwtSecurityTokenHandler();
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.UtcNow.AddMinutes(duration),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { token = tokenString });
        }
        
        // Helper methods for hashing
        private static string HashPassword(string password)
        {
            // generate a 16-byte salt
            byte[] salt = RandomNumberGenerator.GetBytes(16);
            using var deriveBytes = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256);
            var hash = deriveBytes.GetBytes(32); // 256-bit
            // store as base64(salt).base64(hash)
            return Convert.ToBase64String(salt) + "." + Convert.ToBase64String(hash);
        }

        private static bool VerifyPassword(string password, string storedHash)
        {
            try
            {
                var parts = storedHash.Split('.');
                if (parts.Length != 2) return false;
                var salt = Convert.FromBase64String(parts[0]);
                var hash = Convert.FromBase64String(parts[1]);
                using var deriveBytes = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256);
                var computed = deriveBytes.GetBytes(hash.Length);
                return CryptographicOperations.FixedTimeEquals(computed, hash);
            }
            catch
            {
                return false;
            }
        }
    }
}
