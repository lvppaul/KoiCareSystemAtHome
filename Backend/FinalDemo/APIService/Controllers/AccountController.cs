using Domain.Authentication;
using Domain.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        [HttpPost("CreateMemberAccount")]
        public async Task<IActionResult> SignUp(SignUpModel model)
        {
            var result = await _accountRepository.SignUpAsync(model);
            if (result.Succeeded)
            {
                return StatusCode(200, "Create Account Successfully");
            }
            return StatusCode(400, "UserName or Password are not valid");
        }
        [HttpPost("CreateVipAccount")]
        public async Task<IActionResult> SignUpVip(SignUpModel model)
        {
            var result = await _accountRepository.CreateVipAccount(model);
            if (result.Succeeded)
            {
                return StatusCode(200, "Create Account Successfully");
            }
            return StatusCode(400, "UserName or Password are not valid");
        }
        [HttpPost("CreateShopAccount")]
        public async Task<IActionResult> SignUpShop(SignUpModel model)
        {
            var result = await _accountRepository.CreateShopAccount(model);
            if (result.Succeeded)
            {
                return StatusCode(200, "Create Account Successfully");
            }
            return StatusCode(400, "UserName or Password are not valid");
        }
        [HttpPost("CreateAdminAccount")]
        public async Task<IActionResult> SignUpAdmin(SignUpModel model)
        {
            var result = await _accountRepository.CreateAdminAccount(model);
            if (result.Succeeded)
            {
                return StatusCode(200, "Create Account Successfully");
            }
            return StatusCode(400, "UserName or Password are not valid");
        }
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInModel model)
        {
            var result = await _accountRepository.SignInAsync(model);
            if (string.IsNullOrEmpty(result))
            {
                return StatusCode(401, "Your UserName or Password are not correct !");
            }
            return Ok(result);
        }
    }
}
