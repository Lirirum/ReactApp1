using Quartz.Spi;
using Quartz;
using ReactApp1.Server.Services.Job;
using ReactApp1.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace ReactApp1.Server.Services
{
    public class QuartzService : IHostedService
    {
        private readonly ISchedulerFactory _schedulerFactory;
        private readonly IJobFactory _jobFactory;
        private IScheduler _scheduler;

        public QuartzService(ISchedulerFactory schedulerFactory, IJobFactory jobFactory)
        {
            _schedulerFactory = schedulerFactory;
            _jobFactory = jobFactory;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _scheduler = await _schedulerFactory.GetScheduler(cancellationToken);
            _scheduler.JobFactory = _jobFactory;
            await _scheduler.Start(cancellationToken);

            var job = JobBuilder.Create<EmailJob>()
                .WithIdentity("EmailJob", "group1")
                .Build();

            var trigger = TriggerBuilder.Create()
                .WithIdentity("EmailJobTrigger", "group1")
                .StartNow()
                .WithSimpleSchedule(x => x
                    .WithIntervalInMinutes(10)
                    .RepeatForever())
                .Build();

            await _scheduler.ScheduleJob(job, trigger, cancellationToken);
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            if (_scheduler != null)
            {
                await _scheduler.Shutdown(cancellationToken);
            }
        }
    }
}
