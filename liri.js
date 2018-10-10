require("dotenv").config();

let request = require("request");
let keys = require("./keys");
let chalk = require("chalk");
let moment = require("moment");
let Spotify = require("node-spotify-api");
let inquirer = require("inquirer");

let spotify = new Spotify(keys.spotify);

let args = process.argv.slice(2);
let command = args[0];

switch (command) {
    case "movie-this":
        let movie = args[1];
        request("https://www.omdbapi.com/?y=&plot=short&apikey=trilogy&t=" + movie, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(chalk.bgBlue('Title: ' + JSON.parse(body).Title + '\n' + 'Year released: ' + JSON.parse(body).Year + '\n' + 'IMDB Score: ' + JSON.parse(body).imdbRating + '\n' + 'Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value + '\n' +
                    'Country: ' + JSON.parse(body).Country + '\n' + 'Language: ' + JSON.parse(body).Language + '\n' + 'Plot summary: ' + JSON.parse(body).Plot + '\n' + 'Featured Actors: ' + JSON.parse(body).Actors));
            }
        });
        break;
    case "concert-this":
        let artist = args[1];
        request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let showCounter = 0;
                JSON.parse(body).forEach(function (show) {
                    showCounter++;
                    let momentfied = moment(show.datetime).format("MMMM Do YYYY, h:mm:ss a");
                    console.log(stripMargin`
                    |Show ${showCounter}
                    |Venue: ${show.venue.name}
                    |Location: ${show.venue.city}, ${show.venue.region}, ${show.venue.country}
                    |Date: ${momentfied}`);
                });
            }
        });
        break;
    case "spotify-this-song":
        let searchSong;
        if (args[1] != undefined) {
            searchSong = args[1];
        } else {
            searchSong = "This Sign";
        }
        spotify.search({ type: 'track', query: searchSong, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            if (data.tracks.items[1] === undefined) {
                printSongResults(data.tracks.items[0].name, data.tracks.items[0].album.artists[0].name, data.tracks.items[0].album.name, data.tracks.items[0].external_urls.spotify);
            } else {
                class Song {
                    constructor(artist, name, url, album) {
                        this.artist = artist;
                        this.name = name;
                        this.url = url;
                        this.album = album;
                    }
                }
                let songResults = [];
                data.tracks.items.forEach(function (song) {
                    let thisSong = new Song(song.album.artists[0].name, song.name, song.external_urls.spotify,
                        song.album.name);
                    songResults.push({
                        name: thisSong.name + " by " + thisSong.artist + " from the album " + song.album.name,
                        value: thisSong
                    });
                });
                inquirer.prompt([{
                    type: "list",
                    message: "Which song are you looking for?",
                    choices: songResults,
                    name: "returnedSongs"
                }]).then(response => {
                    let selectedSong = response.returnedSongs;
                    printSongResults(selectedSong.name, selectedSong.artist, selectedSong.album, selectedSong.url);
                });
            }
        });
        break;
    default: {
        console.log("Invalid command. Please try again.")
    }
}

function stripMargin(template, ...expressions) {
    let result = template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part;
    });
    return result.replace(/\r?(\n)\s*\|/g, '$1');
}

function printSongResults(name, artist, album, url) {
    console.log(stripMargin`
    |Name: ${name})
    |Artist: ${artist}
    |Album: ${album}
    |URL: ${url}`);
}
