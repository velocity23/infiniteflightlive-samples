using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace InfiniteFlightLiveClient.Types
{
    public class AtcEntry
    {
        [JsonProperty("frequencyId")]
        public Guid FrequencyId { get; set; }
        [JsonProperty("userId")]
        public Guid UserId { get; set; }
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("virtualOrganization")]
        public string VirtualOrganization { get; set; }
        [JsonProperty("airportName")]
        public string AirportName { get; set; }
        [JsonProperty("type")]
        public FrequencyType Type { get; set; }
        [JsonProperty("latitude")]
        public double Latitude { get; set; }
        [JsonProperty("longitude")]
        public double Longitude { get; set; }
        public DateTimeOffset StartTime { get; set; }

        public async Task<UserStats> GetUser()
        {
            Guid[] ids = { UserId };
            return (await Client.GetUserStatsAsync(ids)).FirstOrDefault();
        }
    }

    public enum FrequencyType
    {
        Ground,
        Tower,
        Unicom,
        Clearance,
        Approach,
        Departure,
        Center,
        ATIS,
        Aircraft,
        Recorded,
        Unknown,
        Unused
    }
}
