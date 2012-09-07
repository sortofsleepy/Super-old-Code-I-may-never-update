/*
	TheSocialTwit.
        A very simple plug in to parse and display your Tweets,flickr stream and tumblr posts.

        Note: Until I can think of a better
        parsing method, any Url's need to be at the END of your tweets in order for a link
        to be made. Otherwise, the links won't be made.
*/

(function($){
$.fn.twit = function (options) {
	//default settings
	var defaults = {
		time:'1000',
		username: 'rice9650',
		count:3,
		entities:false,
		tweetcontainer:this,
		flickrcontainer:this

	}


	//overriding settings with what you pass in
	var opts = $.extend(defaults,options);

	 var tweeturl = "http://api.twitter.com/1/statuses/user_timeline.json?count="+opts.count+"&callback=?&screen_name="+opts.username;
     var flickurl = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&id=12351406@N06&lang=en-us&format=json";
     var blogurl = "http://rice9650.tumblr.com/api/read/json?callback=?";
   //retrieve tweets.
   $.getJSON(tweeturl,function(i){

     	$(i).each(function(a,tweet){
            var string = tweet.text;
            var split = string.split("http://");
            var url = "http://"+split[1];
            $(opts.tweetcontainer).append("<div class=\"tweet \">"+string.replace(url,"<a href=\""+url+"\">"+url+"</a>")+"</div>");

    	});

     });


    



     /*
      * Flickr integration.
      * Note: index refers to a number signifying place in the "items" array
      * Path to Thumb = i.items[index].media.m
      * Path to title = i.items[index].title
      * path to full image = i.items[index].link
      *
      * "container" is the element you want to append the images to.
      * "limit" limits the number of photos shown.
      */
     $.fn.twit.flickr = function(container,limit,index){
  
          //retrieve flickr
         $.getJSON(flickurl,function(i){

          //for loop controls how many things get shown.
          for(var s=0;s<limit;s++){

            //cycle through everything so that we have a chance at getting every possible photo.
            $(i.items[s]).each(function(a,flickr){
                //create the individual elements starting with image
                var image = document.createElement("img");
                var link = document.createElement("a");
                var li = document.createElement("li");

                link.href = i.items[index].link;
                image.src= i.items[index].media.m;
                link.target="_blank";

                image.className = "flickr-thumb flickr#"+i.items[index].title;
                $(image).hide();



                $(link).append(image);
                $(li).append(link);
                $(container).append(li);

                $(image).load(function(){
                   // console.log("thumb loaded");
                    $(this).fadeIn(400,"easeInSine");

                });


            });
          }
         });
         return true;

 };

$.fn.tumblr = function(){
	
	
	
};

}})(jQuery);



