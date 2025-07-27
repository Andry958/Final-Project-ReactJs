using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsAppBecend.Model;
using NewsAppBecend.Model.DB;

namespace NewsAppBecend.Controllers
{
    [Route("api/main")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly NewsDbContext _context;
        public MainController(NewsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetNews()
        {
            var newsItems = _context.NewsItems.ToList();


            return Ok(newsItems);
        }
        [HttpPost]
        public IActionResult AddNews([FromBody] NewsItem newsItem)
        {
            if (newsItem == null || string.IsNullOrEmpty(newsItem.Title) || string.IsNullOrEmpty(newsItem.Content))
            {
                return BadRequest("Invalid news item data.");
            }

            _context.NewsItems.Add(newsItem);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetNews), new { id = newsItem.Id }, newsItem);
        }
    }
}
