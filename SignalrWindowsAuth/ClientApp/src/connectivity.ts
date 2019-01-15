import * as signalR from '@aspnet/signalr';

export function query<T>(url: string) {
    return fetch(url, { credentials: 'same-origin' })
        .then(response => response.json() as Promise<T>)
}

export function connectSignalR(url: string) {
    return new signalR.HubConnectionBuilder()
        .withUrl(`http://${document.location.host}/${url}`, { transport: signalR.HttpTransportType.LongPolling })
        .build();
}