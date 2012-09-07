$(window).ready(function(){

	   var tweeturl = "http://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name=rice9650&count=";
    var flickurl = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&id=12351406@N06&lang=en-us&format=json";
    var blogurl = "http://rice9650.tumblr.com/api/read/json?callback=?";
	

	    $.getJSON(flickurl,function(i){
	
		
				localStorage.setItem("flickr",JSON.stringify(i));
			
			});
			
			  //retrieve posts
		         $.getJSON(blogurl,function(i,status){

					localStorage.setItem("tumblr",JSON.stringify(i));

				});

});
$(document).ready(function() {

    var tweet = new twit();
	
	tweet.flickr("",9,3);
	tweet.getTweets();
//	get_service_assets(5);

		$(".item").fadeIn(4000);
		
	

		$('#items').isotope({
		  masonry : {
		    columnWidth : 2
		  }
		});
		
		

});

$(document).bind("click",function(){
$("#items").isotope('reLayout');	
});

/*
 *This'll poll our services until we run out of
 *items to display
 *
 * Parameters:
 * var limit - specifies the number of items to return from each service.
 */
function get_service_assets(limit){
    var tweet = new twit();


    var flickrTally = 0;
    var tumblrTally = 0;
	var tweetTally = 0;


       /*
        *will run until the added tallies == to the limit
        *multiplied by the number of services you're looking for
        **/
 while((flickrTally+tumblrTally+tweetTally != limit*3)){
    for(var i=0;i<limit;i++){

        var service = get_random();

        if(service === 1){
            if(flickrTally != limit){
             tweet.flickr("#items",1,flickrTally);
              flickrTally+=1;
             // console.log("FlickrTally is now:"+flickrTally);
            }
        }else if(service === 2){
            if(tumblrTally!=limit){
               tweet.tumblr("#items",1,tumblrTally);
               tumblrTally+=1;
                //console.log("TumblrTally is now:"+tumblrTally);
            }
        }else if(service === 3){
			if(tweetTally!=limit){
               tweet.getTweets("#items",1);
               tweetTally+=1;
                //console.log("TweetTally is now:"+tweetTally);
            }
	
	
		}


    }
    







   }
}
   //console.log("Flickr total:"+flickrTally);
   //console.log("Tumblr total:"+tumblrTally);

//returns a random number to see which service to poll from next.
    function get_random(){

        return Math.floor(Math.random()*3+1);



    }
