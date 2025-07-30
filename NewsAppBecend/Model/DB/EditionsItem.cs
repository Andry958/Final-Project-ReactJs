using System.ComponentModel.DataAnnotations;

namespace NewsAppBecend.Model.DB
{
    public class EditionsItem
    {
        [Key]
        public string Name { get; set; }
    }
}
