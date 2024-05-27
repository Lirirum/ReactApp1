namespace ReactApp1.Server.Services
{
    public class WebsiteCheckerService : BackgroundService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<WebsiteCheckerService> _logger;
        private readonly string _url = "https://rozetka.com.ua/"; 

        public WebsiteCheckerService(IHttpClientFactory httpClientFactory, ILogger<WebsiteCheckerService> logger)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var client = _httpClientFactory.CreateClient();
                    var response = await client.GetAsync(_url, stoppingToken);
                    _logger.LogInformation($"Checked {_url} at {DateTime.UtcNow}: {(response.IsSuccessStatusCode ? "Available" : "Unavailable")}");
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Error checking {_url} at {DateTime.UtcNow}: {ex.Message}");
                }

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}
