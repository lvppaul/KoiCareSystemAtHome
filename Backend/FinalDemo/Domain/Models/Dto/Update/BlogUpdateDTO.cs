using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class BlogUpdateDTO
    {
        public string? Thumbnail { get; set; }

        [JsonIgnore]
        public DateTime PublishDate { get; set; } = DateTime.Now;

        public string Content { get; set; } = null!;

        public string Title { get; set; } = null!;
    }
}
