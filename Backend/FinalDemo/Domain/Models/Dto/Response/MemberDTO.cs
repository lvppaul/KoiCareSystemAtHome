using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class MemberDTO
    {
        public string? Id { get; set; }
        public string? FirstName { get; set; } 
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Street { get; set; }
        public string? District { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public bool? EmailConfirmed { get; set; }
        public bool? LockoutEnabled { get; set; }
    }
}
