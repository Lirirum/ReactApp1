using Microsoft.AspNetCore.SignalR;
using ReactApp1.Server.Services;
using Serilog;
using System.Collections.Concurrent;

namespace ReactApp1.Server
{
    public class CurrencyHub : Hub
    {
        private readonly CurrencyService _currencyService;
        private static ConcurrentDictionary<string, CancellationTokenSource> _ctsDict = new ConcurrentDictionary<string, CancellationTokenSource>();

        public CurrencyHub(CurrencyService currencyService)
        {
            _currencyService = currencyService;
  
        }

    

        public async Task SubscribeToCurrencyUpdates(string baseCurrency, string targetCurrency, decimal amount)
        {
            var cts = new CancellationTokenSource();
            _ctsDict.TryAdd(Context.ConnectionId, cts);


            while (!cts.IsCancellationRequested)            {
                
                var exchangeRate = await _currencyService.ConvertCurrency(baseCurrency, targetCurrency, amount);
                await Clients.Client(Context.ConnectionId).SendAsync("ReceiveCurrencyUpdate", exchangeRate);
                await Task.Delay(TimeSpan.FromSeconds(5));
                Log.Information($"{baseCurrency}, {targetCurrency}, {amount}, {exchangeRate}");

            }
        }

        public async Task UnsubscribeFromCurrencyUpdates()
        {
 
            if (_ctsDict.TryRemove(Context.ConnectionId, out var cts))
            {
        
                cts.Cancel();
                cts.Dispose();
            }
        }

        public async Task ChangeCurrencySubscription(string baseCurrency, string targetCurrency, decimal amount)
        {
            await UnsubscribeFromCurrencyUpdates();
            await SubscribeToCurrencyUpdates(baseCurrency, targetCurrency, amount);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (_ctsDict.TryRemove(Context.ConnectionId, out var  cts))
            {
                cts.Cancel();
                cts.Dispose();
            }
            await base.OnDisconnectedAsync(exception);
        }

    }

}
