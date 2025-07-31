using Microsoft.AspNetCore.Mvc;
using NewsAppBecend.Model;
using NewsAppBecend.Model.DB;

namespace NewsAppBecend.Controllers
{

    [Route("api/lr")]
    [ApiController]
    public class LoginRegisterController : Controller
    {
        private readonly NewsDbContext _context;
        public LoginRegisterController(NewsDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto l)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Username == l.Username && u.Password == l.Password);
            if (user == null)
            {
                return Unauthorized("Invalid username or password");
            }
            else
            {
                return Ok(user);
            }
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto l)
        {

            User user = new User
            {
                Description = l.Username,
                Name = l.Username,
                Email = l.Username + "@example.com",
                Username = l.Username,
                Password = l.Password,
                Role = l.Role,
                Editions = new List<EditionsItem>()
            };

            if (_context.Users.Any(u => u.Username == l.Username))
            {
                return BadRequest("Username already exists");
            }
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(new { message = "User registered successfully" });
        }
        public class LoginDto
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
        public class RegisterDto
        {
            public string Description { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
            public string Role { get; set; }
            public List<EditionsItem> Editions { get; set; }
        }
    }
}
