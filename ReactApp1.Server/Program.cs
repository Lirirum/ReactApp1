using Asp.Versioning;
using Asp.Versioning.ApiExplorer;
using Asp.Versioning.Builder;
using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Quartz;
using ReactApp1.Server;
using ReactApp1.Server.Data;
using ReactApp1.Server.Health;
using ReactApp1.Server.Models.Authentication;
using ReactApp1.Server.OpenApi;
using ReactApp1.Server.Services;
using Serilog;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
string connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddApiVersioning();

builder.Services.AddSwaggerGen(c =>
{
    

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });


    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.AddHttpClient();
builder.Services.AddMemoryCache();

builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IImagesService, ImagesService>();
builder.Services.AddSingleton<IHealthCheck,DatabaseHealthCheck>();
builder.Services.AddSingleton<IHealthCheck, ApiHealthCheck>();
builder.Services.AddSingleton<CurrencyRateProvider>();
builder.Services.AddHttpClient<CurrencyService>();
builder.Services.AddQuartz(q =>
{
    q.UseMicrosoftDependencyInjectionJobFactory();
});

// Реєстрація фонової служби
builder.Services.AddHostedService<QuartzService>();
builder.Services.AddScoped<ICurrencyService, CurrencyService>();
builder.Services.AddHostedService<WebsiteCheckerService>();
builder.Services.AddHostedService<DataChangesService>();
builder.Services.AddHostedService<CurrencyRateService>();
builder.Services.AddHostedService<NotificationBackgroundService>();

builder.Services.AddDbContext<ShopContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});




builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
       
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});
builder.Services.AddAuthorization();
builder.Services.AddHealthChecks().
    AddCheck<DatabaseHealthCheck>(nameof(DatabaseHealthCheck))
    .AddCheck<ApiHealthCheck>(nameof(ApiHealthCheck));



builder.Services.AddHealthChecksUI(options =>
{
    options.SetEvaluationTimeInSeconds(5); //Sets the time interval in which HealthCheck will be triggered
    options.MaximumHistoryEntriesPerEndpoint(10); //Sets the maximum number of records displayed in history
    options.AddHealthCheckEndpoint("Health Checks API", "/healthcheck"); //Sets the Health Check endpoint
}).
AddInMemoryStorage();
Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).    
    CreateLogger();


builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1);
    options.ReportApiVersions = true;
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader());
})
.AddMvc()
.AddApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});
builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();





builder.Host.UseSerilog();

builder.Services.AddOpenTelemetry()
    .WithTracing(b =>
    {
        b.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("OpenTelemetryDemo"))
         .AddAspNetCoreInstrumentation()
         .AddHttpClientInstrumentation()
         .AddOtlpExporter(o => o.Endpoint = new Uri("http://localhost:4317"));
    })
    .WithMetrics(b =>
    {
        b.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("OpenTelemetryDemo"))
         .AddAspNetCoreInstrumentation()
         .AddHttpClientInstrumentation()
         .AddOtlpExporter(o => o.Endpoint = new Uri("http://localhost:4317"));
    });


var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseSerilogRequestLogging();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<CurrencyHub>("/hub");
ApiVersionSet apiVersionSet = app.NewApiVersionSet().
    HasApiVersion(new ApiVersion(1)).
    HasApiVersion(new ApiVersion(2)).
    HasApiVersion(new ApiVersion(3)).
    ReportApiVersions().
    Build();

RouteGroupBuilder versionGroup = app
    .MapGroup("api/v{apiVersion:apiVersion}")
    .WithApiVersionSet(apiVersionSet);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => {
        IReadOnlyList<ApiVersionDescription> descriptions = app.DescribeApiVersions();
        foreach (ApiVersionDescription desc in descriptions)
        {
            string url = $"/swagger/{desc.GroupName}/swagger.json";
            string name= desc.GroupName.ToUpperInvariant() ;
            c.SwaggerEndpoint(url, name);
        }


    });
}



app.MapFallbackToFile("/index.html");
app.MapControllers();

app.UseEndpoints(endpoints =>
{


    endpoints.MapHealthChecks("/health", new HealthCheckOptions()
    {
        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
    });
    endpoints.MapHealthChecks("/database_health", new HealthCheckOptions()
    {
        Predicate = (check) => check.Name == nameof(DatabaseHealthCheck),
        ResponseWriter = HealthCheckExtensions.WriteResponse
    });
    endpoints.MapHealthChecks("/healthcheck", new HealthCheckOptions()
    {
        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
    });
    endpoints.MapHealthChecks("/api_health", new HealthCheckOptions()
    {
        Predicate = (check) => check.Name == nameof(ApiHealthCheck),
        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
    });
    endpoints.MapHealthChecksUI(options => options.UIPath = "/dashboard-ui");

    endpoints.MapHub<NotificationHub>("/notificationHub");



});





app.Run();


