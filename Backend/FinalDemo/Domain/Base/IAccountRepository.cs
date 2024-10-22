using Domain.Authentication;
using Domain.Models;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Base
{
    public interface IAccountRepository
    {
        Task<string> SignInAsync(SignInModel model);
        Task<string> GetUserIdByEmailAsync(string email);
        Task<string> SignUpAsync(SignUpModel model); 


        Task<string> CreateShopAccount(SignUpModel model); 
        Task<string> CreateVipAccount(SignUpModel model);
        Task<string> CreateAdminAccount(SignUpModel model);

        Task<string> RequestPasswordResetAsync(string email);
        Task<string> ResetPasswordAsync(string email, string token, NewPasswordModel model);
        Task<string> ChangePasswordAsync(string userId,ChangePasswordModel model);
        Task<string> ConfirmEmailAsync(string email, string code);
        Task<string> UpdateAccountDetailAsync(string userId, AccountDetailModel model);
        Task<string> ChangeRoleToVipAsync(string userId);

        Task<string> LockoutEnabledAsync(string userId);
        Task<string> LockoutDisabledAsync(string userId);
        //public Task<bool> CheckLockoutEnabledAsync(ApplicationUser user);

        Task<ApplicationUser> GetAccountByUserIdAsync(string id);
       
    }
}
