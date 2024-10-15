using Domain.Authentication;
using Domain.Base;
using Domain.Helper;
using Domain.Models;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly RoleManager<IdentityRole> _roleManager;

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
            var passwordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (user == null || !passwordValid)
            {
                return string.Empty;
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

        public async Task<IdentityResult> SignUpAsync(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(AppRole.Member))
                {
                    await _roleManager.CreateAsync(new IdentityRole(AppRole.Member));
                }
                await _userManager.AddToRoleAsync(user, AppRole.Member);
            }
            return result;

        }
        public async Task<IdentityResult> CreateShopAccount(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(AppRole.Shop))
                {
                    await _roleManager.CreateAsync(new IdentityRole(AppRole.Shop));
                }
                await _userManager.AddToRoleAsync(user, AppRole.Shop);
            }
            return result;

        }
        public async Task<IdentityResult> CreateAdminAccount(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(AppRole.Admin))
                {
                    await _roleManager.CreateAsync(new IdentityRole(AppRole.Admin));
                }
                await _userManager.AddToRoleAsync(user, AppRole.Admin);
            }
            return result;

        }
        public async Task<IdentityResult> CreateVipAccount(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(AppRole.Vip))
                {
                    await _roleManager.CreateAsync(new IdentityRole(AppRole.Vip));
                }
                await _userManager.AddToRoleAsync(user, AppRole.Vip);
            }
            return result;

        }

        public async Task<string> ChangePasswordAsync(string userId,ChangePasswordModel model)
        {
            string mes = "Change Successfully";
            var user  = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return mes = "Your Account does not exist";
            }
            var result = await _userManager.ChangePasswordAsync(user,model.CurrentPassword,model.NewPassword);
           
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    mes = error.Description;
                }
            }
            return mes;
          
        }

        public async Task<string> UpdateAccountDetailAsync(string userId, AccountDetailModel model)
        {
            string mes = "Successfully";
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
               return  mes = "Your Account does not exist";
            }
           
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
                    return mes = error.Description;
                }
            }
            return mes;
           
        }

        public async Task<string> ChangeRoleToVipAsync(string userId)
        {
            string mes = "Successfully";
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) {
                return mes = "Your Account does not exist";
            }
            var removeResult = await _userManager.RemoveFromRoleAsync(user, AppRole.Member);
            if (!removeResult.Succeeded)
            {
                foreach(var error in removeResult.Errors)
                {
                    return mes = error.Description;
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
                    return mes = error.Description;
                }
            }
            return mes;
        }

        public async Task<string> LockoutEnabled(string userId)
        {
            string mes = "This a ccount is locked already";
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return mes = "Your Account does not exist";
            }
            var check = await CheckLockoutEnabledAsync(user);
            if (check)
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
            var check = await CheckLockoutEnabledAsync(user);
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

        public async Task<bool> CheckLockoutEnabledAsync(ApplicationUser user)
        {
            var result = await _userManager.GetLockoutEnabledAsync(user);
            return result;
        }
    }
}
