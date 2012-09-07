/*
	JCSlide
	A quick and simple slideshow plugin

	by Joseph Chow

	This is a very simple slider plugin.
	Slides will slide upwards.

	You can easily append text to images by assigning the class "text" to
	anything.

	Your slide structure should look something like this

	<div class="show">
	<div class="slides">
		<div class="text">
			(your text here)
		</div>

		<img class="photo" title="testing" src="slides/1.png"/>

	</div>

	<div class="slides">
	<div class="text">
			(your text here)
		</div>

		<img title="texting" src="slides/2.png"/>
	</div>

	<div class="slides">
	<div class="text">
			(your text here)
		</div>

		<img src="slides/3.png"/>
	</div>

</div>


*/

(function($){
$.fn.jcslide= function (options) {
	//default settings
	var defaults = {
		slideTime:'400',
		resetTime:'2000'
	}
	//overriding settings with what you pass in
	var opts = $.extend(defaults,options);

	//we're gonna hide the other images not in the view
	$(this).css("overflow","hidden");



	//loading the image height into a variable
	var h = $('.slides').height();


	//first we need to see how many images there are.
	var panels = $('.slides').length;


	//var slide = 0;
	//this will hold each individual image for easier queuing
	var images = new Array();


	$('.slides').each(function(index){
		//pushing images into array
		images.push(this);


	});




	//start slideshow
		start(0);
/*
	Runs the slideshow.
	After the animation runs, increase the slide number count
	*/
function start(slide){


			$(images[slide]).delay(2000).animate({
				marginTop:-h-20,
				opacity: "0px",

			},defaults.slideTime,function(){

				up(slide);
			});

};

function up(slide){
	slide++;
	if(slide != (panels-1)){
		start(slide);
	}else if(slide == (panels-1)){
		reset();
	}

};



/*
	Resets things to original values.
*/
function reset(){

	setTimeout(function(){
		$('.slides').each(function(){

			$(this).animate({
				marginTop:'0px',
				opacity:1

			});
		});

		start(0);


	},defaults.resetTime);

};


}})(jQuery);

