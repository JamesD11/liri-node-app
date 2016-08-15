
var fs = require('fs');
//require the keys from twitter
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
//cut first two arguments off leaving an array "input" with two arguements
var input = process.argv.slice(2);


function twitter(){
	//trying to call twitter based on npm and twitter docs
	    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = {screen_name: ' '};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {

    for(var i=0; i < tweets.length; i++){
      console.log(tweets[i].created_at);
      console.log('');
      console.log(tweets[i].text);
    }
  }
});

}


function movie(movieName){

	if (movieName === undefined){
		movieName = 'Mr Nobody';
	}

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

  request(urlHit, function (error, response, body) {

  	if (!error && response.statusCode == 200) {
    	var result =  JSON.parse(body);
    	console.log(result.imdbRating);
    	console.log(result.title);
    	console.log(result.tomatoeURL);
    	console.log(result.plot);
      console.log(result.rated);
      console.log(result.language);
      console.log(result.country);
      console.log(result.plot);
      console.log(result.actors);
      console.log(result.tomatoeRating);
  }

});
}

function getArtist(artist){
	return artist.name;
}

function spotify(songName){

  if (songName === undefined){
		songName = 'Ocean Avenue';
	}

 spotify.search({ type: "track", query: songName }, function(err, data) {
   if ( err ) {
       console.log("Error: " + err);
       return;
   }

   var songInfo = data.tracks.items;

   for (var i = 0; i < songInfo.length; i++) {
   console.log(i);
   console.log("artist: ", songInfo.artist[i].name);
   console.log("name: ", songInfo.name);
   console.log("album: ", songInfo.album.name);
   console.log("link: ", songInfo.preview_url);


  }
});

function doWhatItSays(){
	fs.readFile('random.txt' , 'utf-8', function(err,data){
		if(err){
			return console.log(err);
		}else{
		  console.log(data);
    	var result= data.split(",");

        if (result == 2){
          pick(result[0],result[1]);
        }else if (result == 1){
          pick(result[0]);
        }
}
});
}

function pick(input){
//switch statement based on input
switch(input[0]){
    case "my-tweets":
        twitter();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    case "spotify-this-song":
        	spotify(input[1]);
        break;
    case "movie-this":
        	request(input[1]);
        break;
    default:
     console.log('Not familiar with that');
 }
}
}
