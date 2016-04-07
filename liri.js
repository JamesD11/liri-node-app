//pushed to github w/o mods cannot figure out git ignore. 
//mods used were npm request twitter spotify debug

var fs = require('fs');
//require the keys from twitter
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
//cut first two arguments off leaving an array "input" with two arguements
var input = process.argv.slice(2);

//switch statement based on input[0]
switch(input[0]){
    case "my-tweets"://if input[0] = my-tweets call twitter() function
        twitter();
        break;
    case "do-what-it-says":
        noEntry();
        break;
    case "spotify-this-song":
        if(input[1]){
        	spotify();
        }else{
        	input[1]= "What's my age again";
        	spotify();
        }
        break;
    case "movie-this":
        if(input[1]){
        	request();
        }else{
        	input[1]= "Mr. Nobdy";
        	request();
        }
        break;
}

function twitter(){
	//trying to call twitter based on npm and twitter docs
	    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

	    client.get("count = 20", function(error, tweets, response){
  		if(error) throw error;
  		console.log(tweets);  // Last 20. 
  		console.log(response);  // Raw response object. 
});

}

​function noEntry(){
	fs.readFile("random.txt" , 'utf-8', function(err,data){
		if(err){
			return console.log(err);
		}
		//I think the hw wants me to read the txt file and use that to call spotify
		//Read the file, split it on "," resulting in a two part array
		//take each part and assign it to the input array 
	var result= data.split(",");
	result[0] = input[0];
	result[1] = input[1];

});


function request(){
	request("http://www.omdbapi.com/?t=" + input[1] + "&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	var result =  JSON.parse(body);
    	console.log(result.imdbRating);
    	console.log(result.title);
    	console.log(results.tomatoes);
    	console.log(result.plot);
  }
 
})


function spotify(){
	
 spotify.search({ type: "track", query: input[1] }, function(err, data) {
   if ( err ) {
       console.log("Error: " + err);
       return;  
   }
   else{
   var songInfo = data.tracks.items[0];
   console.log("artist: ", songInfo.artists[0].name);
   console.log("name: ", songInfo.name);
   console.log("album: ", songInfo.album.name);
   console.log("link: ", songInfo.preview_url);
   
   };
 });

 
