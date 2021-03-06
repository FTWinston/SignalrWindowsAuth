﻿using Microsoft.AspNetCore.SignalR;
using SignalrWindowsAuth.Models;
using System.Threading.Tasks;

namespace SignalrWindowsAuth.Hubs
{
    public class AnonHub : Hub<IHubResponse>
    {
        public async Task DoSomething(string param)
        {
            var client = Clients.Client(Context.ConnectionId);

            await client.Start("working...");

            await Task.Delay(5000);

            await client.End(param + " ok");
        }
    }
}
