using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class FileUploadViewModel
    {
        [Required(ErrorMessage = "Vui lòng chọn một file để tải lên")]
        public IFormFile File { get; set; }
    }
}
