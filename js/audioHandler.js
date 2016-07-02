

AudioHandler = {
	user: "jbcool17",
	url:  "https://api.soundcloud.com/users/jbcool17/tracks?client_id=" + CLIENT_ID, 
	soundcloud: function() {
		SC.initialize({
	    	client_id: CLIENT_ID,
	    	client_secret: CLIENT_SECRET
	  	});

		var data = SC.get('/users/jbcool17/tracks').then(function(data) { console.log(data); });
		return data;
	}
}

$(document).ready(function () {
	
	setTimeout(function (){ AudioHandler.soundcloud()}, 1000)	
	
})

//====================================================================================================================
// AUDIO
//====================================================================================================================

		// Create a new instance of an audio object and adjust some of its properties
		var audio = new Audio(), playing = false;
		// audio.src = "<%= asset_path '052406.mp3' %>";

		// https://soundcloud.com/headphoneactivist/silent-flo
		SC.initialize({
	    client_id: CLIENT_ID,
	    client_secret: CLIENT_SECRET
	  });

		SC.get('/resolve', {
			url: 'https://soundcloud.com/campgroundmusic/camp-ground-to-explode',
			client_id: CLIENT_ID
		}).then(function(track) {
			audio.src = track.stream_url + '?client_id=' + CLIENT_ID;
		});

		audio.controls = true;
		audio.loop = true;
		audio.autoplay = false;
	  audio.crossOrigin = "anonymous";

    $(audio).on('canplay', function() {
    	if(!playing){
	  		initMp3Player();
	  	}
		});

		// Establish all variables that your Analyser will use
		var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

		var frameLooper = function (){
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

		var initMp3Player = function (){
				playing = true;
		    // document.getElementById('audio_box').appendChild(audio);
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
		// frameLooper() animates any style of graphics you wish to the audio frequency
		// Looping at the default frame rate that the browser provides(approx. 60 FPS)