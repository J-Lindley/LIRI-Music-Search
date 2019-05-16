//requiring dotenv
require("dotenv").config();

//requiring moment
var moment = require("moment");

//requiring fs
var fs = require("fs");

//adding keys as a variable
var keys = require("./keys.js");

// Include the axios npm package 
var axios = require("axios");

// look at node-spotify-api

//requiring spotify
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);



var action = process.argv[2]
var songName = process.argv[3]
var bandName = process.argv[3]
var input = process.argv.splice(3).join(" ")


if (action === "movie-this") {

  movieThis(input)

} else if (action === "spotify-this-song") {

  spotifyThis(input)

} else if (action === "concert-this") {

  concertThis(input)
}

function concertThis(input) {
  var input = input.split(" ").join("%20")
  var bandsUrlStart = "https://rest.bandsintown.com/artists/"
  var bandsUrlEnd = "/events?app_id=codingbootcamp"
  var bandsUrl = bandsUrlStart + input + bandsUrlEnd

  axios.get(bandsUrl).then(
    function (response) {
      //console.log(response)
      for (let i = 0; i < response.data.length; i++) {
        console.log("Name of Venue: " + response.data[i].venue.name);
        console.log("Venue location: " + response.data[i].venue.city);
        console.log("Date of show: " + response.data[i].datetime);
      }

    }
  )

}



function movieThis(movieQuery) {
  var movieQuery = input || "mr nobody"
  var axiosUrlStart = "http://www.omdbapi.com/?t="
  var axiosUrlEnd = "&y=&plot=short&apikey=trilogy"
  var axiosUrl = axiosUrlStart + movieQuery + axiosUrlEnd

  axios.get(axiosUrl).then(
    function (response) {
      console.log("The searched movie titls is: " + response.data.Title);
      console.log("It came out in : " + response.data.Year);
      console.log("The movie's IMDB rating is: " + response.data.imdbRating);

      //not sure how to get the rotten tomatoes rating yet
      console.log("The movie's Rotten Tomatoes rating is: " + "figuring this out");
      console.log("The movie produced in : " + response.data.Country);
      console.log("The movie is in: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("The movie stars: " + response.data.Actors);
    }
  );
}
function spotifyThis(title) {
  spotify.search({ type: 'track', query: input || "the sign" }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      if (data.tracks.items.length > 0) {
        console.log("Artists: ", data.tracks.items[0].album.artists[0].name)
        console.log("Album: ", data.tracks.items[0].album.name)
        console.log("Song title: ", data.tracks.items[0].name)
        console.log("Preview link ", data.tracks.items[0].preview_url)
      } else {
        console.log("Sorry we can't find that song, please try again.")
      }
    }


  });
};



