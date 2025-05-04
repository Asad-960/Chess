using System.ComponentModel.DataAnnotations;

namespace Persistence.DTO
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address format")]
        public string? Email { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
        public string Password { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
        [Compare("Password", ErrorMessage = "Password do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be at least 2 characters long")]
        public string? Name { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Username must be at least 3 characters long")]
        public string? UserName { get; set; }        
    }
}