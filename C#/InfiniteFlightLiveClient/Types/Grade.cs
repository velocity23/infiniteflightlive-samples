using Newtonsoft.Json;

namespace InfiniteFlightLiveClient.Types
{
    public class Grade
    {
        [JsonProperty("rules")]
        public GradeRule[] Rules { get; set; }
        [JsonProperty("index")]
        public int Index { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("state")]
        public RulePassState State { get; set; }
        
        public override string ToString()
        {
            return string.Format("{0}: {1}", Name, State);
        }
    }
}
