using Newtonsoft.Json;
using System;

namespace InfiniteFlightLiveClient.Types
{
    public class ViolationEntry
    {
        [JsonProperty("type")]
        public double Type { get; set; }
        
        [JsonProperty("date")]
        public DateTimeOffset Date { get; set; }
    }
}
