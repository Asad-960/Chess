
using Microsoft.AspNetCore.Identity;

namespace API.Services;

public class ErrorsFormatter
{
    public static Dictionary<string, List<string>> GetError(IdentityResult results)
    {
        Dictionary<string, List<string>> errors = new Dictionary<string, List<string>>();

        var result = results.Errors;
        foreach (var r in result)
        {
            string key = GetErrorType(r.Code);
            if (!errors.ContainsKey(key))
            {
                errors[key] = [r.Description];
            }
            else {
                errors[key].Add(r.Description);
            }
        }
        return errors;
    }
    private static string GetErrorType(string error)
    {
        if (error.Contains("Email"))
        {
            return "Email";
        }
        else if (error.Contains("Password"))
        {
            return "Password";
        }
        else if (error.Contains("Username"))
        {
            return "Username";
        }
        return "Error";
    }
}
