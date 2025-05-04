using API.Services;
using Domain.IdentityEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Persistence.DTO;
using Persistence.ServiceContracts;



namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public readonly SignInManager<ApplicationUser> _signInManager;
        
        private readonly IJwtService _jwtService;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IJwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }
        
        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> Register([FromBody]RegisterDto? registerDto)
        {
            if (ModelState.IsValid == false)
            {

                if (registerDto?.Email != null)
                {
                    if (_userManager.Users.Any(x => x.Email == registerDto.Email))
                    {
                        ModelState.AddModelError("Email", "Email already exists");
                    }
                }
             
                return BadRequest(ModelState);
            }
            if (registerDto == null)
            {
                return BadRequest("Please provide valid information");
            }

            ApplicationUser user = new(){ PersonName = registerDto.Name, Email=registerDto.Email, UserName=registerDto.UserName};

            IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: true);
                var token = _jwtService.GenerateToken(user);
                return Ok(token);
            }
            
            return BadRequest(ErrorsFormatter.GetError(result));
        }

        [HttpPost] 
        public async Task<IActionResult> Login([FromBody]LoginDto? loginDto)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            if (loginDto == null)
            {
                return BadRequest("Please provide valid information");
            }
            
            ApplicationUser? user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                ModelState.AddModelError("Login", "Invalid Email or Password");
                return BadRequest(ModelState);
            }
            
            await _signInManager.SignInAsync(user, isPersistent: true);
            var token = _jwtService.GenerateToken(user);
            return Ok(token);
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return NoContent();
        }

    }
}