using Domain.Authentication;
using Domain.Models;
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
        public Task<string> SignInAsync(SignInModel model);
        public Task<string> SignUpAsync(SignUpModel model); 
        public Task<string> CreateShopAccount(SignUpModel model); 
        public Task<string> CreateVipAccount(SignUpModel model);
        public Task<string> CreateAdminAccount(SignUpModel model);
        public Task<string> RequestPasswordReset(string email);
        public Task<string> ResetPassword(string email, string token, NewPasswordModel model);
        public Task<string> ChangePasswordAsync(string userId,ChangePasswordModel model);
        public Task<string> ConfirmEmailAsync(string email, string code);
        public Task<string> UpdateAccountDetailAsync(string userId, AccountDetailModel model);
        public Task<string> ChangeRoleToVipAsync(string userId);
        public Task<string> LockoutEnabled(string userId);
        public Task<string> LockoutDisabled(string userId);
        //public Task<bool> CheckLockoutEnabledAsync(ApplicationUser user);
       

    }
}
