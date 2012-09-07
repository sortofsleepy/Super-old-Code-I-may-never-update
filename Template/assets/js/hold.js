$(window).ready(function(){
var title =	$(document).find("title");

  	//pre hiding some stuff
	$("#single-view").hide();
	

	var hash = location.hash;
	if(hash != ""){

		//remove the shebang tag and grab title
		var title = location.hash.replace("#!/","");
		
		//find the work
		$.get("/feed/json/",function(i){
	  		
			$(i).each(function(count,obj){
				if(obj.fields.title == title){
					
					loadWork(obj);
				}
			});
		});
	    /*
	     * Loads the particular piece that's asked for.
	     *
	     * Parameters:
	     * obj - the object that represents the project we want to load
	     * 
	     */
	 	 function loadWork(obj){

				//share container 
				var shareContainer = document.createElement("div");
				shareContainer.id = "share"

				var button = document.createElement("span");
				button.class = "st_sharethis";
				button.displayText = "ShareThis";

				$(shareContainer).append(button);


				var title =	$(document).find("title");
				title[0].innerHTML = obj.fields.title;
				//fadeout main, fadein single viewer
				$("#main").fadeOut();
				$("#single-view").fadeIn();

				//set the height and width of single-view to the current window size
				$("#single-view").css("height",$(window).height());
				$("#single-view").css("width",$(window).width());

				//create the inner content container
				var container = document.createElement("div");
				container.id = "single-content-container";



				//create close button
				var close = document.createElement("button");
				close.id = "close-button";
				$(close).css("width","180px");
				$(close).css("height","60px");
				$(close).click(function(){
					close_item();
				});

				$(close).appendTo(container);

				//create the title
				var title = document.createElement("h1");
				title.id = "item-title";
				title.innerHTML = obj.fields.title;
				$(title).appendTo(container);
				/*
					Creating object content.
					We're gonna use a div since 
					ckEditor automatically adds p tags, etc
				*/
				var content = document.createElement("div");
				content.id="item-content";
				content.innerHTML = obj.fields.description;
				$(content).appendTo(container);

				$(shareContainer).appendTo(content);


				/*client
				var client = document.createElement("p");
				client.innerHTML = obj.fields.client;
				$(client).appendTo(container);
				*/

				//media
				var media = document.createElement("div");
				media.innerHTML = obj.fields.media;
				media.id="media"
				$(media).appendTo(container);

				$("#single-view").fadeIn("slow");



				//append everythin
				$(container).appendTo("#single-view");





		    }


		    function close_item(){
				var title =	$(document).find("title");
				title[0].innerHTML = "TheUserAgent";
		       		//fadeout main, fadein single viewer
				//	$("#main").fadeOut("slow");
					$("#single-view").fadeOut("fast",function(){
						window.location = '/work/';
					});


		    }
	
	
	}
	
	
	
	
});

$(window).unload(function(){
	var previous = location.hash.replace("#!/","");
	
	window.location = location.href;
});


