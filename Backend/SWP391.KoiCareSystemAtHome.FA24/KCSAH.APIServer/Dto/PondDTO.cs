using SWP391.KCSAH.Repository.Models;

namespace KCSAH.APIServer.Dto
{
    public class PondDTO
    {
        public string PondId { get; set; }

        public string UserId { get; set; }

        public string Name { get; set; }

        public double Volume { get; set; }

        public int Depth { get; set; }

        public int PumpingCapacity { get; set; }

        public int Drain { get; set; }

        public int Skimmer { get; set; }

        public string? Note { get; set; }

    }
}
