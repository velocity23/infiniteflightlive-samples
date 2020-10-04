using Newtonsoft.Json;

namespace IfLiveCsharp.InfiniteFlightLiveClient
{
    public class ApiResponse<T>
    {
        [JsonProperty("errorCode")]
        public ResponseCode ErrorCode { get; set; }
        [JsonProperty("result")]
        public T Result { get; set; }
    }

    public enum ResponseCode
    {
        Ok, 
        UserNotFound, 
        MissingRequestParameters, 
        InvalidToken, 
        AuthProviderFailure, 
        AccountAlreadyInUse, 
        ExpiredToken, 
        NetworkError, 
        EndpointError, 
        EndpointNotAuthorized, 
        EndpointTimeout, 
        NotSupported, 
        InvalidInput, 
        AccountSuspended, 
        ServerNotFound
    }
}
