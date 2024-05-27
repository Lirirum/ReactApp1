using Quartz;
using System.Net.Mail;
using System.Net;

namespace ReactApp1.Server.Services.Job
{
    public class EmailJob : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            try
            {
                var fromAddress = new MailAddress("t@gmail.com");
                const string fromPassword = "";

                var toAddress = new MailAddress("e@gmail.com");
                const string subject = "Scheduled Email";
                const string body = "Цей тестовий лист надісланий за допомогою Quartz.NET. Якщо прочитаєте його - дайте відповідь на питання. Що потрібно для автомата з дизципліни?";

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };

                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }

                Console.WriteLine("Email sent successfully at " + DateTime.Now);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to send email: " + ex.Message);
            }

            return Task.CompletedTask;
        }
    }
}
