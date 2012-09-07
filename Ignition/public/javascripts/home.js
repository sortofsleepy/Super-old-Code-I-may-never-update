
$(document).ready(function() {

    //get_service_assets(8);

/*
	$('#item-list li').isotope({
	  itemSelector:'.element',
	  masonry : {
	    columnWidth : 240
	  }
	});
*/
	$('#items').isotope({

	  masonry : {
	    columnWidth : 1
	  }
	});
	
	   $("#slider").nivoSlider({
			prevText:'',
			nextText:'',
		});
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
             tweet.flickr("#item-list",1,flickrTally);
              flickrTally+=1;
             // console.log("FlickrTally is now:"+flickrTally);
            }
        }else if(service === 2){
            if(tumblrTally!=limit){
               tweet.tumblr("#item-list",1,tumblrTally);
               tumblrTally+=1;
                //console.log("TumblrTally is now:"+tumblrTally);
            }
        }else if(service === 3){
			if(tweetTally!=limit){
               tweet.getTweets("#item-list",1);
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
