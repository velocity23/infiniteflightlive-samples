<?php
require_once 'vendor/autoload.php';
if (file_exists(__DIR__."/.env")) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

spl_autoload_register(function($class) {
    require_once __DIR__.'/classes/'.$class.'.php';
});
?>
<!DOCTYPE html>
<html>
<head>
    <title>Infinite Flight Live API - PHP Sample</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.js"></script>
    <script src="script.js"></script>
</head>
<body>
    <div class="container mt-3">
        <h1>Infinite Flight Live API - PHP Sample</h1>
        <hr />

        <h2>How to Use This Sample</h2>
        <p>
            This sample is intended as a hit-the-ground-running way to interact with the Infinite Flight Live API
            in PHP. It uses the <code>InfiniteFlight</code> class to interact with the API, and as per the <a href="#" target="_blank">license</a> 
            you are free to use this in your own projects. You'll need to add your API Key to an ENV Variable called <code>IfLiveKey</code> 
            for this to work. If you don't have direct control over environment variables for your system/host, use a .env file as seen 
            <a href="https://www.freecodecamp.org/news/heres-how-you-can-actually-use-node-environment-variables-8fdf98f53a0a/">here</a>. API 
            Keys can be requested by email to <a href="mailto:hello@infiniteflight.com">hello@infiniteflight.com</a>.
        </p>
        <hr />

        <h2>Sessions</h2>
        <p>
            These are fetched using the <code>/v2/sessions</code> endpoint. Sessions are servers, so this table shows all 
            active public Infinite Flight servers.
        </p>
        <table class="table datatable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Max. Users</th>
                    <th>User Count</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    $sessions = InfiniteFlight::sessions();
                    foreach ($sessions as $s) {
                        echo '<tr><td>';
                        echo $s->name;
                        echo '</td><td>';
                        echo $s->maxUsers;
                        echo '</td><td>';
                        echo $s->userCount;
                        echo '</td></tr>';
                    }
                ?>
            </tbody>
        </table>
        <hr />

        <h2>Flights (Casual Server)</h2>
        <p>
            These are fetched using the <code>/v2/flights</code> endpoint. Information available through this endpoint includes position information, 
            user data, and aircraft data.
        </p>
        <table class="table datatable">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Callsign</th>
                    <th>Altitude</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    $flights = InfiniteFlight::flights("5f3fdc11-35b8-4268-832f-42f1c6539ab9");
                    foreach ($flights as $f) {
                        echo '<tr><td>';
                        echo $f->username == null ? "Anonymous" : $f->username;
                        echo '</td><td>';
                        echo $f->callsign;
                        echo '</td><td>';
                        echo round($f->altitude);
                        echo 'ft</td></tr>';
                    }
                ?>
            </tbody>
        </table>
        <hr />

        <h2>Flight Plans (Casual Server)</h2>
        <p>
            These are fetched using the <code>/v2/flightplans</code> endpoint. Information available through this endpoint is mainly waypoints.
        </p>
        <table class="table datatable">
            <thead>
                <tr>
                    <th>FPL</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    $plans = InfiniteFlight::flightPlans("5f3fdc11-35b8-4268-832f-42f1c6539ab9");
                    foreach ($plans as $fpl) {
                        echo '<tr><td>';
                        echo implode(" ", $fpl->waypoints);
                        echo '</td></tr>';
                    }
                ?>
            </tbody>
        </table>
        <hr />

        <h2>ATC Facilities (IFATC Server)</h2>
        <!-- TODO: Change this to Expert once Server is Updated -->
        <p>
            These are fetched using the <code>/v2/atc</code> endpoint. Information available through this endpoint includes airport information, 
            frequency information, and time data.
        </p>
        <table class="table datatable">
            <thead>
                <tr>
                    <th>Airport</th>
                    <th>Controller</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    $types = ["Ground", "Tower", "Unicom", "Delivery", "Approach", "Departure", "Center", "ATIS", "Aircraft", "Recorded", "Unknown", "Unused"];
                    $facilities = InfiniteFlight::atcFacilities("9316b12f-9449-4c9f-ae04-910ce6e94e43");
                    foreach ($facilities as $f) {
                        echo '<tr><td>';
                        echo $f->airportName == null ? "N/A" : $f->airportName;
                        echo '</td><td>';
                        echo $f->username;
                        echo '</td><td>';
                        echo $types[$f->type];
                        echo '</td></tr>';
                    }
                ?>
            </tbody>
        </table>
        <hr />

        <h2>Grade Table (Random User)</h2>
        <p>
            These are fetched using the <code>/v2/user/grade</code> endpoint. Information available through this endpoint includes detailed grade information, 
            report history, violation history, and other basic statistics.
        </p>
        <?php $table = InfiniteFlight::gradeTable($flights[0]->userId); ?>
        <table class="table">
            <tr>
                <th>Username</th>
                <td><?= $table->discourseUsername == null ? "N/A" : $table->discourseUsername ?></td>
            </tr>
            <tr>
                <th>VO</th>
                <td><?= $table->virtualOrganization == null ? "N/A" : $table->virtualOrganization ?></td>
            </tr>
            <tr>
                <th># Violations</th>
                <td><?= count($table->pilotStats->violations) ?></td>
            </tr>
            <tr>
                <th># Reports</th>
                <td><?= count($table->pilotStats->reports) ?></td>
            </tr>
            <tr>
                <th># ATC Operations</th>
                <td><?= $table->pilotStats->atcOperations ?></td>
            </tr>
            <tr>
                <th>Grade</th>
                <td><?= $table->pilotStats->gradeDetails->grades[$table->pilotStats->gradeDetails->gradeIndex]->name ?></td>
            </tr>
        </table>
    </div>
    <footer class="bg-dark text-light text-center p-3 mt-3">
        This sample was made by <a href="https://github.com/Velocity23">Kai Malcolm</a> for <a href="https://infiniteflight.com">Infinite Flight</a>. This sample code is
        released under the {{TODO}} license and is available on GitHub <a href="#">here</a>.
    </footer>
</body>
</html>