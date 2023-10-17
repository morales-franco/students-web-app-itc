namespace Students.WebApp.Infrastructure.Membership
{
    public class AppUser
    {
        public string Username { get; private set; }
        public string FullName { get; private set; }
        public string[] Rules { get; private set; }

        public AppUser(string username, string fullName, string[] rules)
        {
            Username = username;
            FullName = fullName;
            Rules = rules;
        }

        public bool HasPermission(string ruleDefinition) =>
            Rules.Any(x => x.ToLower() == ruleDefinition.ToLower());
    }
}
