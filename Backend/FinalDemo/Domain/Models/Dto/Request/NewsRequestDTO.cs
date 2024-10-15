using Domain.Models.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Request
{
    public class NewsRequestDTO
    {

        public string Title { get; set; } = null!;

        [JsonIgnore]
        public DateTime PublishDate { get; set; } = DateTime.Now;
        public string? Thumbnail { get; set; }

        public string Content { get; set; } = null!;

        //public List<NewsImageRequestDTO> NewsImage { get; set; }
    }
}
