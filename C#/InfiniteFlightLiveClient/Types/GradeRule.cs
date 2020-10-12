using Newtonsoft.Json;

namespace InfiniteFlightLiveClient.Types
{
    public class GradeRule
    {
        [JsonProperty("ruleIndex")]
        public int RuleIndex { get; set; }
        
        [JsonProperty("referenceValue")]
        public double ReferenceValue { get; set; }
        
        [JsonProperty("userValue")]
        public double UserValue { get; set; }
        
        [JsonProperty("state")]
        public RulePassState State { get; set; }
            
        [JsonProperty("userValueString")]
        public string UserValueString { get; set; }
        
        [JsonProperty("referenceValueString")]
        public string ReferenceValueString { get; set; }
        
        [JsonProperty("definition")]
        public GradeRuleDefinition Definition { get; set; }
        
        public override string ToString()
        {
            return string.Format("{0} - {1} {2} {3} -> {4}", Definition.Name, UserValue, Definition.Operator, ReferenceValue, State);
        }
    }

    public enum RulePassState
    {
        Fail,
        OK,
        Warning
    }
}
