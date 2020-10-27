// Libs
const axios = require('axios');
require('dotenv').config();

// Basic Variables
const APIKEY = process.env.IfLiveKey;
const URLBASE = "https://api.infiniteflight.com/public/v2";

exports.sessions = async () => {
    const result = await axios.get(URLBASE + "/sessions?apikey=" + APIKEY);
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.flights = async (sessionId) => {
    const result = await axios.get(URLBASE + "/flights/" + sessionId + "?apikey=" + APIKEY)
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.flightPlans = async (sessionId) => {
    const result = await axios.get(URLBASE + "/flightplans/" + sessionId + "?apikey=" + APIKEY);
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.atc = async (sessionId) => {
    const result = await axios.get(URLBASE + "/atc/" + sessionId + "?apikey=" + APIKEY);
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.gradeTable = function (userId) => {
    const result = await axios.get(URLBASE + "/user/grade/" + userId + "?apikey=" + APIKEY);
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.userStats = async (userIds) => {
    const result = await axios.post(URLBASE + "/user/stats?apikey=" + APIKEY, {
        userIds: userIds
    });
    const response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response;
}