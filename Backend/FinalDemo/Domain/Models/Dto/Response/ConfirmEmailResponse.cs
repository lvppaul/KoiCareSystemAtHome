using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class ConfirmEmailResponse
    {
        public string? Email { get; set; }   
        public string? ConfirmToken { get; set; }
        public string? Message { get; set; }

    }
}
