# LiriBot
This is a simple Node.js console application designed to interface with the OMDB, Spotify, and BandsInTown web APIs. 
Which of these APIs is accessed is determined by keyword.

## Getting Started
You must have Nodejs installed on your machine for this project to work. On Windows machines, you should also have a Bash for working with Node.
There are also several npm package dependencies on the project.

## Running the project
The program accepts 4 commands: 
1. movie-this
2. concert-this
3. spotify-this-song
4. do-what-it-says

The first three of these commands with the movie, artist, or song that you would like information about. For example:
1. movie-this 'Superbad'\
![Image of movie-this](https://github.com/wesleykruger/liri-node-app/blob/master/assets/screenshots/movie.PNG)
2. concert-this 'Drake'\
![Image of concert-this](https://github.com/wesleykruger/liri-node-app/blob/master/assets/screenshots/concert.PNG)
3. spotify-this-song 'In My Feelings'\
![Image of spotify-this-song list](https://github.com/wesleykruger/liri-node-app/blob/master/assets/screenshots/spotify%20select.PNG)
![Image of spotify-this-song selection](https://github.com/wesleykruger/liri-node-app/blob/master/assets/screenshots/spotify%20selected.PNG)

If multiple songs are returned by the spotify-this-song command, you will be prompted to select from a list of results.
If no movie or song is selected, a default song will be automatically inferred.

The fourth command that the program will accept is 'do-what-it-says'. This is used to load a command from the attached random.txt file rather than from the console itself. To use it, edit random.txt to hold your command (pictured below), and then run 'node liri do-what-it-says'. This will run the specified command as though it had been entered into the terminal.\
![Image of random.txt](https://github.com/wesleykruger/liri-node-app/blob/master/assets/screenshots/randomTxt.PNG)
![Image of do-what-is-says](https://github.com/wesleykruger/liri-node-app/blob/master/assets/screenshots/doWhatItSays.PNG)

### Project made using:
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Request](https://www.npmjs.com/package/request)

     * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)
   
   * [Chalk](https://www.npmjs.com/package/chalk)
   
   * [Inquirer](https://www.npmjs.com/package/inquirer/v/5.0.1)
   

Created by Wes Kruger
