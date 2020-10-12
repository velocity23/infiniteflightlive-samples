using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InfiniteFlightLiveClient;
using InfiniteFlightLiveClient.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace IfLiveCsharp.Pages
{
    public class IndexModel : PageModel
    {
        public List<SessionInfo> Sessions { get; set; }
        public List<FlightEntry> Flights { get; set; }
        public List<FlightPlanEntry> FlightPlans { get; set; }
        public List<AtcEntry> AtcFacilities { get; set; }
        public new UserGradeInfo User { get; set; }

        public async Task<ActionResult> OnGetAsync()
        {
            Sessions = await Client.GetSessions();
            Flights = await Client.GetFlights(Sessions.FirstOrDefault().Id);
            FlightPlans = await Client.GetFlightPlans(Sessions.FirstOrDefault().Id);
            AtcFacilities = await Client.GetAtcFacilities(new Guid("9316b12f-9449-4c9f-ae04-910ce6e94e43")); // TODO: Change to ES once updated
            User = await Client.GetUserGrade(Flights.FirstOrDefault().UserId);
            return Page();
        }
    }
}
