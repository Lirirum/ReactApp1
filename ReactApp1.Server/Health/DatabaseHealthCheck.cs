using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using ReactApp1.Server.Data;

namespace ReactApp1.Server.Health
{
    public class DatabaseHealthCheck : IHealthCheck
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;

        public DatabaseHealthCheck(IConfiguration config)
        {
            _config = config;
            _connectionString= config.GetConnectionString("DefaultConnection");
        }


        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
                    

            try
            {
                using var connection = new SqlConnection(_connectionString);

                await connection.OpenAsync(cancellationToken);

                using var command = connection.CreateCommand();

                command.CommandText = "SELECT 1";

                await command.ExecuteScalarAsync(cancellationToken);

                return HealthCheckResult.Healthy();
            }
            catch (Exception ex)
            {
                return HealthCheckResult.Unhealthy($"Database check failed: {ex.Message}");
            }
        }
    }

}
