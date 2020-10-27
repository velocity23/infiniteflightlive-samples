<?php
define("IFLIVEKEY", $_ENV["IfLiveKey"]);

class InfiniteFlight {
    /**
     * Your Infinite Flight Live API Key
     * 
     * @var string
     */
    private static $APIKEY = IFLIVEKEY;

    /**
     * The Base URL for the API
     * 
     * @var string
     */
    private static $BASE = "https://api.infiniteflight.com/public/v2/";

    /**
     * Associative Array of All Groups IDs and Names
     * 
     * @var array 
     */
    public static $groups = [
        "DF0F6341-5F6A-40EF-8B73-087A0EC255B5" => "IFATC",
        "8C93A113-0C6C-491F-926D-1361E43A5833" => "Moderators",
        "D07AFAD8-79DF-4363-B1C7-A5A1DDE6E3C8" => "Staff"
    ];

    /**
     * @var array
     */
    public static $atcranks = ["Observer", "Trainee", "Apprentice", "Specialist", "Officer", "Supervisor", "Recruiter", "Manager"];

    /**
     * Retrieve Active Sessions (servers) in Infinite Flight
     * 
     * @return array
     */
    public static function sessions()
    {
        $curl = new Curl;
        $req = $curl->get(self::$BASE."/sessions", ["apikey" => self::$APIKEY]);
        
        $data = json_decode($req->body);
        if ($data->errorCode != 0) {
            throw new Exception("Invalid Response Code. Expected 0, received {$data->errorCode}");
        }

        return $data->result;
    }

    /**
     * Retreive a List of All Flights for a Session
     * 
     * @param string $sessionid Session ID
     * @return array
     */
    public static function flights($sessionid)
    {
        $sessionid = urlencode($sessionid);
        
        $curl = new Curl;
        $req = $curl->get(self::$BASE."/flights/{$sessionid}", ["apikey" => self::$APIKEY]);

        $data = json_decode($req->body);
        if ($data->errorCode != 0) {
            throw new Exception("Invalid Response Code. Expected 0, received {$data->errorCode}");
        }

        return $data->result;
    }

    /**
     * Retrieve Active Flight Plans for a Session
     * 
     * @param string $sessionid Session ID
     * @return array
     */
    public static function flightPlans($sessionid)
    {
        $sessionid = urlencode($sessionid);

        $curl = new Curl;
        $req = $curl->get(self::$BASE."/flightplans/{$sessionid}", ["apikey" => self::$APIKEY]);

        $data = json_decode($req->body);
        if ($data->errorCode != 0) {
            throw new Exception("Invalid Response Code. Expected 0, received {$data->errorCode}");
        }

        return $data->result;
    }

    /**
     * Retrieve Active Air Traffic Control Frequencies for a Session
     * 
     * @param string $sessionid Session ID
     * @return array
     */
    public static function atcFacilities($sessionid)
    {
        $sessionid = urlencode($sessionid);

        $curl = new Curl;
        $req = $curl->get(self::$BASE."/atc/{$sessionid}", ["apikey" => self::$APIKEY]);

        $data = json_decode($req->body);
        if ($data->errorCode != 0) {
            throw new Exception("Invalid Response Code. Expected 0, received {$data->errorCode}");
        }

        return $data->result;
    }

    /**
     * Retrieve the Grade Table for a Given User
     * 
     * @param string $userid User ID
     * @return array
     */
    public static function gradeTable($userid)
    {
        $userid = urlencode($userid);

        $curl = new Curl;
        $req = $curl->get(self::$BASE."/user/grade/{$userid}", ["apikey" => self::$APIKEY]);

        $data = json_decode($req->body);
        if ($data->errorCode != 0) {
            throw new Exception("Invalid Response Code. Expected 0, received {$data->errorCode}");
        }

        return $data->result;
    }

    /**
     * Retrieve User Statistics for Multiple Users
     * 
     * @param array $ids Array of User IDs
     * @param array $hashes Array of User Hashes
     * @param array $names Array of IFC Usernames
     * @return array
     */
    public static function userStats($ids = [], $hashes = [], $names = [])
    {
        $url = self::$BASE . "/user/stats?apikey=" . self::$APIKEY;
        $data = array(
            "userIds" => $users,
            "userHashes" => $hashes,
            "discourseNames" => $names
        );

        $options = array(
            'http' => array(
              'method'  => 'POST',
              'content' => json_encode($data),
              'header'=>  "Content-Type: application/json\r\n" .
                          "Accept: application/json\r\n"
              )
          );
          
          $context  = stream_context_create($options);
          $result = file_get_contents($url, false, $context);
          $data = json_decode($result);

          if ($data->errorCode != 0) {
            throw new Exception("Invalid Response Code. Expected 0, received {$data->errorCode}");
        }

        return $data->result;
    }

    /**
     * Get the Name of a Group from it's ID
     * 
     * @return string
     * @param string $id GUID ID of Group
     */
    public static function groupName($id) 
    {
        return self::$groups[$id];
    }

    /**
     * Get an ATC Rank Name from its integer ID
     * 
     * @return string
     * @param int $id Rank ID
     */
    public static function atcRankName($id)
    {
        return self::$atcranks[$id];
    }
}