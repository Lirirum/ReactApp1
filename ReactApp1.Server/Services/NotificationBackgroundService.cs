using Microsoft.AspNetCore.SignalR;

namespace ReactApp1.Server.Services
{
    public class NotificationBackgroundService : BackgroundService
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly ILogger<NotificationBackgroundService> _logger;
        private static readonly List<string> Messages = new List<string>
        {
            "The SCP Foundation is a global secret organization dedicated to keeping humanity safe through the defusing and containing of anomalous objects, creatures and phenomena known as SCP (Secure, Contain, Protect). The foundation's primary mission is to isolate these anomalies from society, prevent their impact, and protect humanity from potential threats.",
            "The Foundation consists of multiple units located around the world, each responsible for the research, maintenance, and study of specific SCP facilities. For example, Zone-19 is one of the largest zones and includes high-tech laboratories and containment chambers for the most dangerous facilities.",
            "All SCP facilities are categorized by threat level: Safe, Euclid, Keter, and others. The classification helps determine what precautions and maintenance are needed for each facility.\r\nSafe: Objects that can be easily and safely maintained.\r\nEuclid: Objects with unpredictable behavior, require constant monitoring.\r\nKeter: Objects that are extremely difficult or impossible to maintain.",
            "Scientific groups are engaged in studying the anomalous properties of SCP objects, conducting experiments to understand their nature and possible methods of neutralization.\r\nIt is important to note that research is conducted under strictly controlled conditions to minimize risks to personnel and the environment.",
            "SCP-682:\r\nDescription: A nearly indestructible creature that displays extreme aggressiveness.\r\nContainment Protocol: Highly protected armored chamber, regular protocol updates due to SCP-682's adaptive abilities."
        };

        public NotificationBackgroundService(IHubContext<NotificationHub> hubContext, ILogger<NotificationBackgroundService> logger)
        {
            _hubContext = hubContext;
            _logger = logger;


        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Notification service is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    // Генеруємо випадкові повідомлення
                    var user = "Admin";
                    Random random = new Random();
                    int index = random.Next(Messages.Count);
                    string randomMessage = Messages[index];

                    var message = $"{randomMessage}. Notification sent at {DateTime.Now}";

                    // Надсилаємо повідомлення всім клієнтам через SignalR
                    await _hubContext.Clients.All.SendAsync("ReceiveMessage", user, message);

                    // Затримка між надсиланням повідомлень
                    await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while sending notifications.");
                }
            }

            _logger.LogInformation("Notification service is stopping.");
        }
    }
}
