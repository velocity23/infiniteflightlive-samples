using Newtonsoft.Json;

namespace IfLiveCsharp.InfiniteFlightLiveClient
{
    public class GradeInfo
    {
        [JsonProperty("gradeDetails")]
        public GradeConfiguration GradeDetails { get; set; }
        
        [JsonProperty("reports")]
        public ReportEntry[] Reports { get; set; }

        [JsonProperty("violations")]
        public ViolationEntry[] Violations { get; set; }
        
        [JsonProperty("totalXP")]
        public int TotalXp { get; set; }
        
        [JsonProperty("atcOperations")]
        public int AtcOperations { get; set; }
        
        [JsonProperty("atcRank")]
        public AtcRank? AtcRank { get; set; }
    }
}
