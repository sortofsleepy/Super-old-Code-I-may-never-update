

//object declration
function Gallery(){}


/*-----------------------

	Fetches work thumbs.
	Pass in a jquery selector
	of the anchoring element 
	you want to attache the 
	thumbs to.
--------------------------*/
Gallery.prototype.fetchThumbs = function(anchor){
	


	var container = document.createElement("section");
	container.id = "works";
	
	//setup list for work
	var ul = document.createElement("ul");
	ul.id = "work-list";
	
	
	
	
	$.get('/works.json',function(e){
		$(e).each(function(i,obj){
				var li = document.createElement("li");
				li.className = "work-item "+obj.work.categories;

				//create thumbnails
				var thumb = document.createElement("img");
				thumb.src = obj.work.thumb;

				//create a link so that we can load a specific item
				var link = document.createElement("a");
				link.href = "#/"+obj.work.title;
				
				//create a title
				var title = document.createElement("h1");
				title.className = "work-title";
				
				title.innerHTML = obj.work.title;
					var container = document.getElementById("workTitle");
					container.innerHTML = "Work";
					
				
					$(link).append(thumb)
					$(thumb).load(function(){
						//console.log("image loaded");
						
						$(this).fadeIn("slow");
							$(li).append(title);
							$(li).append(link);

							$(ul).append(li);
				});
		});
		
	});
	
	
	$(container).append(ul);
	$(anchor).append(container);
	

	
};

Gallery.prototype.fetchItem = function(item,fade){
	var gal = new Gallery();
	$.get('/works.json',function(e,found){

		$(e).each(function(i,obj){
		
			//grab current title in the list
			var title = obj.work.title;
			
			if(title === item){
				//.log(obj);
				document.title = item;
				
				
				
			if(fade !== true){
				$("#work").animate({
					bottom:"500px",
					
				},800,function(){
					

					
					
					/*
						Fade out and reposition
					*/
					
					$("#work").fadeOut("fast",function(){
						$("#work").css("bottom","0px");
						$("#work").css("top","1000px");
						
							//create the content for the piece
							var content = document.createElement("div");
							content.innerHTML = obj.work.content;


							//make the media
							var media = document.createElement("div");
							media.id = obj.work.title+"media";
							media.className = "media";
							media.innerHTML = obj.work.media;

							$("#works-container").append(content);
							$("#works-container").append(media);
						
					});
					
					
						$("#work").fadeIn("fast",function(){
									//now animate back upwards
									$("#work").animate({
										top:"0px",

									},1200,"swing");
										var container = document.getElementById("workTitle");
										container.innerHTML = item;
										
						});
					
				});
			}else{
				$("#work").fadeOut("slow",function(){
					
						//create the content for the piece
						var content = document.createElement("div");
						content.innerHTML = obj.work.content;


						//make the media
						var media = document.createElement("div");
						media.id = obj.work.title+"media";
						media.className = "media";
						media.innerHTML = obj.work.media;

						$("#works-container").append(content);
						$("#works-container").append(media);
						var container = document.getElementById("workTitle");
						container.innerHTML = item;
				});
			
			
			/*
				All extra javascript that needs to 
				be initiated should be done here
			*/
			$(".photos").fancybox();
			//$("#slider2").nivoSlider();
			
			
			
			//build the share bar
			//gal.buildShareBar();
		
			$("#work").fadeIn("slow");
				
			}//end fade test
				
				
			
			}
			
		
			
		});
	});

	
};



/*----------------------

	Utility

-----------------------*/

/*
 * setup requestAnimationFrame
 */
window.requestAnimationFrame = (function(){
	return  window.requestAnimationFrame       || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	window.msRequestAnimationFrame     || 
	function(/* function */ callback, /* DOMElement */ element){
		window.setTimeout(callback, 1000 / 60);
	};
})();
