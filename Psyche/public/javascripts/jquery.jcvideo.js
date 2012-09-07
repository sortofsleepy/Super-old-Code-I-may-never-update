/*
	JCVideo
	A HTML5 based, jQuery enhanced CSS styleable video player.
	Can support a flash fallback using swfObject
	
	Settings:
		height:
		-height of the movie
		
		width: 
		-width of the movie
		
		autoplay:
		-whether or not movie should be playing
		
		poster: 
		-path to the placeholder image thats shown before the movie 
		
		source:
		-path to the movie
		
		defaultControls:
		-This is to determine whether or not the default browser controls ought to be shown
		Pass in the string "controls" to enable.
				
		swf:
		-path to the swf for flash video fallback
		
		flashVersion: 
		-setting to let swfObject know what version your swf was compiled to.
		
		flashID:'flash-version'
		-ID for the flash container
	
		flashFallBack:false	
		-whether or not the player should fall back to flash.
		
	@author Joseph Chow
*/

(function($){  
$.fn.jcvideo = function (options) {
	//default settings
	var defaults = {
		height:'400',
		width:'400',
		autoplay:false,
		poster:'',
		source:"test.mov",
		defaultControls:"",
		swf:'test.swf',
		flashVersion:'10.0.0',
		flashID:'flash-version',
		flashFallBack:false,
		//externalSource:true,
		//externalSourcePath:'http://www.youtube.com/embed/c_VMzQ7R-QM?hl=en_US'		
	}
	//overriding settings with what you pass in
	var opts = $.extend(defaults,options);

	//setting up video element
	var video = document.createElement('video');
	
	//setting up flash fallback
	var flash = document.createElement('object');
	
	//setting the controls to the width.
	$("#video-controls").css("width",options.width+"px");
	

	

	
	//ie object tag.
	var ie = document.createElement('object');
	
	
	$(flash).appendTo(video);
	$(ie).appendTo(flash);
	
	//setting up param tags for value
	var flashvars = {
	
	};
	
	var params = {
		name:'flash-movie',
		value:defaults.swf
	};
	
	var attributes = {
	
	};
	
	
	$(this).append(video);
	
	if(options){
		//setting attributes of the video container
		video.setAttribute("src",options.source);
		video.setAttribute("height",options.height);
		video.setAttribute("width",options.width);
	
		//setting css id for video tag	
		video.setAttribute("id","video");
	
		flash.setAttribute('id',options.flashID);

		//attributes for object inner
		ie.setAttribute('type','application/x-shockwave-flash');
		ie.setAttribute('data',options.movie);
		ie.setAttribute('width',options.width);
		ie.setAttribute('height',options.height);
		
		//registering with swfObject
		if(defaults.flashFallBack == true){
			swfobject.embedSWF(options.swf,'flash-video', options.height, options.width,options.flashVersion,"expressInstall.swf", flashvars, params, attributes);
		}
		
	
		
		video.setAttribute("poster",defaults.poster);
		$("#seek").attr('value', video.startTime);
	
		$("#seek").attr('min',0);
		$("#seek").attr('step',1);
	/*
		since the idea is to roll with your own controls,
		this is a optional step
	*/

	video.setAttribute("controls",options.controls);
	

	}else{
	
	//setting attributes of the video container
	video.setAttribute("src",defaults.source);
	video.setAttribute("height",defaults.height);
	video.setAttribute("width",defaults.width);
	
	//setting css id for video tag	
	video.setAttribute("id","video");
	
	flash.setAttribute('id',defaults.flashID);

	//attributes for object inner
	ie.setAttribute('type','application/x-shockwave-flash');
	ie.setAttribute('data',defaults.movie);
	ie.setAttribute('width',defaults.width);
	ie.setAttribute('height',defaults.height);
		
	//registering with swfObject
	if(defaults.flashFallBack == true){
		swfobject.embedSWF(defaults.swf,'flash-video', defaults.height, defaults.width,defaults.flashVersion,"expressInstall.swf", flashvars, params, attributes);
	}
	
	
		video.setAttribute("poster",defaults.poster);
	
	
	/*
		since the idea is to roll with your own controls,
		this is a optional step
	*/

		video.setAttribute("controls",defaults.controls);
	
	
	}

/*==========CONTROLS============*/

	//seekbar
	video.durationchange = setupSeek();
	
	function setupSeek(){

		$("#seek").attr('max',video.duration);
		$("#seek").attr('min',video.startTime);

	};
		
	
	//play controls
	$("#play").click(function(){
		video.play();
		video.paused = false;
	

		//after video starts, 
		$("#video-controls").animate({
				opacity:'0px',
		},200);
	
	
		
	$("#video-controls").hover(
	
		function(){
		
			$("#video-controls").animate({
				opacity:'100px',
			},200);
		},
		
	
		function(){
		if(video.paused == true){
			$("#video-controls").animate({
				opacity:'100px',
			},200);
		}	
	}
				
			
		
	);
	
	
	});
	

		
	
	//stop controls
	$("#stop").click(function(){
		video.pause();
		video.paused = true;
		
		if(video.paused = true){
		$("#video-controls").animate({
				opacity:'100px',
		},200);
		}
	});
	
	
	
	//controls volume slider.
	$("#volume").change(function(){
			video.volume = $("#volume").attr('value');
		
	});
	
	//controls scrubbing
	$("#seek").change(function(){
			video.currentTime = $("#seek").attr('value');
		
	});
	
	$(video.currentTime).change(function(){
	
		$("#seek").attr('value',video.currentTime);
	});
	/*
		Handles muting.
		Very simple, just instantly sets the slider
		to zero. Slide it back up to restore volume.
	*/
	$("#mute").click(function(){
	
		$("#volume").attr('value',0);
		video.volume = $("#volume").attr('value');
		
	});



	
	
	

}})(jQuery);


