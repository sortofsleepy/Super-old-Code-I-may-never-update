/*
	TheSocialTwit.
        A very simple plug in to parse and display your Tweets,flickr stream and tumblr posts.

        Note: Until I can think of a better
        parsing method, any Url's need to be at the END of your tweets in order for a link
        to be made. Otherwise, the links won't be made.
*/

(function($){
$.fn.twit= function (options) {
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
      *
      * Path to Thumb = flickr.media.m
      * Path to title = flickr.title
      * path to full image = flickr.link
      *
      * "container" is the element you want to append the images to.
      * "limit" limits the number of photos shown.
      */
     $.fn.twit.flickr = function(container,limit){

         //retrieve flickr
         $.getJSON(flickurl,function(i){
          for(var s=0;s<limit;s++){
            $(i.items[s]).each(function(a,flickr){
                //create the individual elements starting with image
                var image = document.createElement("img");
                var link = document.createElement("a");
                var li = document.createElement("li");

                link.href = flickr.link;
                image.src= flickr.media.m;

                image.className = "flickr-thumb flickr#"+flickr.title;
                $(image).hide();



                $(link).append(image);
                $(li).append(link);
                $(container).append(li);

                $(image).load(function(){
                    console.log("thumb loaded");
                    $(this).fadeIn(400,"easeInSine");

                });


            });
          }
         });
         return true;
     };

     /*
      * Interface for tumblr.
      *
      * "i.posts" references all posts
      * "posts["regular-title"]" references title
      * "posts["url"] references url
      */
     $.fn.twit.tumblr = function(container,limit){

         //retrieve flickr
         $.getJSON(blogurl,function(i,status){
            if(status == "success"){
            $(i.posts).each(function(a,post){


              var postTitle = "<li class=\"tumblr-post post#"+post.id+"\"><h1>"+post["regular-title"]+"</h1></li>";



              $(container).append(postTitle);
              $(postTitle).load(function(){

                    $(this).fadeIn("slow");
              });


            });
            }else{
                 for(var s=0;s<limit;s++){

              var postContainer = document.createElement("ul");
              postContainer.className ="tumblr-post";
              var postTitle = "<li><h1>Tumblr has Failed Me..try a refresh</h1></li>";


              $(postContainer).append(postTitle);
              $(container).append(postContainer);
              $(postTitle).load(function(){

                    $(this).fadeIn("slow");
              });
                 }

            }
         });
         return true;
     };
}



})(jQuery);



