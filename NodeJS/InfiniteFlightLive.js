// Libs
const axios = require('axios');
require('dotenv').config();

// Basic Variables
const APIKEY = process.env.IfLiveKey;
const URLBASE = "https://api.infiniteflight.com/public/v2";

exports.sessions = async () => {
    let result = await axios.get(URLBASE + "/sessions?apikey=" + APIKEY);
    let response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.flights = async (sessionId) => {
    let result = await axios.get(URLBASE + "/flights/" + sessionId + "?apikey=" + APIKEY)
    let response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.flightPlans = async (sessionId) => {
    let result = await axios.get(URLBASE + "/flightplans/" + sessionId + "?apikey=" + APIKEY);
    let response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.atc = async (sessionId) => {
    let result = await axios.get(URLBASE + "/atc/" + sessionId + "?apikey=" + APIKEY);
    let response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.gradeTable = function (userId) => {
    let result = await axios.get(URLBASE + "/user/grade/" + userId + "?apikey=" + APIKEY);
    let response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response.result;
}

exports.userStats = async (userIds) => {
    let result = await axios.post(URLBASE + "/user/stats?apikey=" + APIKEY, {
        userIds: userIds
    });
    let response = result.data;
    if (response.errorCode != 0) {
        await Promise.reject(new Error("Invalid API Response Code. Expected 0, received " + response.errorCode));
    }

    return response;
}