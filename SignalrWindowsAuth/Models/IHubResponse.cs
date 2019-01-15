using System.Threading.Tasks;

namespace SignalrWindowsAuth.Models
{
    public interface IHubResponse
    {
        Task Start(string value);

        Task End(string value);
    }
}
