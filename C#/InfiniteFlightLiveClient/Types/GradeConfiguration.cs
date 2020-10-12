using Newtonsoft.Json;

namespace InfiniteFlightLiveClient.Types
{
    public class GradeConfiguration
    {
        [JsonProperty("grades")]
        public Grade[] Grades { get; set; }
        
        [JsonProperty("gradeIndex")]
        public int GradeIndex { get; set; }
    }
}
