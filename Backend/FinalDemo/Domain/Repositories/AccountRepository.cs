using Azure.Core;
using Domain.Authentication;
using Domain.Base;
using Domain.Helper;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using System.Web;
using Domain.Models.Entity;
using System.Security.Cryptography;
using Domain.Models.Dto.Response;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly RoleManager<IdentityRole> _roleManager;
        private static string Success = "Successfully";
        private static string notExistAcc = "Account does not exist";
        private static string noInfor = "Fields must not be blank";
        private static string notConfirmEmail = "Confirm Your Email";
        private static string wrongPass = "Wrong password";

        public AccountRepository(UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _config = configuration;
            _roleManager = roleManager;
        }

        //public async Task<string> SignInAsync(SignInModel model)
        //{
        //    var user = await _userManager.FindByEmailAsync(model.Email);
        //    if(user==null) return notExistAcc;
        //    bool isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user!);
        //    if (!isEmailConfirmed) return notConfirmEmail;

        //    var passwordValid = await _userManager.CheckPasswordAsync(user!, model.Password);
        //    if (!passwordValid) return wrongPass;

        //    var authClaims = new List<Claim>
        //    {   
        //        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
        //    };

        //    var userRoles = await _userManager.GetRolesAsync(user);
        //    foreach (var role in userRoles)
        //    {
        //        authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
        //    }


        //   string token = GenerateJwtToken(authClaims);


        //    return token;
        //}

        public async Task<AuthenticationResponse> SignInAsync(SignInModel model)
        {
            
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return new AuthenticationResponse { Message = notExistAcc };

            bool isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user!);
            if (!isEmailConfirmed) return new AuthenticationResponse { Message = notConfirmEmail };

            var passwordValid = await _userManager.CheckPasswordAsync(user!, model.Password);
            if (!passwordValid) return new AuthenticationResponse { Message = wrongPass };

            var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }

            // Tạo Access Token
            string token = GenerateJwtToken(authClaims);

            // Tạo Refresh Token
            string refreshToken = GenerateRefreshToken();

            // Lưu Refresh Token vào bảng User
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiration = DateTime.Now.AddDays(7); // Ví dụ: refresh token có hạn 7 ngày
            await _userManager.UpdateAsync(user);

            return new AuthenticationResponse { AccessToken = token, RefreshToken = refreshToken };
        }

        // GenerateRefreshToken
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        // GenerateJwtToken
        private string GenerateJwtToken(List<Claim> authClaims)
        {
            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _config["JWT:ValidIssuer"],
                audience: _config["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha512)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        // RefreshTokenAsync
        public async Task<AuthenticationResponse> RefreshTokenAsync(string refreshToken)
        {
            AuthenticationResponse response =  new AuthenticationResponse();

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiration <= DateTime.Now)
            {
                response.Message = "Invalid refresh token or token has expired";
                return response;
            }

            // Tạo Access Token mới
            var authClaims = new List<Claim>
                 {
                     new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                     new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                 };

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }

            string newAccessToken = GenerateJwtToken(authClaims);

            // Tùy thuộc vào yêu cầu của bạn, bạn có thể tạo refresh token mới tại đây
            string newRefreshToken = GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiration = DateTime.Now.AddDays(7); // Refresh token mới có hạn 7 ngày
            await _userManager.UpdateAsync(user);
            response.AccessToken = newAccessToken;
            response.RefreshToken = newRefreshToken;
            return response;
        }



        public async Task<string> GetUserIdByEmailAsync(string email)
        {
           var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return notExistAcc;
             string uid = user.Id.ToString();
            return uid;
        }

        public async Task<string> SignUpAsync(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                foreach (var claim in result.Errors)
                {
                    return claim.Description;
                }
            }
            // role
            if (!await _roleManager.RoleExistsAsync(AppRole.Member))
            {
                await _roleManager.CreateAsync(new IdentityRole(AppRole.Member));
            }
            await _userManager.AddToRoleAsync(user, AppRole.Member);
            // email
            var createdUser = await _userManager.FindByEmailAsync(user.Email);
            var emailCode = await _userManager.GenerateEmailConfirmationTokenAsync(createdUser!);
            var encodedToken = HttpUtility.UrlEncode(emailCode);
            string sendEmail = SendEmailConfirmEmail(createdUser!.Email!, encodedToken);
            if (!sendEmail.Equals(Success)) return "Fail to send email";
            return Success;

        }

        public async Task<string> CreateVipAccount(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                foreach (var claim in result.Errors)
                {
                    return claim.Description;
                }
            }
            // role
            if (!await _roleManager.RoleExistsAsync(AppRole.Vip))
            {
                await _roleManager.CreateAsync(new IdentityRole(AppRole.Vip));
            }
            await _userManager.AddToRoleAsync(user, AppRole.Vip);
            // email
            var createdUser = await _userManager.FindByEmailAsync(user.Email);
            var emailCode = await _userManager.GenerateEmailConfirmationTokenAsync(createdUser!);
            var encodedToken = HttpUtility.UrlEncode(emailCode);
            string sendEmail = SendEmailConfirmEmail(createdUser!.Email!, encodedToken);
            if (!sendEmail.Equals(Success)) return "Fail to send email";
            return Success;

        }

        public async Task<string> CreateShopAccount(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                foreach (var claim in result.Errors)
                {
                    return claim.Description;
                }
            }
            // role
            if (!await _roleManager.RoleExistsAsync(AppRole.Shop))
            {
                await _roleManager.CreateAsync(new IdentityRole(AppRole.Shop));
            }
            await _userManager.AddToRoleAsync(user, AppRole.Shop);
            // email
            var createdUser = await _userManager.FindByEmailAsync(user.Email);
            var emailCode = await _userManager.GenerateEmailConfirmationTokenAsync(createdUser!);
            var encodedToken = HttpUtility.UrlEncode(emailCode);
            string sendEmail = SendEmailConfirmEmail(createdUser!.Email!, encodedToken);
            if (!sendEmail.Equals(Success)) return "Fail to send email";
            return Success;

        }

        public async Task<string> CreateAdminAccount(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                foreach (var claim in result.Errors)
                {
                    return claim.Description;
                }
            }
            // role
            if (!await _roleManager.RoleExistsAsync(AppRole.Member))
            {
                await _roleManager.CreateAsync(new IdentityRole(AppRole.Member));
            }
            await _userManager.AddToRoleAsync(user, AppRole.Member);
            // email
            //var createdUser = await _userManager.FindByEmailAsync(user.Email);
            //var emailCode = await _userManager.GenerateEmailConfirmationTokenAsync(createdUser!);
            //var encodedToken = HttpUtility.UrlEncode(emailCode);
            //string sendEmail = SendEmailConfirmEmail(createdUser!.Email!, encodedToken);
            //if (!sendEmail.Equals(Success)) return "Your email is not exist";
            return Success;

        }

        public string SendEmailConfirmEmail(string email, string emailCode)
        {
            string confirmLink = $"https://localhost:7031//account/reset-password/{emailCode}";
            StringBuilder emailMessage = new StringBuilder();
            emailMessage.AppendLine("<html>");
            emailMessage.AppendLine("<body>");
            emailMessage.AppendLine($"<p>Dear {email},</p>");
            emailMessage.AppendLine("<p>Verify your email address:</p>");
            emailMessage.AppendLine($"<p><a href=\"{confirmLink}\">Click this link to confirm your email</a> </p>");
            emailMessage.AppendLine("<p>If you did not request this, please ignore this email.</p>");
            emailMessage.AppendLine("<br>");
            emailMessage.AppendLine("<p>Best regards,</p>");
            emailMessage.AppendLine("<p><strong>FPT TT Koi</strong></p>");
            emailMessage.AppendLine("</body>");
            emailMessage.AppendLine("</html>");

            string message = emailMessage.ToString();


            var _email = new MimeMessage();
            _email.To.Add(MailboxAddress.Parse(email));
            _email.From.Add(MailboxAddress.Parse(_config["MailSettings:DefaultSender"]));
            _email.Subject = "Email Confirmation";
            _email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message };


            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_config["MailSettings:DefaultSender"], _config["MailSettings:Password"]);

            smtp.Send(_email);
            smtp.Disconnect(true);

            return Success;
        }

        public async Task<string> ConfirmEmailAsync(string email, string code)
        {

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(code)) return noInfor;

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return notExistAcc ;

            var decodedToken = HttpUtility.UrlDecode(code);
            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
            if (!result.Succeeded)
            {
                foreach (var item in result.Errors)
                {
                    return item.Description;
                }

            }
            return Success;
        }

        public async Task<string> RequestPasswordResetAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return notExistAcc;
            
            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            string validToken = HttpUtility.UrlEncode(resetToken);
            SendEmailResetPassWord(user.Email!, validToken);
            return Success;
        }

        public string SendEmailResetPassWord(string email, string evalidToken)
        {
            string resetLink = $"https://localhost:7031//account/reset-password/{evalidToken}";
            StringBuilder emailMessage = new StringBuilder();
            emailMessage.AppendLine("<html>");
            emailMessage.AppendLine("<body>");
            emailMessage.AppendLine($"<p>Dear {email},</p>");
            emailMessage.AppendLine("<p>You request to set a new password. Click the link below to set your password:</p>");
            emailMessage.AppendLine($"<p><a href=\"{resetLink}\">Set Your PassWord</a> </p>");
            emailMessage.AppendLine("<p>If you did not request this, please ignore this email.</p>");
            emailMessage.AppendLine("<br>");
            emailMessage.AppendLine("<p>Best regards,</p>");
            emailMessage.AppendLine("<p><strong>FPT TT Koi</strong></p>");
            emailMessage.AppendLine("</body>");
            emailMessage.AppendLine("</html>");

            string message = emailMessage.ToString();


            var _email = new MimeMessage();
            _email.To.Add(MailboxAddress.Parse(email));
            _email.From.Add(MailboxAddress.Parse(_config["MailSettings:DefaultSender"]));
            _email.Subject = "Reset Password";
            _email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message };


            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_config["MailSettings:DefaultSender"], _config["MailSettings:Password"]);

            smtp.Send(_email);
            smtp.Disconnect(true);

            return "Successfully";
        }

        public async Task<string> ResetPasswordAsync(string email, string token, NewPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return notExistAcc;

            var validToken = HttpUtility.UrlDecode(token);
            if (string.IsNullOrEmpty(validToken))
            {
                return noInfor;
            }
            if (!model.NewPassword.Equals(model.ConfirmPassword))
            {
                return "Password do not match";
            }

            var result = await _userManager.ResetPasswordAsync(user, validToken, model.NewPassword);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    return error.Description;
                }
            }
            return Success;

        }

        public async Task<string> ChangePasswordAsync(string userId,ChangePasswordModel model)
        {
            var user  = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return notExistAcc;
            }
            var result = await _userManager.ChangePasswordAsync(user,model.CurrentPassword,model.NewPassword);
           
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    return error.Description;
                }
            }
            return Success;
          
        }

        public async Task<string> UpdateAccountDetailAsync(string userId, AccountDetailModel model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return notExistAcc;

            user.Sex = model.Sex;
            user.Street = model.Street;
            user.District = model.District;
            user.City = model.City;
            user.Country = model.Country;
            user.PhoneNumber = model.PhoneNumber;
            var result = await _userManager.UpdateAsync(user);
           
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    return error.Description;
                }
            }
            return Success;
        }

        public async Task<string> ChangeRoleToVipAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return notExistAcc;

            var removeResult = await _userManager.RemoveFromRoleAsync(user, AppRole.Member);
            if (!removeResult.Succeeded)
            {
                foreach(var error in removeResult.Errors)
                {
                    return error.Description;
                }
            }
            if (!await _roleManager.RoleExistsAsync(AppRole.Vip))
            {
                await _roleManager.CreateAsync(new IdentityRole(AppRole.Vip));
            }
            var addResult = await _userManager.AddToRoleAsync(user, AppRole.Vip);
            if (!addResult.Succeeded) {
                foreach (var error in addResult.Errors)
                {
                    return  error.Description;
                }
            }
            return Success;
        }

        public async Task<string> LockoutEnabledAsync(string userId)
        {
            string mes = "This account is locked already";
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return notExistAcc;

            var check = await _userManager.GetLockoutEnabledAsync(user);
           
            if (!check)
            {
                var result = await _userManager.SetLockoutEnabledAsync(user, true);
                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        return mes = error.Description;
                    }
                }
                return mes = "Locked";
            }
            return mes;
        }

        public async Task<string> LockoutDisabledAsync(string userId)
        {
            string mes = "This account is not locked yet";
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return mes = "Your Account does not exist";
            }
            var check = await _userManager.GetLockoutEnabledAsync(user);
            if (check)
            {
                var result = await _userManager.SetLockoutEnabledAsync(user, false);
                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        return mes = error.Description;
                    }
                }
                return mes = "UnLocked";
            }
            return mes;
        }

        public async Task<ApplicationUser> GetAccountByUserIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return null;
            return user;
        }

      





        //public async Task<bool> CheckLockoutEnabledAsync(ApplicationUser user)
        //{
        //    var result = await _userManager.GetLockoutEnabledAsync(user);
        //    return result;
        //}


    }
}
