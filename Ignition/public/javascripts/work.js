/*
	So categorization works
*/
	var work = new Work();
	

	
$(window).bind("hashchange",function(){
	//clear out the old info
	$("#single").remove();
	

		
		document.title = "Work";
		$("footer").hide();
	work.checkHash();
});



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


$(window).ready(function(){
	

	
	
});


$(document).ready(function(){
	
	$("#category-box ul li").removeClass("selected");
//	requestAnimationFrame(this);
	work.checkHash();
	
});




/*------------------------------------

	Work object.
	Handles loading of projects, etc..
	
	
----------------------------------*/


function Work(){
	this.works;
	this.stat;
};


Work.prototype.returnCategory = function(){
		return "category";
};

Work.prototype.returnWork = function(){
	return "work";
};


Work.prototype.checkHash = function(){

	//some variables we need
	var hash;
	var project;
	
	var work = new Work();
	/*
		get whether or not a hash is present
	*/
	if(location.hash === ""){
		hash = false;
	}else{
		hash = true;
			$("ul li").removeClass("selected");
	    project = location.hash.replace("#!","");
	
	
		
	}
	
	
	//if hash is not blank, check to see if there is a project or category
	if(hash === true){
		if(project !== ""){
			
			//reset thumbnails
			$("#works").remove();
	
			//look for the item to see if it's a project or category
			work.findItem(project);
				
		//	$("#main").fadeIn("slow");
			
		}//end project check
	}else{
		//remove all stale js elements from dom
		$("#single").remove();
		$("#works").remove();
		
		
		//fade in main box
		$("#main").fadeIn("slow");
		
		//load thumbs
		work.fetchThumbs();
	}//end hash check
};

/*
	fetches everything for thumbnail previews
*/
Work.prototype.fetchThumbs = function(filter){
//	console.log(filter);
	//setup the main container for everythin
	var container = document.createElement("section");
	container.id = "works";
	
	//setup list for work
	var ul = document.createElement("ul");
	ul.id = "work-list";

	$.get('/works.json',function(e){
		$(e).each(function(i,obj){
			
			/*
				need to create a new "Work" object so we can utilize the fetch item
				function
			*/
			var w = new Work();
			
	
	
			//if the filter is not set, load everything normally
			if(filter === undefined){
						//console.log("load images");
					//create the li element for each item
					var li = document.createElement("li");
					li.className = "work-item "+obj.work.categories;

					//create thumbnails
					var thumb = document.createElement("img");
					thumb.src = obj.work.thumb;

					//create a link so that we can load a specific item
					var link = document.createElement("a");
					link.href = "#!"+obj.work.title;
					
					//create a title
					var title = document.createElement("h1");
					title.className = "work-title";
					
					title.innerHTML = obj.work.title;
					
					$(link).click(function(){

						//w.fetchItem(obj.work.title);
					});

					$(link).append(thumb)
					$(thumb).load(function(){
						//console.log("image loaded");
						
						$(this).fadeIn("slow");
							$(li).append(title);
							$(li).append(link);

							$(ul).append(li);
				});
				
				
			//otherwise load the specific images.	
			}else if(filter !== undefined){

				if(obj.work.categories === filter){
						
						//remove old selector css
							  var check = location.hash.replace("#!","");

						


						//create the li element for the item
						var li = document.createElement("li");
						li.className = "work-item "+obj.work.categories;

						//create thumbnails
						var thumb = document.createElement("img");
						thumb.src = obj.work.thumb;

						//create a link so that we can load a specific item
						var link = document.createElement("a");
						link.href = "#!"+obj.work.title;
						
						//create a title
						var title = document.createElement("h1");
						title.className = "work-title";

						title.innerHTML = obj.work.title;
						$(link).click(function(){

						//	w.fetchItem(obj.work.title);
						});
			
						$(link).append(thumb)
						$(thumb).load(function(){
							//console.log("image loaded");
							$(this).fadeIn("slow");

									$(li).append(title);
									$(li).append(link);

									$(ul).append(li);
								
								$("li").removeClass("selected");
							
									
							
								
								
					});
					
					
				}
				
				
				
			}//end filter check
	
	
	
		});//end each function

	});//end json call
		

	
	
	$(container).append(ul);
	$("#page-content").append(container);
	
	if(filter !== undefined){
	
	}

};
Work.prototype.findItem = function(objTitle){
	var w = new Work();
	

	$.get('/works.json',function(e,found){
	
		var t;
		$(e).each(function(i,obj){
		
			//grab current title in the list
			var title = obj.work.title;
			
			if(title === objTitle){
				t = true;
			}
			
		
			
		});
		
		if(t == true){
		//	console.log("we need to load a work");
		
				w.fetchItem(objTitle);
			//	$("#main").fadeIn("slow");
		
		
		}else{
	
			$("#main").fadeIn("slow");
				$("#category-box ul li").removeClass("selected");
			
			var check = location.hash.replace("#!","");
			if(check === "web"){
				$("#category-box ul li").removeClass("selected");
				$(".web").addClass("selected");
				
							

			}else if(check === "programming"){
						$("#category-box ul li").removeClass("selected");
						$(".programming").addClass("selected");
			}else if(check === "video"){
		$("#category-box ul li").removeClass("selected");
						$(".video").addClass("selected");
			}else if(check === "photo"){
		$("#category-box ul li").removeClass("selected");
						$(".photo").addClass("selected");

			}
			w.fetchThumbs(objTitle);
		}
	});


};


