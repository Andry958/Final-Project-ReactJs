using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsAppBecend.Model;
using NewsAppBecend.Model.DB;
using System.Collections.Generic;
using System.Linq;

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

        // Змінено метод, щоб приймати список новин
        [HttpPost]
        public IActionResult AddNews([FromBody] List<NewsItem> newsItems)
        {
            if (newsItems == null || !newsItems.Any())
            {
                return BadRequest("No news items provided.");
            }

            // Валідація кожного об'єкта
            var invalidItems = newsItems.Where(n => string.IsNullOrEmpty(n.Title) || string.IsNullOrEmpty(n.Content)).ToList();
            if (invalidItems.Any())
            {
                return BadRequest("Some news items have invalid data (missing Title or Content).");
            }

            _context.NewsItems.AddRange(newsItems);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetNews), null, newsItems);
        }
        public class NewsItemDto
        {

            public string Author { get; set; }
            public string Content { get; set; }
            public string Description { get; set; }
            public DateTime PublishedAt { get; set; }
            public string Name { get; set; }
            public string Title { get; set; }
            public string Url { get; set; }
            public string UrlToImage { get; set; }
        }
    }
}
