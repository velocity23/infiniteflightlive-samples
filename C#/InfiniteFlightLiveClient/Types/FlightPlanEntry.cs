using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace InfiniteFlightLiveClient.Types
{
    public class FlightPlanEntry
    {
        [JsonProperty("flightPlanId")]
        public Guid FlightPlanId { get; set; }
        [JsonProperty("flightId")]
        public Guid FlightId { get; set; }
        [JsonProperty("waypoints")]
        public string[] Waypoints { get; set; }
        [JsonProperty("lastUpdate")]
        public DateTimeOffset LastUpdate { get; set; }


        /// <summary>
        /// Get the Flight Plan's Flight
        /// </summary>
        /// <param name="sessionId">Session the Flight is on</param>
        /// <returns>Flight for the Flight Plan</returns>
        public async Task<FlightEntry> GetFlight(Guid sessionId)
        {
            var flights = await Client.GetFlightsAsync(sessionId);
            return flights.FirstOrDefault(f => f.FlightId == FlightId);
        }
    }
}
