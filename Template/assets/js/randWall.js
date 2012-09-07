/*
	Creates a random wall of content from 
	some form of a feed.
	
	JSON feeds are the only acceptable forms at the moment.
	Will add support for XML/Atom later.
*/

(function($){
	
	
	$.fn.rand = function(options){
		
		//default settings
		var defaults = {
			count:3,
			container:this,
			url:"",
			type:"json",
		}
		
		//extending the defualts with what user might pass in
		var opts = $.extend(defaults,options);
		
		//nameing the url for the service for ease-of-use
		var url = opts.url;
		
		//start retrival
		$.getJSON(url,function(i){
		
			$(i).each(function(a,content){
				
				
			});
			
		});
		
		
		
		
		
}})(jQuery);


/*---------------UTILITY FUNCTIONS FOR PLUGIN---------------*/
function get_random(){

    return Math.floor(Math.random()*2+1);



}


function get_service_assets(limit,url){
    var tally = 0;

       /*
        *will run until the added tallies == to the limit
        *multiplied by the number of services you're looking for
        **/
 while((tally != limit)){
    for(var i=0;i<limit;i++){

        var service = get_random();

        if(service == 1){
            if(flickrTally != limit){
              $(document).twit.flickr("#item-list",1,flickrTally);
              flickrTally+=1;
              //console.log("FlickrTally is now:"+flickrTally);
            }
        }else{
            if(tumblrTally!=limit){
               $(document).twit.tumblr("#item-list",1,tumblrTally);
               tumblrTally+=1;
               // console.log("TumblrTally is now:"+tumblrTally);
            }
        }


    }
