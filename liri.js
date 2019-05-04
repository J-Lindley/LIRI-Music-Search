//requiring dotenv
require("dotenv").config();
var moment = require("moment");
var fs = require("fs");
//adding keys as a variable
var keys = require("./keys.js");
// look at node-spotify-api
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");


var action = process.argv[2]
var title = process.argv[3]
var songName = process.argv[3]

console.log(action)
if (action === "movie-this") {
  console.log("inside if statement")
  movieThis(title)
} else if (action === "spotify-this-song") {

  spotifyThis(songName)

};



function spotifyThis(songName)
spotify.search({ type: 'track', query: title }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }



  function movieThis(movieName) {
    var movieQuery = movieName || "mr nobody"
    console.log(movieQuery)
    var axiosUrlStart = "http://www.omdbapi.com/?t="
    var axiosUrlMiddle = ""
    var axiosUrlEnd = "&y=&plot=short&apikey=trilogy"
    var axiosUrl = axiosUrlStart + movieQuery + axiosUrlEnd

    console.log(axiosUrl)

    axios.get(axiosUrl).then(
      function (response) {
        // console.log(response)
        console.log("The searched movie titls is: " + response.data.Title);
        console.log("It came out in : " + response.data.Year);
        console.log("The movie's IMDB rating is: " + response.data.imdbRating);

        //not sure how to get the rotten tomatoes rating yet
        console.log("The movie's Rotten Tomatoes rating is: " + response.data.rottenRating);
        console.log("The movie produced in : " + response.data.Country);
        console.log("The movie is in: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("The movie stars: " + response.data.Actors);
      }
    );
  }
