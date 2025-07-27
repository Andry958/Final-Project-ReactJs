namespace NewsAppBecend.Model
{
    public class UserSelectedEditions
    {
        public Guid Id { get; set; }
        
        public string Edition { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
