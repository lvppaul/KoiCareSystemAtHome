using Domain.Authentication;
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
        public Task<IdentityResult> SignUpAsync(SignUpModel model);
        public Task<IdentityResult> CreateShopAccount(SignUpModel model);
        public Task<IdentityResult> CreateAdminAccount(SignUpModel model);
        public Task<IdentityResult> CreateVipAccount(SignUpModel model);
        public Task<string> SignInAsync(SignInModel model);
        
    }
}
