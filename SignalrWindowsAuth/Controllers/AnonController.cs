using Microsoft.AspNetCore.Mvc;
using SignalrWindowsAuth.Models;

namespace SignalrWindowsAuth.Controllers
{
    [Route("api/[controller]")]
    public class AnonController : Controller
    {
        [HttpGet("[action]")]
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public ApiResponse Unauthorised()
        {
            return new ApiResponse()
            {
                Result = "ok"
            };
        }
    }
}