function call_it(url) {
	//https://api.soundcloud.com/users/jbcool17/tracks?client_id=CLIENT_ID
	$.ajax({ url: url,
			success: function(result){
				console.log("Calling it");
				console.log(result);
			}});
}


// SC.initialize({
//   client_id: 'CLIENT_ID'
// });

// var track_url = 'http://soundcloud.com/campgroundmusic/camp-ground-line-out';
// SC.oEmbed(track_url, { auto_play: false }).then(function(oEmbed) {
//   console.log('oEmbed response: ', oEmbed);

//   $('#player').append(oEmbed.html)
// });
// USERS - https://api.soundcloud.com/users/jbcool17?client_id=CLIENT_ID

var a = $.ajax({url: "https://api.soundcloud.com/tracks/96883354.json?client_id=CLIENT_ID",
				success: function(result){
					console.log(result.stream_url)
				}
			})
// var b = a.responseJSON.stream_url


// #######################################################
// AUDIO API
// #######################################################

var context = new AudioContext(),
audio = new Audio(),
source,
// `stream_url` you'd get from 
// requesting http://api.soundcloud.com/tracks/6981096.json
url = 'https://api.soundcloud.com/tracks/96883354/stream?client_id=CLIENT_ID';
// audio.autoplay = true;
audio.src = url;
audio.crossOrigin = "anonymous";
source = context.createMediaElementSource(audio);
source.connect(context.destination);
source.mediaElement.play();