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
using FirebaseAdmin.Auth;
using Domain.Models.Dto.Request;
using AutoMapper;
using KCSAH.APIServer.Dto;

namespace Domain.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        private static string Success = "Successfully";
        private static string notExistAcc = "Account does not exist";
        private static string noInfor = "Fields must not be blank";
        private static string notConfirmEmail = "Confirm Your Email";
        private static string wrongPass = "Wrong password";
        private static string failCreateUser = "Fail Create User";
        private static string GmailLoginFail = "Fail Login Gmail";

        public AccountRepository(UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            RoleManager<IdentityRole> roleManager, IMapper mapper
            )
        {
            _userManager = userManager;
            _config = configuration;
            _roleManager = roleManager;
            _mapper = mapper;
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
        public async Task<AuthenticationResponse> GmailSignIn(TokenRequest firebaseToken)
        {
            try
            {
                // Verify the Firebase token
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance
                    .VerifyIdTokenAsync(firebaseToken.Token);
                string uid = decodedToken.Uid;
                string email = decodedToken.Claims["email"].ToString();
                string name = decodedToken.Claims["name"].ToString();
                string picture = decodedToken.Claims["picture"].ToString();
                //int indexLastName = name.LastIndexOf(" ");
                //string LastName = name.Substring(indexLastName + 1);
                //string FirstName = name.Substring(0, indexLastName);
                // Kiểm tra nếu tên chỉ có FirstName
                int indexLastName = name.LastIndexOf(" ");
                string LastName = "";
                string FirstName = name;

                if (indexLastName != -1)
                {
                    // Nếu có họ và tên
                    LastName = name.Substring(indexLastName + 1);
                    FirstName = name.Substring(0, indexLastName);
                }

                // Check if the user exists in your database
                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    // Create a new user if they don't exist
                    user = new ApplicationUser
                    {
                        UserName = email,
                        Email = email,
                        LastName = LastName,
                        FirstName = FirstName,
                        EmailConfirmed = true,
                    };
                    var result = await _userManager.CreateAsync(user);
                    if (!result.Succeeded)
                    {
                        return new AuthenticationResponse { Message = failCreateUser };
                    }
                    if (!await _roleManager.RoleExistsAsync(AppRole.Member))
                    {
                        await _roleManager.CreateAsync(new IdentityRole(AppRole.Member));
                    }
                    await _userManager.AddToRoleAsync(user, AppRole.Member);
                }
                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email),
                new Claim("Avatar",picture),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

                var userRoles = await _userManager.GetRolesAsync(user);
                foreach (var role in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role.ToString()));
                }
                // Generate your own JWT token
                var token = GenerateJwtToken(claims);
                string refreshToken = GenerateRefreshToken();

                // Lưu Refresh Token vào bảng User
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiration = DateTime.Now.AddDays(7); // Ví dụ: refresh token có hạn 7 ngày
                await _userManager.UpdateAsync(user);

                return new AuthenticationResponse { AccessToken = token, RefreshToken = refreshToken };
            }
            catch (FirebaseAuthException ex)
            {
                return new AuthenticationResponse { Message = GmailLoginFail }; ;
            }
        }

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
            

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiration <= DateTime.Now)
            {
                return new AuthenticationResponse { Message = "Invalid refresh token or token has expired" };
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
           
            return new AuthenticationResponse { AccessToken = newAccessToken, RefreshToken = newRefreshToken };
        }



        public async Task<string> GetUserIdByEmailAsync(string email)
        {
           var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return notExistAcc;
             string uid = user.Id.ToString();
            return uid;
        }

        public async Task<ConfirmEmailResponse> SignUpAsync(SignUpModel model)
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
                    return new ConfirmEmailResponse{ Message=claim.Description };
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
           SendEmailConfirmEmail(createdUser!.Email!, encodedToken);

            return new ConfirmEmailResponse { Email = createdUser.Email, ConfirmToken = encodedToken };

        }

        public async Task<ConfirmEmailResponse> CreateVipAccount(SignUpModel model)
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
                    return new ConfirmEmailResponse { Message = claim.Description };
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
            SendEmailConfirmEmail(createdUser!.Email!, encodedToken);

            return new ConfirmEmailResponse { Email = createdUser.Email, ConfirmToken = encodedToken };

        }

        public async Task<ConfirmEmailResponse> CreateShopAccount(SignUpModel model)
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
                    return new ConfirmEmailResponse { Message = claim.Description };
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
            SendEmailConfirmEmail(createdUser!.Email!, encodedToken);

            return new ConfirmEmailResponse { Email = createdUser.Email, ConfirmToken = encodedToken };

        }

        public async Task<ConfirmEmailResponse> CreateAdminAccount(SignUpModel model)
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
                    return new ConfirmEmailResponse { Message = claim.Description };
                }
            }
            // role
            if (!await _roleManager.RoleExistsAsync(AppRole.Admin))
            {
                await _roleManager.CreateAsync(new IdentityRole(AppRole.Admin));
            }
            await _userManager.AddToRoleAsync(user, AppRole.Admin);
            var createdUser = await _userManager.FindByEmailAsync(user.Email);
            var emailCode = await _userManager.GenerateEmailConfirmationTokenAsync(createdUser!);
            await _userManager.ConfirmEmailAsync(user, emailCode);
            return new ConfirmEmailResponse { Email = createdUser!.Email, ConfirmToken = emailCode };

        }

        private void SendEmailConfirmEmail(string email, string emailCode)
        {
            string confirmLink = $"http://localhost:3000/confirmemail/?email={email}&code={emailCode}";
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

            
        }

        public async Task<string> ConfirmEmailAsync(ConfirmEmailRequest model)
        {

            if (string.IsNullOrEmpty(model.email) || string.IsNullOrEmpty(model.code)) return noInfor;

            var user = await _userManager.FindByEmailAsync(model.email);
            if (user == null) return notExistAcc ;

            var decodedToken = HttpUtility.UrlDecode(model.code);
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
            string resetLink = $"http://localhost:3000/reset-password/?email={email}&code={evalidToken}";
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
            user.Avatar = model.Avatar;
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

        public async Task<string> RemoveAccountByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return notExistAcc;
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    return  error.Description;
                }
            }
            return Success;
        }

        public async Task<List<MemberDTO>> GetMemberListAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            var members = new List<IdentityUser>();
            foreach (var user in users)
            {
                if(await _userManager.IsInRoleAsync(user, "member")){
                    members.Add(user);
                }
            }


            var membersDTO =  _mapper.Map<List<MemberDTO>>(members);
            return membersDTO;

        }
        public async Task<List<MemberDTO>> GetVipListAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            var members = new List<IdentityUser>();
            foreach (var user in users)
            {
                if (await _userManager.IsInRoleAsync(user, "vip"))
                {
                    members.Add(user);
                }
            }


            var membersDTO = _mapper.Map<List<MemberDTO>>(members);
            return membersDTO;

        }

        public async Task<int> TotalMembersAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            int count = 0;
            foreach (var user in users)
            {
                if (await _userManager.IsInRoleAsync(user, "member"))
                {
                   count++;
                }
            }
            return count;
        }

        public async Task<int> TotalVipsAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            int count = 0;
            foreach (var user in users)
            {
                if (await _userManager.IsInRoleAsync(user, "vip"))
                {
                    count++;
                }
            }
            return count;
        }

       

        public async Task<int> TotalShopAsync()
        {   
            int count = 0;
            var users = await _userManager.Users.ToListAsync();
            var shops = new List<IdentityUser>();
            foreach (var user in users)
            {
                if (await _userManager.IsInRoleAsync(user, "shop"))
                {
                    count++;
                }
            }
            return count;
        }









        //public async Task<bool> CheckLockoutEnabledAsync(ApplicationUser user)
        //{
        //    var result = await _userManager.GetLockoutEnabledAsync(user);
        //    return result;
        //}


    }
}
