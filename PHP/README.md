# Infinite Flight Live API - PHP Sample

This sample contains an InfiniteFlight class with functions to interact with the API as well as a single page with an overview of the main endpoints.

## Requirements

- [PHP Composer](https://getcomposer.org/)
- PHP cURL Extension
- Live API Key

## Using this Sample

To use the sample, clone or download this repository then open up the folder containing this sample in your favorite CLI. I recommend [Git Bash](https://gitforwindows.org/) or [Windows PowerShell](https://microsoft.com/PowerShell). To install the required dependencies, run composer.

```bash
$ composer install
```

This will take some time. While you're waiting, create a file called `.env` inside the project folder. In that file, put the following text, replacing `<apikey>` with your API Key.

```
IfLiveKey="<apikey>"
```

Once composer has finished, the sample will become functional. To run the sample, you will need to either upload it to a server running PHP or install [XAMPP](https://www.apachefriends.org/index.html) to run it locally.

## Using the InfiniteFlight Class

This core of this sample is the `InfiniteFlight` class. It provides an interface to interact with the API simply. Please note the `.env` file is only part of the sample. The sample sets the `IfLiveKey` variable from the ENV file, however all the class will try to do is pull it from this Environment Variable. To use the `InfiniteFlight` class without the sample, you will need to set the `IfLiveKey` ENV Variable or input your API Key another way.

I'm working on adding this client to Composer.