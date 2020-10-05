# Infinite Flight Live API - NodeJS Sample

This sample contains an InfiniteFlightLive module with functions to interact with the API, implemented in a server-side application designed to hide your API Key for when you're calling the API on your frontend site.

## Requirements

- [Node Package Manager (npm)](https://www.npmjs.com/get-npm)
- NodeJS
- Live API Key

## Using this Sample

To use the sample, clone or download this repository then open up the folder containing this sample in your favorite CLI or Visual Studio. I recommend [Git Bash](https://gitforwindows.org/) or [Windows PowerShell](https://microsoft.com/PowerShell). To install the required dependencies, run npm.

```bash
$ npm install
```

This will take some time. While you're waiting, create a file called `.env` inside the project folder. In that file, put the following text, replacing `<apikey>` with your API Key.

```
IfLiveKey="<apikey>"
```

Once composer has finished, the sample will become functional. To run the sample, you can use npm or click start in Visual Studio.

```bash
$ npm start
```

This will open up a development server on port `3000` (or `1337` in Visual Studio). Most endpoints have JSON responses, but a help page is included at /help for your reference.

## Using the InfiniteFlightLive Module

This core of this sample is the `InfiniteFlightLive` module. It provides an interface to interact with the API. Detailed documentation on this is available on the help page (/help). I'm working on adding a version of this client to npm.

