// Libs
const axios = require('axios');
require('dotenv').config();

// Basic Variables
const APIKEY = process.env.IfLiveKey;
const URLBASE = 'https://api.infiniteflight.com/public/v2';

/**
 * Retrieve active sessions (servers) in Infinite Flight
 * @returns {{ maxUsers: number; id: string; userCount: number; type: number; }[]} Active Public Servers
 * @see {@link https://infiniteflight.com/guide/developer-reference/live-api/sessions|Documentation}
 */
export async function sessions() {
    const result = await axios.get(`${URLBASE}/sessions?apikey=${APIKEY}`);
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(
            new Error(
                `Invalid API Response Code. Expected 0, received ${response.errorCode}`
            )
        );
    }

    return response.result;
}

/**
 * Retrieve a list of all flights for a session
 * @param {String} sessionId ID of the session returned from the Sessions endpoint
 * @returns {{ username?: string; callsign: string; latitude: number; longitude: number; altitude: number; speed: number; verticalSpeed: number; track: number; lastReport: string; flightId: string; userId: string; aircraftId: string; liveryId:string; heading: number; virtualOrganization?:string; }[]} Flights for the Session
 * @see {@link https://infiniteflight.com/guide/developer-reference/live-api/flights|Documentation}
 */
export async function flights(sessionId) {
    const result = await axios.get(
        `${URLBASE}/flights/${sessionId}?apikey=${APIKEY}`
    );
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(
            new Error(
                `Invalid API Response Code. Expected 0, received ${response.errorCode}`
            )
        );
    }

    return response.result;
}

/**
 * Retrieve the flight plan for a specific active flight
 * @param {string} flightId ID of the flight. The flight must be in an active session and have a filed flight plan.
 * @returns {{ flightPlanItems: { name: string; type: number; children: { flightPlanItems: { name: string; type: number; identifier: string; altitude: number; location: { latitude: number; longitude: number; } }[]; identifier: string; altitude: number; location: { latitude: number; longitude: number; } }[]; flightPlanId: string; flightId: string; waypoints: string[]; lastUpdate: string; }}} Requested Flight Plan
 * @see {@link https://infiniteflight.com/guide/developer-reference/live-api/flight-plan|Documentation}
 */
export async function flightPlan(flightId) {
    const result = await axios.get(
        `${URLBASE}/flights/${flightId}/flightplan?apikey=${APIKEY}`
    );
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(
            new Error(
                `Invalid API Response Code. Expected 0, received ${response.errorCode}`
            )
        );
    }

    return response.result;
}

/**
 * Retrieve active Air Traffic Control frequencies for a session
 * @param {String} sessionId ID of the session returned from the Sessions endpoint
 * @returns {{ frequencyId: string; userId: string; username?: string; virtualOrganization?: string; airportName: string; type: number; latitude: number; longitude: number; startTime: string; }[]} Active ATC Frequencies
 * @see {@link https://infiniteflight.com/guide/developer-reference/live-api/atc|Documentation}
 */
export async function atc(sessionId) {
    const result = await axios.get(
        `${URLBASE}/atc/${sessionId}?apikey=${APIKEY}`
    );
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(
            new Error(
                `Invalid API Response Code. Expected 0, received ${response.errorCode}`
            )
        );
    }

    return response.result;
}

/**
 * Retrieve the full grade table and detailed statistics for a user
 * @param {String} userId ID of the User
 * @returns {{ gradeDetails: { grades: any[]; gradeIndex: number; }; totalXP: number; atcOperations: number; atcRank?: number; userId: string; violationCountByLevel: { level1: number; level2: number; level3: number; }; roles: number[]; virtualOrganization?: string; discourseUsername?: string; errorCode: number; }} Full grade details
 * @see {@link https://infiniteflight.com/guide/developer-reference/live-api/user-grade|Documentation}
 */
export async function gradeTable(userId) {
    const result = await axios.get(
        `${URLBASE}/user/grade/${userId}?apikey=${APIKEY}`
    );
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(
            new Error(
                `Invalid API Response Code. Expected 0, received ${response.errorCode}`
            )
        );
    }

    return response.result;
}

/**
 * Retrieve user statistics for multiple users, including their grade, flight time and username.
 * @param {String[]} userIds An array of user ID strings retrieved from another endpoint
 * @param {String[]} discourseNames An array of IFC Usernames. Not case sensitive.
 * @param {String[]} userHashes An array of user hashes retrieved in-app or from another endpoint. All letters must be upper case.
 * @returns {{ onlineFlights: number; violations: number; xp: number; landingCount: number; flightTime: number; atcOperations: number; atcRank: number; grade: number; hash: string; violationCountByLevel: { level1: number; level2: number; level3: number; }; roles: number[]; userId: string; virtualOrganization?: string; discourseUsername?: string; errorCode: number; }[]}
 * @see {@link https://infiniteflight.com/guide/developer-reference/live-api/user-stats|Documentation}
 */
export async function userStats(
    userIds = [],
    discourseNames = [],
    userHashes = []
) {
    const result = await axios.post(`${URLBASE}/user/stats?apikey=${APIKEY}`, {
        userIds,
        discourseNames,
        userHashes,
    });
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(
            new Error(
                `Invalid API Response Code. Expected 0, received ${response.errorCode}`
            )
        );
    }

    return response;
}

/**
 * Retrieve the flown route of a specific flight with position, altitude, speed and track information at different points in time. Please note, this is currently only supported on the Expert Server and Training Server.
 * @param {String} flightId ID of the flight
 * @returns {{ latitude: number; longitude: number; altitude: number; track: number; groundSpeed: number; date: string; }[]} Flight position reports
 * @see {@link https://infiniteflight.com/guide/developer-reference/live-api/flight-route|Documentation}
 */
export async function flightRoute(flightId) {
    const result = await axios.get(
        `${URLBASE}/flights/${flightId}/route?apikey=${APIKEY}`
    );
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(
            new Error(
                `Invalid API Response Code. Expected 0, received ${response.errorCode}`
            )
        );
    }

    return response.result;
}

/**
 * Retrieve the ATIS for an airport on a specific server if it is active.
 * @param {string} airportIcao ICAO of the airport to get the ATIS for
 * @param {string} sessionId Session (Server) ID of the Live Server
 * @returns {string|null} The ATIS, or `null` if it is not available
 * @see {@link https://infiniteflight.com/guide/developer-reference/live-api/atis|Documentation}
 */
export async function atis(airportIcao, sessionId) {
    const result = await axios.get(
        `${URLBASE}/airport/${airportIcao}/atis/${sessionId}?apikey=${APIKEY}`
    );
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(
            new Error(
                `Invalid API Response Code. Expected 0, received ${response.errorCode}`
            )
        );
    }

    return response.result;
}

/**
 * Retrieve a list of Oceanic Tracks active in Infinite Flight multiplayer sessions.
 * @returns {{ name: string; path: string[]; eastLevels: number[]; westLevels: number[]; type: string; lastSeen: string; }} Active Oceanic Tracks
 * @see {@link https://infiniteflight.com/guide/developer-reference/live-api/oceanic-tracks|Documentation}
 */
export async function tracks() {
    const result = await axios.get(`${URLBASE}/tracks?apikey=${APIKEY}`);
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(
            new Error(
                `Invalid API Response Code. Expected 0, received ${response.errorCode}`
            )
        );
    }

    return response.result;
}
