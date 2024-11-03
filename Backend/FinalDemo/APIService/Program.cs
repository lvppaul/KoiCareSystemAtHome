using DinkToPdf.Contracts;
using DinkToPdf;
using Domain.Base;
using Domain.Models.Entity;
using Domain.Repositories;
using Domain.Services;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using KCSAH.APIServer.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SWP391.KCSAH.Repository;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
//var keyVaultURL = new Uri(builder.Configuration["KeyVaultURL"]);
//var azureCredential = new DefaultAzureCredential();
//builder.Configuration.AddAzureKeyVault(keyVaultURL, azureCredential);
//var authenticationId = builder.Configuration["testKoiId"];
//var authenticationSecret = builder.Configuration["testKoiSecret"];
//var authenticationFirebase = builder.Configuration["FirebaseId"];


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "KoiCareSystemAtHome API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromJson(
        @"{
      ""type"": ""service_account"",
  ""project_id"": ""koi-care-system-at-home-32e49"",
  ""private_key_id"": ""4d9429749fb003de05ead8303d15fba2b8346f87"",
  ""private_key"": ""-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDqWz7CJ9xrRj06\nj5EQ4sS2NAPA1AKMu1Oo0OQUKDd/yuUlXl/oosN0EInnlKJtfzgIkXwASETQsGgl\nI/22SMfr2vzy6YIMUOMQYohE8oej/OajeSrHdHCBdpu2EyYZaNmPdhzaR7vNPMtd\n4GQbbn95kkUufaFOk8oa3Rw3gDB7u87JLvNmM5ZqL+HBZG0feiYS3sCylrsMK0hM\n8Rwg1LllMk80G9H+CkXLP2qKKS0a0FSlvyvdVoPCPEDkyIWxtNGomhfnyDqMyiJL\nYBadHqEq3/EMlEo2LIR7LQbmK54JnCYhlS1lmH2guxo4TQIZmoj/DfpHp4Brhj1X\n2FVNzg3hAgMBAAECggEABUZGdFI3WMa87At9JVclPECRcQ6UfBxfNqZ066s4DI1B\neQTVvcOkCIGyyN6EhVhep3q2wr7dpaDCx0s3E5oxvbIxDTqKLcLISX8eOAcJXHx9\nqGI6v0B0o8VKnd9ydRHyC5OJ9LO2m1jp7tP1DNUA03iiS/iR39Xdr5sYXntpG+/E\nIa0z/l7YV7EioSHZYv6M+TCD6JVTdAiekgrDnXM42meMjsF3YUBIEvlqnt+6V0Fp\n/gDoCqV2KHovt1qPAF1W/T3uqFsNXnc3pJ65lCKfzQXpdllpCxrsz328y2FxZApY\nh1zOy0OQ39zAGY/0jZJC5sifZ7cyTiZ0STIKx2NPEQKBgQD5Yv21DfLRGzCnZW90\nOkoExEUbj7we9bUsuzujJLM5IjwIeImG2pyW+LrJR8CSpYklpAHcTB/Y95Ealq8Y\n2sSFKad/MoxPGRFoUMnFXMCmSY+KhBqxM/Gu6yw2kslFrD7cYs91XV/+e+gPNZbK\nRCPe+UW7Jth5gOeXJ611S9x1zQKBgQDwkjflYgAVOenTC4QRkV6mTG7CRungaF5m\nFbq9KBHT+2LB6CwLJOAs9J/GhjW2k932s3tZthgnl2ikkAEQsWQAYD3D385zmzD7\n9anlJfNs+EYThsLx9IYscYkCHeL+B6v8Nv2T61jtoHa3TPxQ6JZX69S1yLWvCQjK\nskewuY3kZQKBgQCCRR12SFUAug1ORARWWGR13Pikjw6btYnwVdWvQOqF+8YUPrLI\nSMXnbwJTRjHn6KSdjvCR3Qn90kRv+Sp59z0Uuk+OeB8m6ldXgGwFto/DzUU3/A3d\nZt7mml48G60bwgAMK2lnS2Frk9oCp+Gewr1iKiAsxPvrbFSNduJ7FSeSOQKBgDJk\nbpD+FkZb+z7aCrAjY1AycoD/mb4IHr4DjzpQSmu9HNLBb3hmIQ9Jrq5HLrkwAC7N\nKemA205vyNuvzolQn0H05vtAxl4xA/HDY/M8H+GToBo3AF7ueayVm711xTaxJLWQ\nT03M3rPoCPYcij3oepWwML5jbKtdmRncfmfmdnKBAoGBAO13X4c612CYVnhQ6Z7G\n7rOaILK50uu29wm3U9Q0wtYz7XjZUs25qpzRQk6Zxa/9+KETFSQ1CS/6/lfZ16P/\ngOv2u3Jrgo41SwvtrfgA1RUwerPrvyIA16a4llflCEmfH4L5T98nMYxavssJzuCG\nihVJvQsCYjiD0Bebs0JwgMTV\n-----END PRIVATE KEY-----\n"",
  ""client_email"": ""firebase-adminsdk-rnaba@koi-care-system-at-home-32e49.iam.gserviceaccount.com"",
  ""client_id"": ""114570720796505249358"",
  ""auth_uri"": ""https://accounts.google.com/o/oauth2/auth"",
  ""token_uri"": ""https://oauth2.googleapis.com/token"",
  ""auth_provider_x509_cert_url"": ""https://www.googleapis.com/oauth2/v1/certs"",
  ""client_x509_cert_url"": ""https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rnaba%40koi-care-system-at-home-32e49.iam.gserviceaccount.com"",
  ""universe_domain"": ""googleapis.com""
    }")
});
builder.Services.AddScoped<UnitOfWork>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
builder.Services.AddScoped<PdfGenerator>();
builder.Services.AddScoped<PondService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<VnPayService>();
builder.Services.AddScoped<SaltCalculator>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddDbContext<KoiCareSystemAtHomeContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<KoiCareSystemAtHomeContext>()
    .AddDefaultTokenProviders();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new
    Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey= true,


        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes
        (builder.Configuration["JWT:Secret"]))
    };
});
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IVnPayService, VnPayService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();
