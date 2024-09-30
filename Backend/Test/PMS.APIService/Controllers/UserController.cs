using Microsoft.AspNetCore.Mvc;
using PMS.Repository;
using PMS.Repository.Models;

namespace PMS.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        public UserController (UnitOfWork unitOfWork) {
        _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers() {
            
                return await _unitOfWork.UserRepository.GetAllAsync();
            } 

    }
}
