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


        // Account tools
        public Task<IdentityResult> SignUpAsync(SignUpModel model);
        public Task<IdentityResult> CreateShopAccount(SignUpModel model);
        public Task<IdentityResult> CreateAdminAccount(SignUpModel model);
        public Task<IdentityResult> CreateVipAccount(SignUpModel model);
        public Task<string> SignInAsync(SignInModel model);
        public Task<string> ChangePasswordAsync(string userId,ChangePasswordModel model);
        public Task<string> UpdateAccountDetailAsync(string userId, AccountDetailModel model);
        public Task<string> ChangeRoleToVipAsync(string userId);
        public Task<string> LockoutEnabled(string userId);
        public Task<string> LockoutDisabled(string userId);
        public Task<bool> CheckLockoutEnabledAsync(ApplicationUser user);

        // Account Data
        //public Task<IdentityResult>


    }
}
