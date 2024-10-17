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

namespace Domain.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly RoleManager<IdentityRole> _roleManager;
        public static string Success = "Successfully";
        public static string notExistAcc = "Account does not exist";
        public static string noInfor = "Fields must not be blank";
        public static string notConfirmEmail = "You must confirm your email before login";

        public AccountRepository(UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _config = configuration;
            _roleManager = roleManager;
        }
      
        public async Task<string> SignInAsync(SignInModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            bool isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user!);
            if (!isEmailConfirmed) return notConfirmEmail;

            var passwordValid = await _userManager.CheckPasswordAsync(user!, model.Password);
            if (user == null || !passwordValid)
            {
                return noInfor;
            }
            
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())

            };

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }
            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _config["JWT:ValidIssuer"],
                audience: _config["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(26),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha512)

                );
            return new JwtSecurityTokenHandler().WriteToken(token);
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
            StringBuilder emailMessage = new StringBuilder();
            emailMessage.AppendLine("<html>");
            emailMessage.AppendLine("<body>");
            emailMessage.AppendLine($"<p>Dear {email},</p>");
            emailMessage.AppendLine("<p>Verify your email address by using this code:</p>");
            emailMessage.AppendLine($"<h2>Verification Code: {emailCode}</h2>");
            emailMessage.AppendLine("<p>Please enter this code on our website to complete your registration.</p>");
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

        public async Task<string> RequestPasswordReset(string email)
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

        public async Task<string> ResetPassword(string email, string token, NewPasswordModel model)
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

        public async Task<string> LockoutEnabled(string userId)
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

        public async Task<string> LockoutDisabled(string userId)
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

        //public async Task<bool> CheckLockoutEnabledAsync(ApplicationUser user)
        //{
        //    var result = await _userManager.GetLockoutEnabledAsync(user);
        //    return result;
        //}

       
    }
}
