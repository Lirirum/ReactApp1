﻿using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Options;
using System.Net.Mime;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml;

namespace ReactApp1.Server.Health
{
    public static class HealthCheckExtensions
    {
        public static Task WriteResponse(
            HttpContext context,
            HealthReport report)
        {
            var jsonSerializerOptions = new JsonSerializerOptions
            {
                WriteIndented = false,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
            };

            string json = JsonSerializer.Serialize(
                new
                {
                    Status = report.Status.ToString(),
                    Duration = report.TotalDuration,
                    Info = report.Entries
                        .Select(e =>
                            new
                            {
                                Key = e.Key,
                                Description = e.Value.Description,
                                Duration = e.Value.Duration,
                                Status = Enum.GetName(
                                    typeof(HealthStatus),
                                    e.Value.Status),
                                Error = e.Value.Exception?.Message,
                                Data = e.Value.Data
                            })
                        .ToList()
                },
                jsonSerializerOptions);

            context.Response.ContentType = MediaTypeNames.Application.Json;
            return context.Response.WriteAsync(json);
        }
    }

}
