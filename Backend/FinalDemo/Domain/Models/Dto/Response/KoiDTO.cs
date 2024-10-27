namespace Domain.Models.Dto.Response
{
    public class KoiDTO
    {
        public int KoiId { get; set; }

        public string UserId { get; set; }

        public int PondId { get; set; }

        public int Age { get; set; }

        public string Name { get; set; }

        public string Sex { get; set; }

        public string Variety { get; set; }

        public string Physique { get; set; }

        public string Note { get; set; }

        public string Origin { get; set; }

        public int Length { get; set; }

        public float Weight { get; set; }

        public string Color { get; set; }

        public bool Status { get; set; }

        public string? Thumbnail { get; set; }

        public DateTime CreateAt { get; set; } = DateTime.Now;

        public List<KoiImageDTO>? Images { get; set; } = new List<KoiImageDTO>();

        public List<KoiRemindDTO>? Reminds { get; set; }

        public List<KoiRecordDTO>? Records { get; set; }

    }
}
