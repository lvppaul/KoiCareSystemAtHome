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
       
        public string? Sex { get; set; } 
       
        public string? Street { get; set; } 
        
        public string? District { get; set; } 
        
        public string? City { get; set; } 
        
        public string? Country { get; set; } 
       
        public string? PhoneNumber { get; set; } 
        
        public string? Avatar{ get; set; } 

    }
}
