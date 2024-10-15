using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Authentication
{
    public class AccountDetailModel
    {
        [Required]
        public string Sex { get; set; } = null!;
        [Required]
        public string Street { get; set; } = null!;
        [Required]
        public string District { get; set; } = null!;
        [Required]
        public string City { get; set; } = null!;
        [Required]
        public string Country { get; set; } = null!;
        [Required]
        public string PhoneNumber { get; set; } = null!;
       
    }
}
