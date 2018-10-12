require("dotenv").config();

let request = require("request");
let keys = require("./keys");
let chalk = require("chalk");
let moment = require("moment");
let Spotify = require("node-spotify-api");
let inquirer = require("inquirer");
let fs = require("fs");

let spotify = new Spotify(keys.spotify);

let args = process.argv.slice(2);
let command = args[0];
let searchItem;
if (args[1] != undefined) {
    searchItem = args[1];
} else {
    searchItem = undefined;
}

executeLiriCommand(command, searchItem);


function executeLiriCommand(command, searchItem) {
    switch (command) {
        case "movie-this":
            let movie;
            if (searchItem === undefined) {
                movie = "Mr. Nobody";
            } else {
                movie = searchItem;
            }
            request("https://www.omdbapi.com/?y=&plot=short&apikey=trilogy&t=" + movie, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let parsed = JSON.parse(body);
                    console.log(chalk.bgBlue('Title: ' + parsed.Title + '\n' + 'Year released: ' + parsed.Year + '\n' + 'IMDB Score: ' + parsed.imdbRating + '\n' + 'Rotten Tomatoes Rating: ' + parsed.Ratings[1].Value + '\n' +
                        'Country: ' + parsed.Country + '\n' + 'Language: ' + parsed.Language + '\n' + 'Plot summary: ' + parsed.Plot + '\n' + 'Featured Actors: ' + parsed.Actors));
                }
            });
            break;
        case "concert-this":
            let artist = searchItem;
            request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let showCounter = 0;
                    if (JSON.parse(body).length < 1) {
                        console.log("No upcoming shows for this artist.");
                    };
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
            if (searchItem === undefined) {
                searchSong = "The Sign";
            } else {
                searchSong = searchItem;
            }
            spotify.search({ type: 'track', query: searchSong, limit: 8 }, function (err, data) {
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
        case "do-what-it-says":
            fs.readFile("random.txt", function (err, data) {
                let command = data.toString();
                let service = command.substr(0, command.indexOf(","));
                let item = command.substr(command.indexOf(",") + 1, command.length - 1);
                executeLiriCommand(service, item);
            });
            break;
        default: {
            console.log("Invalid command. Please try again.");
        }
    }
}

function stripMargin(template, ...expressions) {
    let result = template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part;
    });
    return result.replace(/\r?(\n)\s*\|/g, '$1');
}

function printSongResults(name, artist, album, url) {
    console.log(chalk.bgGreen(stripMargin`
    |Name: ${name}
    |Artist: ${artist}
    |Album: ${album}
    |URL: ${url}`));
}
