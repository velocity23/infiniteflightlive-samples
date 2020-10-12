using Newtonsoft.Json;
using System;

namespace InfiniteFlightLiveClient.Types
{
    public class SessionInfo
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("maxUsers")]
        public int MaxUsers { get; set; }
        [JsonProperty("userCount")]
        public int UserCount { get; set; }
        [JsonProperty("type")]
        public SessionType Type { get; set; }
    }

    public enum SessionType
    {
        Unrestricted,
        Restricted
    }
}