$(document).ready(function() {

    //setup the outter work container
    var workWrapper = document.createElement("section");
    workWrapper.id="work-container";
    document.getElementById("page-content").appendChild(workWrapper);

	//gonna put things into a list
    var list = document.createElement("ul");
    list.id = "work-list";

    document.getElementById("work-container").appendChild(list);
    
 	//now lets load up our stuff.
    $.get("/feed/json/",function(i){

     		//we get a list of objects back, now cycle through em to get the
			//content we want
			$(i).each(function(count,obj){
				   var category = obj.fields.category;
				   var title = obj.fields.title;
				   
					
				
					//create the list element
		           var item = document.createElement("li");
		           item.className = "work-item "+category;

		           //create the container for each piece of work
		           var work = document.createElement("div");
		           work.className = "piece";


                  //thumbnail
               	  var image = document.createElement("img");
		          image.src=obj.fields.thumb;
		          image.className = "post-image ";
		          $(image).hide();
				
				  //now title
	              var title = document.createElement("h1");
	              title.className="post-title";
	
		
				  //link
	              var link = document.createElement("a");
	              link.href="#!/"+obj.fields.title;
	
     			link.className="post-permalink";
        		link.innerHTML = obj.fields.title;
				
						//when user clicks on a link, load that piece of work
						$(link).click(function(){
							loadWork(obj);
						});

        		//append everything
        		document.getElementById("work-container").appendChild(item);
        		item.appendChild(work);
		

        		work.appendChild(image);
        		$(image).load(function(){
            		$(this).fadeIn(400,"easeInSine",function(){
                      	$(title).fadeIn(400,"easeInSine");
            		});
     
        		});

       			// work.appendChild(title);
        		title.appendChild(link);
        		list.appendChild(item);

   
        		$(item).hover(function(){
            		work.appendChild(title);
           			work.appendChild(excerpt);
       			},function(){
             			work.removeChild(title);
             			work.removeChild(excerpt);

        		});
				
			});
    

    });


    /*
     * Loads the particular piece that's asked for.
     *
     * Parameters:
     * obj - the object that represents the project we want to load
     * 
     */
    function loadWork(obj){

		//share container 
		var shareContainer = document.createElement("div");
		shareContainer.id = "share"
			
		var button = document.createElement("span");
		button.class = "st_sharethis";
		button.displayText = "ShareThis";
		
		$(shareContainer).append(button);
	
		
		var title =	$(document).find("title");
		title[0].innerHTML = obj.fields.title;
		//fadeout main, fadein single viewer
		$("#main").fadeOut();
		$("#single-view").fadeIn();
		
		//set the height and width of single-view to the current window size
		$("#single-view").css("height",$(window).height());
		$("#single-view").css("width",$(window).width());
		
		//create the inner content container
		var container = document.createElement("div");
		container.id = "single-content-container";
		
	
		
		//create close button
		var close = document.createElement("button");
		close.id = "close-button";
		$(close).css("width","180px");
		$(close).css("height","60px");
		$(close).click(function(){
			close_item();
		});
		
		$(close).appendTo(container);
		
		//create the title
		var title = document.createElement("h1");
		title.id = "item-title";
		title.innerHTML = obj.fields.title;
		$(title).appendTo(container);
		/*
			Creating object content.
			We're gonna use a div since 
			ckEditor automatically adds p tags, etc
		*/
		var content = document.createElement("div");
		content.id="item-content";
		content.innerHTML = obj.fields.description;
		$(content).appendTo(container);
		
		$(shareContainer).appendTo(content);
		
		
		/*client
		var client = document.createElement("p");
		client.innerHTML = obj.fields.client;
		$(client).appendTo(container);
		*/
		
		//media
		var media = document.createElement("div");
		media.innerHTML = obj.fields.media;
		media.id="media"
		$(media).appendTo(container);
		
		$("#single-view").fadeIn("slow");
		
	
		
		//append everythin
		$(container).appendTo("#single-view");
		
		
		
		
		
    }


    function close_item(){
		var title =	$(document).find("title");
		title[0].innerHTML = "TheUserAgent";
       		//fadeout main, fadein single viewer
		//	$("#main").fadeOut("slow");
			$("#single-view").fadeOut("fast",function(){
				window.location = '/work/';
			});
			
			
    }

});

function web(){
	$("#work-list li").each(function(i){
	 	if($(this).hasClass("web") != true){
			/*
				Fade out all non web related work
				and add the class "invisible"
			*/
			$(this).fadeOut();
			$(this).addClass("invisible");
			
			/*
				If a previous category was selected, remove
				it's styling
			*/
			$(this).removeClass("category-selected");
			
			//add the category selected to the selected category.
			$(this).hasClass("web").addClass("category-selected");
			
		/*
			If the category we're looking for happens to be invisible, 
			fade it in
		*/
		}else if(($(this).hasClass("web") == true)&&($(this.hasClass("invisible")))){
			
			$(this).fadeIn();
			$(this).removeClass("invisible");
		}
	
	});
}

function photo(){
	$("#work-list li").each(function(i){
	 	if($(this).hasClass("photo") != true){
			/*
				Fade out all non web related work
				and add the class "invisible"
			*/
			$(this).fadeOut();
			$(this).addClass("invisible");
			
			/*
				If a previous category was selected, remove
				it's styling
			*/
			$(this).removeClass("category-selected");
			
			//add the category selected to the selected category.
			$(this).hasClass("photo").addClass("category-selected");
			
		/*
			If the category we're looking for happens to be invisible, 
			fade it in
		*/
		}else if(($(this).hasClass("photo") == true)&&($(this.hasClass("invisible")))){
			
			$(this).fadeIn();
			$(this).removeClass("invisible");
		}
	
	});
}

function video(){
	//cycle through all the work elements
	$("#work-list li").each(function(i){
		
		//if a particular element does not have the class we're looking for, 
		//fade it out.
	 	if($(this).hasClass("web") != true){
			$(this).fadeOut();
			$(this).addClass("invisible");
			
		 // on the offhand chance we do have a class that we're lookng for and
		//if it happens to be invisible, fade it in.
		}else if(($(this).hasClass("web") == true)&&($(this.hasClass("invisible")))){
			$(this).fadeIn();
			$(this).removeClass("invisible");
			
		}
	
	});
	
}

function reset(){
	$("#work-list li").each(function(i){
	
	if($(this).hasClass("invisible") == true){
			$(this).fadeIn();
				$(this).removeClass("invisible");
		}

		
	});	
}