Work.prototype.fetchItem = function(objTitle){
	


	//setup the main container for the item We're fetching
	var container = document.createElement("section");
	container.id = "single-item";

	$.get('/works.json',function(e){
		$(e).each(function(i,obj){

			//grab current title in the list
			var title = obj.work.title;

			/*
				If we find a match, then we load the work 
				requested.
			*/
			if(title === objTitle){

				/*
					If we find a match we need to load up the single title view
				*/
				var single = document.createElement("section");
				single.id = "single";

				//create header sction
				var singleHeader = document.createElement("section");
				singleHeader.id = "single-header";

				//create the element for the title
				var title = document.createElement("h1");
				title.innerHTML = obj.work.title;

				//create the content section
				var content = document.createElement("section");
				content.className = "work work-"+obj.work.title;

				//p tags for content text
				var p = document.createElement("p");
				p.innerHTML = obj.work.content;
				
				//tags for client info
				var client = document.createElement("p");
				client.innerHTML = obj.work.client;
				
				//change title tag to match title of work
				document.title = obj.work.title;
				
				//add content to section tag
				$(content).append(p);

				//create the media
				var media = document.createElement("section");
				media.className = "media media-"+obj.work.title;
				media.innerHTML = obj.work.media;
				
			
				//attach everything to the main container
				$(singleHeader).append(title);
				$(single).append(singleHeader);
				$(single).append(content);
				$(single).append(media);
				
			
				/*
					Animation to remove main view and bring in single
					view
				*/

				//first position above main view
				$(single).css("z-index","99999");
			
				
				$("#main").fadeOut("slow",function(){
					$(single).appendTo("#single-anchor");
						$(single).fadeIn("slow");
						$("footer").fadeIn("slow");
						
						//add any needed js for stuff like fancybox,processing.js etc calls here
						  $('#slider2').nivoSlider();
							$(".photos").fancybox();
							
				});

SyntaxHighlighter.all();


			}else{

				/*
					load 404
				*/
				return "bad";

			}


		});
	});


};



/*-------------------------
	
	Namespace for categories

----------------------------*/

var category = {
	
	test:function(){
		alert("blah");
	},
	
	web:function(){
			$("#work-list").isotope({filter:'.web'});
	},
	
	photo:function(){
		$("#work-list").isotope({filter:'.photo'});
	},
	
	programming:function(){
		$("#work-list").isotope({filter:'.programming'});
		
	},
	
	print:function(){
		
			$("#work-list").isotope({filter:'.print'});
		
	},
	
	video:function(){
		
			$("#work-list").isotope({filter:'.video'});
		
	},
	all:function(){
		$("#work-list").isotope({filter:''});
	},
	
}