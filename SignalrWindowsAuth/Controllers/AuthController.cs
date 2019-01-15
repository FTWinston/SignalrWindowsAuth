using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SignalrWindowsAuth.Models;

namespace SignalrWindowsAuth.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        [HttpGet("[action]")]
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public ApiResponse Authorised()
        {
            return new ApiResponse()
            {
                Result = "ok"
            };
        }
    }
}