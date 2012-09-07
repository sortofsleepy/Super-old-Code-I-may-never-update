$(window).ready(function(){

 
	
	//get the hash 
	var hash = location.hash;
	
	//try and get a project name
	var project = hash.replace("#!","");
	
	
    /*
     * 	First we check link to see if we need to load up work.
     */

	if(hash != ""){
		console.log("hash is not blank");
	$("#main").hide();
			//find the work
			$.get("/posts/postfeed.json",function(i){
	
				$(i).each(function(count,obj){
					//console.log(obj);
					if(obj.post.title == project){
						
						Work.load_item(obj.post);
					}else{
						if(project == "video"){
							Work.video();
							$("#main").fadeIn();
						}else if(project == "programming"){
							Work.programming();
							$("#main").fadeIn();
						}else if(project == "photo"){
							Work.photo();
							$("#main").fadeIn();
						}else if(project == "web"){
							Work.web();
							$("#main").fadeIn();
						}else{
							console.log("problem");
						}
					}
					
				});
			});
		
		
		
	}else{
		
console.log("hash is blank");
		
	Work.loadWorkFresh();

		
	}//end if hash 




	
	
});
function get_height(){
    var height = $(window).scrollTop();

    console.log(height);
}

//namespacing the work function so we don't gotta write it twice
var Work = {
	
	loadWorkFresh:function(){
	//keeping track of what type of work is being shown
	this.status;
	
// $("#main").fadeIn(400,"easeInSine");
    $("#sidebar").hide();
     ///////////////// FOR THE WORK PAGE //////////////////////
        //setup the outter work container
    var workWrapper = document.createElement("section");
    workWrapper.id="work-container";
    document.getElementById("page-content").appendChild(workWrapper);

    var list = document.createElement("ul");
    list.id = "work-list";

    document.getElementById("work-container").appendChild(list);
     //lets load up our stuff.
    $.get("/posts/postfeed.json",function(i){

     
	

   
        $(i).each(function(a,data){
        	//console.log(data);
                //create the list element
                var item = document.createElement("li");
                item.className = "work-item "+data.post.categories;

                //create the container for each piece of work
                var work = document.createElement("div");
                work.className = "piece";


                //create the individual elements starting with image
                var image = document.createElement("img");
                image.src=data.post.thumbnail;
                image.className = "post-image";
                $(image).hide();
                $(image).css("z-index",-1);

                //now title
                var title = document.createElement("h1");
                title.className="post-title";
           
                //now excerpt
                var excerpt = document.createElement("p");
                excerpt.className = "post-excerpt";
                excerpt.innerHTML = data.post.excerpt;

                //link
                var link = document.createElement("a");
                link.href="#!"+data.post.title;

                /*
                 * sets up the click event. When we click, we run the function
                 * that loads up the particular item.
                 */
                 
                $(link).click(function(){
                    Work.load_item(data.post);
                });
                
                link.className="post-permalink";
                link.innerHTML = data.post.title;


                //append everything
                document.getElementById("work-container").appendChild(item);
                item.appendChild(work);


                work.appendChild(image);
                $(image).load(function(){
                    $(this).fadeIn(400,"easeInSine",function(){
                              $(title).fadeIn(400,"easeInSine");
                    });
             
                });

                //work.appendChild(title);
                title.appendChild(link);
                list.appendChild(item);
			
  
                $(item).hover(function(){
                    work.appendChild(title);
                 //   work.appendChild(excerpt);
                },function(){
                     work.removeChild(title);
                    // work.removeChild(excerpt);

                });
        });//end each

    

    });

 
		
	},

	
	/*
	 * 	Loads a single item
	 * 
	 */
	load_item:function(obj){
	
			//fade out main
			$("#main").fadeOut(500,function(){
				//change the page title to the title of the project
				document.title = obj.title;
				
				$("#single-view").fadeIn(500,function(){
					$("#single-view-content").fadeIn("slow");
				});
				
				//create the title
				var title = document.createElement("h1");
				//title.id = "site-title";
				title.className = "single-title";
				title.innerHTML = obj.title;
				
			
				//create the description		
				var description = document.createElement("div");
				description.id = "project-description";
				description.innerHTML = obj.content;
				
				//create media section
				var media = document.createElement("div");
				media.id = "project-media";
				media.innerHTML = obj.related_media;
				
				
				//attach everything to the single content view
				$("#single-view").append(title);
				
				$("#single-view-content").append(media);
				$("#single-view-content").append(description);	
				//$("#single-view-content").css("height",$(media).css("height"));
				$(".photo").click(function(){
					//alert("clicked");
					$(".photo").fancybox();

				});
			});
			
	

	},
	
	reset:function(){
		
		//fade out single view
		$("#single-view-content").fadeOut(500,function(){
			$("#single-view").fadeOut(500,function(){
				
					//"fade in " main by redirecting back to the work page
					window.location = "/work";
			});
		
			
		});
		
		
	},
	
	
	web:function(){
	$("#work-list li").fadeIn();
			$("#work-list li:not(.web)").fadeOut();
			$(".web").fadeIn();
			/*
			$("#work-list li:not(.web)").animate({
				opacity:'.1',
				
			},600,"easeInSine");
			
			
		*/

				
		
		
	},
	
	photo:function(){
		$("#work-list li").fadeIn();
			$("#work-list li:not(.photo)").fadeOut();
			$(".photo").fadeIn();

	},
	
	programming:function(){
		$("#work-list li").fadeIn();
			$("#work-list li:not(.programming)").fadeOut();
			$(".programming").fadeIn();

		
	},
	
	video:function(){
		$("#work-list li").fadeIn();
			$("#work-list li:not(.video)").fadeOut();
			$(".video").fadeIn();

		
	},
	
	
	removeFilter:function(){
		$("#work-list li").fadeIn();
	}
	
	
};