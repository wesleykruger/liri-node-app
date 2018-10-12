#LiriBot#
This is a simple Node.js console application designed to interface with the OMDB, Spotify, and BandsInTown web APIs. 
Which API is accessed is determined by keyword.

##Getting Started
You must have Nodejs installed on your machine for this project to work. On Windows machines, you should also have a Bash for working with Node.
There are also several npm package dependencies on the project.

##Running the project
The program accepts 4 commands: 
1) movie-this
2) concert-this
3) spotify-this-song
4) do-what-it-says

The first three of these commands with the movie, artist, or song that you would like information about. For example:
1) movie-this 'Star Wars'
2) concert-this 'Fall Out Boy'
3) spotify-this-song 'In My Feelings'

If multiple songs are returned by the spotify-this-song command, you will be prompted to select from a list of results.
If no movie or song is selected, a default song will be automatically inferred.

Created by Wes Kruger
