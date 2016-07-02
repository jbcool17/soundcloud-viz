

AudioHandler = {
	initialize: function () {
		SC.initialize({
	    	client_id: CLIENT_ID,
	    	client_secret: CLIENT_SECRET
	  	});
	  	console.log('STATUS CALL: Sound Cloud Initialized!')
	},
	user: "jbcool17",
	url:  "https://api.soundcloud.com/users/jbcool17/tracks?client_id=" + CLIENT_ID,
	createTrackView: function (data) {
		$('#list').append("<li><a href=" + data.stream_url + ">" + 
							data.title +
							"</a> | <button id=" + 
							data.id + ">Play</button></li>");
		console.log("STATUS CALL: View Initialized.")
	}, 
	soundCloudTest: function() {
		SC.get('/users/jbcool17/tracks').then(function(data) { 
			console.log(data[3]);
			AudioHandler.createTrackView(data[3]) 
		});
	
	},
	getScUser: function(user){
		SC.resolve("https://soundcloud.com/" + user).then(function(data) { 
			console.log(data);
			// AudioHandler.createView(data.username) 
		});
	},
	getScTracks: function(user){
		SC.resolve("https://soundcloud.com/" + user + "/tracks").then(function(data) { 
			console.log(data[0]);
			for (var i = 0; i < data.length; i++ ){
				AudioHandler.createTrackView(data[i]) 
			}
			AudioHandler.initializeUiFunctions();
		});
	},
	playStream: function(stream_url){

		var audio = new Audio(), playing = false;
		SC.get('/tracks/' + stream_url).then(function(track) { 
			audio.src = track.stream_url + '?client_id=' + CLIENT_ID;
			 
		});
			

		audio.controls = true;
		audio.loop = false;
		audio.autoplay = true;
	 	audio.crossOrigin = "anonymous";

	    $(audio).on('canplay', function() {
	    	if(!playing){
		  		initMp3Player();
		  	}
		});

		var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

		function frameLooper(){
		    window.requestAnimationFrame(frameLooper);

		    fbc_array = new Uint8Array(analyser.frequencyBinCount);
		    analyser.getByteFrequencyData(fbc_array);

		    for (var i = 0; i < scene.children.length; i++) {
					var sceneChild = scene.children[i];
					if (sceneChild.name === "Cube Particle" ) {

						var scale = Math.pow((fbc_array[i] / 48), 3);
						if ( scale > 0 ) {
							sceneChild.scale.x = sceneChild.scale.y = sceneChild.scale.z = scale;
						} else {
							sceneChild.scale.x = sceneChild.scale.y = sceneChild.scale.z = 1;
						}
					}
				}

				var sum = 0;
				for ( var i = 0; i < fbc_array.length; i++ ) {
				    sum += parseInt( fbc_array[i], 10 ); //don't forget to add the base
				}

				var avg = sum / fbc_array.length;

				if (avg) {
					sceneRotationSpeed = 0.00065 * (avg / 10);
				} else {
					sceneRotationSpeed = 0.00015
				}
		}

		function initMp3Player(){
				playing = true;
		    document.getElementById('audio_box').appendChild(audio);
		    context = new AudioContext(); // AudioContext object instance
		    analyser = context.createAnalyser(); // AnalyserNode method
		    canvas = document.getElementById('analyser_render');
		    ctx = canvas.getContext('2d');
		    // Re-route audio playback into the processing graph of the AudioContext
		    source = context.createMediaElementSource(audio); 
		    source.connect(analyser);
		    analyser.connect(context.destination);
		    // frameLooper();
		}
		initMp3Player();

		console.log('STATUS CALL: playing stream...')

		return audio;
	},
	initializeUiFunctions: function() {
		$('button').on('click', function(e){
			// console.log(e.toElement.id)
			var stream_url = "https://api.soundcloud.com/tracks/" + e.toElement.id + "/stream"
			AudioHandler.playStream(e.toElement.id)
			// console.log(stream_url)
		})
		console.log("STATUS CALL: UI Initialized...")
	}
	
}

$(document).ready(function () {
	
	setTimeout(function (){ 
		AudioHandler.initialize();
		// AudioHandler.soundCloudTest();
		// AudioHandler.getScUser("jbcool17");
		AudioHandler.getScTracks("jbcool17");
		
	}, 1000)	
	
})

//====================================================================================================================
// AUDIO
//====================================================================================================================

		// Create a new instance of an audio object and adjust some of its properties
		// var audio = new Audio(), playing = false;
		// audio.src = "<%= asset_path '052406.mp3' %>";

		// https://soundcloud.com/headphoneactivist/silent-flo
		// SC.initialize({
	 //    	client_id: CLIENT_ID,
	 //    	client_secret: CLIENT_SECRET
	 //  	});

		// SC.get('/resolve', {
		// 	url: 'https://soundcloud.com/campgroundmusic/camp-ground-to-explode',
		// 	client_id: CLIENT_ID
		// }).then(function(track) {
		// 	audio.src = track.stream_url + '?client_id=' + CLIENT_ID;
		// });

		// audio.controls = true;
		// audio.loop = true;
		// audio.autoplay = false;
	 // 	audio.crossOrigin = "anonymous";

	 //    $(audio).on('canplay', function() {
	 //    	if(!playing){
		//   		initMp3Player();
		//   	}
		// });

		// Establish all variables that your Analyser will use
		// var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

		// var frameLooper = function (){
		//     window.requestAnimationFrame(frameLooper);

		//     fbc_array = new Uint8Array(analyser.frequencyBinCount);
		//     analyser.getByteFrequencyData(fbc_array);

		//     for (var i = 0; i < scene.children.length; i++) {
		// 			var sceneChild = scene.children[i];
		// 			if (sceneChild.name === "Cube Particle" ) {

		// 				var scale = Math.pow((fbc_array[i] / 48), 3);
		// 				if ( scale > 0 ) {
		// 					sceneChild.scale.x = sceneChild.scale.y = sceneChild.scale.z = scale;
		// 				} else {
		// 					sceneChild.scale.x = sceneChild.scale.y = sceneChild.scale.z = 1;
		// 				}
		// 			}
		// 		}

		// 		var sum = 0;
		// 		for ( var i = 0; i < fbc_array.length; i++ ) {
		// 		    sum += parseInt( fbc_array[i], 10 ); //don't forget to add the base
		// 		}

		// 		var avg = sum / fbc_array.length;

		// 		if (avg) {
		// 			sceneRotationSpeed = 0.00065 * (avg / 10);
		// 		} else {
		// 			sceneRotationSpeed = 0.00015
		// 		}
		// }

		// var initMp3Player = function (){
		// 		playing = true;
		//     document.getElementById('audio_box').appendChild(audio);
		//     context = new AudioContext(); // AudioContext object instance
		//     analyser = context.createAnalyser(); // AnalyserNode method
		//     canvas = document.getElementById('analyser_render');
		//     ctx = canvas.getContext('2d');
		//     // Re-route audio playback into the processing graph of the AudioContext
		//     source = context.createMediaElementSource(audio); 
		//     source.connect(analyser);
		//     analyser.connect(context.destination);
		//     // frameLooper();
		// }
		// frameLooper() animates any style of graphics you wish to the audio frequency
		// Looping at the default frame rate that the browser provides(approx. 60 FPS)