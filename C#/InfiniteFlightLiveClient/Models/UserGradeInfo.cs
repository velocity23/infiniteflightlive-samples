using Newtonsoft.Json;
using System;
using System.Linq;

namespace IfLiveCsharp.InfiniteFlightLiveClient
{
    public class UserGradeInfo
    {
        [JsonProperty("userId")]
        public Guid UserId { get; set; }
        [JsonProperty("virtualOrganization")]
        public string VirtualOrganization { get; set; }
        [JsonProperty("discourseUsername")]
        public string DiscourseUsername { get; set; }
        [JsonProperty("groups")]
        public Guid[] Groups { get; set; }
        [JsonProperty("pilotStats")]
        public GradeInfo PilotStats { get; set; }
        public string[] GroupNames
        {
            get => InfiniteFlightLive.Groups.Where(g => Groups.Contains(g.Id)).Select(g => g.Name).ToArray();
        }
    }
}
