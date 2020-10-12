using Newtonsoft.Json;

namespace InfiniteFlightLiveClient.Types
{
    public class GradeRuleDefinition
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("property")]
        public string Property { get; set; }
        [JsonProperty("operator")]
        public RuleOperator Operator { get; set; }
        [JsonProperty("period")]
        public double Period { get; set; }
        [JsonProperty("order")]
        public int Order { get; set; }
        [JsonProperty("group")]
        public int Group { get; set; }
    }

    public enum RuleOperator
    {
        GreaterThan,
        LesserThan,
        GreaterThanOrEqual,
        LesserThanOrEqual,
        Equal,
        DifferentThan
    }
}
