using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class ConfirmEmailRequest
    {
        [Required]
        public string email { get; set; } = null!;
        [Required]
        public string code { get; set; } = null!;

    }
}
