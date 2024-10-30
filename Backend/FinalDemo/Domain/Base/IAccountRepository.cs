using Domain.Authentication;
using Domain.Models;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Entity;
using KCSAH.APIServer.Dto;
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
        Task<AuthenticationResponse> SignInAsync(SignInModel model);
        Task<string> GetUserIdByEmailAsync(string email);
        Task<ConfirmEmailResponse> SignUpAsync(SignUpModel model);
        Task<AuthenticationResponse> RefreshTokenAsync(string refreshToken);

        Task<ConfirmEmailResponse> CreateShopAccount(SignUpModel model); 
        Task<ConfirmEmailResponse> CreateVipAccount(SignUpModel model);
        Task<ConfirmEmailResponse> CreateAdminAccount(SignUpModel model);

        Task<string> RequestPasswordResetAsync(string email);
        Task<string> ResetPasswordAsync(string email, string token, NewPasswordModel model);
        Task<string> ChangePasswordAsync(string userId,ChangePasswordModel model);
        Task<string> ConfirmEmailAsync(ConfirmEmailRequest model);
        Task<string> UpdateAccountDetailAsync(string userId, AccountDetailModel model);
        Task<string> ChangeRoleToVipAsync(string userId);

        Task<string> LockoutEnabledAsync(string userId);
        Task<string> LockoutDisabledAsync(string userId);


        //public Task<bool> CheckLockoutEnabledAsync(ApplicationUser user);

        Task<ApplicationUser> GetAccountByUserIdAsync(string id);
        Task<string> RemoveAccountByIdAsync(string userId);

        Task<AuthenticationResponse> GmailSignIn(TokenRequest firebaseToken);

        Task<List<MemberDTO>> GetMemberListAsync();
        Task<List<MemberDTO>> GetVipListAsync();
    

        
        Task<int> TotalMembersAsync();
        Task<int> TotalVipsAsync();
        Task<int> TotalShopAsync();
    }
}
