using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using System.Net;
using System.Net.Mail;

namespace ReactApp1.Server.Services
{
    public class DataChangesService : BackgroundService
    {
        private readonly IServiceProvider _services;
        private  readonly MailAddress fromAddress;
        private readonly MailAddress toAddress;
        private readonly string fromPassword;


        public DataChangesService(IServiceProvider services)
        {
            _services = services;
            fromAddress = new MailAddress("t@gmail.com");
            fromPassword = "";
            toAddress = new MailAddress("e@gmail.com");
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using (var scope = _services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ShopContext>();

                while (!stoppingToken.IsCancellationRequested)
                {
                    var newRecords = await dbContext.ProductChangesLogs
                    .Where(r => r.OperDateTime >= DateTime.Now.AddMinutes(-1))
                    .Select(r => new
                    {
                        r.OperType,
                        r.OperDateTime,
                        r.RowsQuantity
                    })
                    .FirstOrDefaultAsync();

                    if (newRecords != null)
                    {
                        try
                        {
                            using (var smtp = new SmtpClient
                            {
                                Host = "smtp.gmail.com",
                                Port = 587,
                                EnableSsl = true,
                                DeliveryMethod = SmtpDeliveryMethod.Network,
                                UseDefaultCredentials = false,
                                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                            })
                            {
                                var message = new MailMessage(fromAddress, toAddress)
                                {
                                    Subject = "Дані БД були змінені",
                                    Body = $"Дані БД були змінені!.Тип операції: {newRecords.OperType} Дата операції: {newRecords.OperDateTime} "
                                };
                                smtp.Send(message);
                            }

                         
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Failed to send email: {ex.Message}");
                        }
                    }

                    await Task.Delay(1000, stoppingToken); // Перевіряємо базу даних кожну секунду
                }
            }
        }


    }
}
