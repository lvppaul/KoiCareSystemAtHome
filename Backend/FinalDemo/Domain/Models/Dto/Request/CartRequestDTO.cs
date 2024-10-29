using Domain.Models.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class CartRequestDTO
    {
        public string UserId { get; set; } = null!;
    }
}
