$(window).ready(function(){
	

	//console.log(localStorage['visited']);
	
	$("#draw").css("margin-bottom","-"+$(window).height()+"px");
});



$(document).ready(function() {
	
		//run intro animation
	if(Modernizr.localstorage){
		//alert("has localstorage");
		if(localStorage.getItem("old") == undefined){
		// alert("hasn't visted");
				//hide header and page content  from view
			$("header").addClass("home-intro");
			$("#page-content").hide();
			//animate it down
			$('header').animate({
				bottom:'0px'
				
			},1200,"easeInOutExpo");
		
		
			$("#intro-copy").fadeIn("slow");
		
		
			localStorage.setItem("old",true);
			setInterval("removeIntro()",2000);
		}else if(localStorage.getItem("old") == "true"){
			
			$("#intro-copy").remove();
		}
	}//end outter if for localStorage check
	

      get_service_assets(8);

//	$(document).blah();

});

/*
 *This'll poll our services until we run out of
 *items to display
 *
 * Parameters:
 * var limit - specifies the number of items to return from each service.
 */
function get_service_assets(limit){
    var flickrTally = 0;
    var tumblrTally = 0;

       /*
        *will run until the added tallies == to the limit
        *multiplied by the number of services you're looking for
        **/
 while((flickrTally+tumblrTally != limit*2)){
    for(var i=0;i<limit;i++){

        var service = get_random();

        if(service == 1){
            if(flickrTally != limit){
              $(document).flickr("#item-list",1,flickrTally);
              flickrTally+=1;
              //console.log("FlickrTally is now:"+flickrTally);
            }
        }else{
            if(tumblrTally!=limit){
               $(document).tumblr("#item-list",1,tumblrTally);
               tumblrTally+=1;
               // console.log("TumblrTally is now:"+tumblrTally);
            }
        }


    }







   }
   //console.log("Flickr total:"+flickrTally);
   //console.log("Tumblr total:"+tumblrTally);
}
function removeIntro(){
	
	$("#intro-copy").fadeOut(400,function(){
	
		$("#page-content").fadeIn();
	});
	
	
	clearInterval("removeIntro();");
}
//returns a random number to see which service to poll from next.
    function get_random(){

        return Math.floor(Math.random()*2+1);



    }
 