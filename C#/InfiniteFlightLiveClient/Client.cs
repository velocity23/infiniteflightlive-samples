using InfiniteFlightLiveClient.Types;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace InfiniteFlightLiveClient
{
    public static class Client
    {
        private static string _apiKey;
        private static readonly string _baseUrl = "https://api.infiniteflight.com/public/v2";
        private static readonly HttpClient _httpClient = new HttpClient();

        public static readonly List<Group> Groups = new List<Group>
        {
            new Group("DF0F6341-5F6A-40EF-8B73-087A0EC255B5", "IFATC"),
            new Group("8C93A113-0C6C-491F-926D-1361E43A5833", "Moderators"),
            new Group("D07AFAD8-79DF-4363-B1C7-A5A1DDE6E3C8", "Staff")
        };

        /// <summary>
        /// Get All Active Public Infinite Flight Servers
        /// </summary>
        /// <returns>SessionInfo Objects of All Active Public Servers</returns>
        public static async Task<List<SessionInfo>> GetSessions()
        {
            var json = await _httpClient.GetStringAsync(_baseUrl + $"/sessions?apikey={_apiKey}");
            var data = JsonConvert.DeserializeObject<ApiResponse<List<SessionInfo>>>(json);
            if (data.ErrorCode != ResponseCode.Ok)
            {
                throw new Exception($"Invalid API Response Code. Expected Ok, received {data.ErrorCode}");
            }

            return data.Result;
        }

        /// <summary>
        /// Get All Flights for a Session
        /// </summary>
        /// <param name="sessionId">Session ID</param>
        /// <returns>The Current Flights for the given Session</returns>
        public static async Task<List<FlightEntry>> GetFlights(Guid sessionId)
        {
            var json = await _httpClient.GetStringAsync(_baseUrl + $"/flights/{sessionId}?apikey={_apiKey}");
            var data = JsonConvert.DeserializeObject<ApiResponse<List<FlightEntry>>>(json);
            if (data.ErrorCode != ResponseCode.Ok)
            {
                throw new Exception($"Invalid API Response Code. Expected Ok, received {data.ErrorCode}");
            }

            return data.Result;
        }

        /// <summary>
        /// Get All Active ATC Facilities for a Session
        /// </summary>
        /// <param name="sessionId">Session ID</param>
        /// <returns>The Active Facilities for the given Session</returns>
        public static async Task<List<AtcEntry>> GetAtcFacilities(Guid sessionId)
        {
            var json = await _httpClient.GetStringAsync(_baseUrl + $"/atc/{sessionId}?apikey={_apiKey}");
            var data = JsonConvert.DeserializeObject<ApiResponse<List<AtcEntry>>>(json);
            if (data.ErrorCode != ResponseCode.Ok)
            {
                throw new Exception($"Invalid API Response Code. Expected Ok, received {data.ErrorCode}");
            }

            return data.Result;
        }

        /// <summary>
        /// Get All FLight Plans for a Session
        /// </summary>
        /// <param name="sessionId">Session ID</param>
        /// <returns>All Existing Flight Plans for Aircraft Currently on the given Session</returns>
        public static async Task<List<FlightPlanEntry>> GetFlightPlans(Guid sessionId)
        {
            var json = await _httpClient.GetStringAsync(_baseUrl + $"/flightplans/{sessionId}?apikey={_apiKey}");
            var data = JsonConvert.DeserializeObject<ApiResponse<List<FlightPlanEntry>>>(json);
            if (data.ErrorCode != ResponseCode.Ok)
            {
                throw new Exception($"Invalid API Response Code. Expected Ok, received {data.ErrorCode}");
            }

            return data.Result;
        }

        /// <summary>
        /// Get a User's Stats and Grade Table
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <returns>The Stats and Grade Table Information for the given User</returns>
        public static async Task<UserGradeInfo> GetUserGrade(Guid userId)
        {
            var json = await _httpClient.GetStringAsync(_baseUrl + $"/user/grade/{userId}?apikey={_apiKey}");
            var data = JsonConvert.DeserializeObject<ApiResponse<UserGradeInfo>>(json);
            if (data.ErrorCode != ResponseCode.Ok)
            {
                throw new Exception($"Invalid API Response Code. Expected Ok, received {data.ErrorCode}");
            }

            return data.Result;
        }

        /// <summary>
        /// Get Stats for One or More Users
        /// </summary>
        /// <param name="userIds">User IDs</param>
        /// <returns>The Users' Stats</returns>
        public static async Task<List<UserStats>> GetUserStats(Guid[] userIds = null, string[] hashes = null, string[] ifcNames = null)
        {
            if (userIds == null && hashes == null && ifcNames == null)
            {
                throw new ArgumentNullException();
            }

            var contentObj = new UserStatsRequest();
            if (userIds != null) contentObj.UserIds = userIds;
            if (hashes != null) contentObj.Hashes = hashes;
            if (ifcNames != null) contentObj.IfcNames = ifcNames;

            var contentJson = JsonConvert.SerializeObject(contentObj);
            var content = new StringContent(contentJson, Encoding.UTF8, "application/json");

            var resJson = await (await _httpClient.PostAsync(_baseUrl + $"/user/stats?apikey={_apiKey}", content)).Content.ReadAsStringAsync();
            var resData = JsonConvert.DeserializeObject<ApiResponse<List<UserStats>>>(resJson);

            if (resData.ErrorCode != ResponseCode.Ok)
            {
                throw new Exception($"Invalid API Response Code. Expected Ok, received {resData.ErrorCode}");
            }

            return resData.Result;
        }

        public static void SetApiKey(string newkey)
        {
            _apiKey = newkey;
        }

        private class UserStatsRequest
        {
            [JsonProperty("userIds")]
            public Guid[] UserIds { get; set; }
            [JsonProperty("userHashes")]
            public string[] Hashes { get; set; }
            [JsonProperty("discourseNames")]
            public string[] IfcNames { get; set; }
        }
    }
}
