using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class BlogCommentUpdateDTO
    {
        public string Content { get; set; } = null!;

        [JsonIgnore]
        public DateTime CreateDate { get; set; } = DateTime.Now;
    }
}
