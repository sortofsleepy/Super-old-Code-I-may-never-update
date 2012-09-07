(function($){
$.fn.twit = function (options) {
	//default settings
	var defaults = {
		time:'1000',
		username: 'rice9650',
		count:2,
		entities:false,
		tweetcontainer:this,
		flickrcontainer:this

	}


	//overriding settings with what you pass in
	var opts = $.extend(defaults,options);
	
	
	 //urls	
	 var tweeturl = "http://api.twitter.com/1/statuses/user_timeline.json?count="+opts.count+"&callback=?&screen_name="+opts.username;



	//start tweets
	$.getJSON(tweeturl,function(i){
		
		$(i).each(function(count,tweet){
				
			var tweetBox = document.createElement("section");
			tweetBox.id = "tweet-box";
			
			var tweetList = document.createElement("li");
			tweetList.id="tweet-list";
			$(tweetBox).append(tweetList);
			
			
			var tweetTitle = document.createElement("h1");
			tweetTitle.id="tweet-box-title";
			tweetTitle.innerHTML = "Latest Tweet";
			$(tweetTitle).css("font-style","itallic");
			
			
			$(tweetTitle).appendTo(tweetList);
			
			
			
			var tweets = document.createElement("div");
			tweets.id="tweets";
			$(tweetList).append(tweets);
			
			var tweetContent = document.createElement("h2");
			tweetContent.id="tweet";
			tweetContent.innerHTML = tweet.text;
			$(tweets).append(tweetContent);
			
			
			$("footer").append(tweetBox);
			
		});
		
		
		
	});
	
	
	
	
	


};


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
     $.fn.flickr = function(container,limit,index){
    var flickurl = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&id=12351406@N06&lang=en-us&format=json";
   
          //retrieve flickr
         $.getJSON(flickurl,function(i){

          //for loop controls how many things get shown.
          for(var s=0;s<limit;s++){

            //cycle through everything so that we have a chance at getting every possible photo.
            $(i.items[s]).each(function(a,flickr){
            //	console.log(flickr);
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

    /*
      * Interface for tumblr.
      * Note: index refers to a number signifying place in the "posts" array
      * "i.posts" references all posts
      * "i.posts[index]["regular-title"]" references title
      * "i.posts[index]["url"] references url
      */
     $.fn.tumblr = function(container,limit,index){
     var blogurl = "http://rice9650.tumblr.com/api/read/json?callback=?";

        //retrieve posts
         $.getJSON(blogurl,function(i,status){
          for(var s=0;s<limit;s++){
              if(status == "success"){
            
            $(i.posts[s]).each(function(a,tumblr){
			//console.log(tumblr);
             //log the type
             var type = i.posts[index]['type'];
            // console.log(i.posts);

             //create the basic outter link element
             var item = document.createElement("li");
        
             var title;
             if(type == "regular"){
                title = "<h1 class=\"post\"><a href=\""+i.posts[index].url+"\">"+i.posts[index]["regular-title"]+"</a></h1>";
                 
                 $(item).append(title);
                 $(container).append(item);

     item.className = "tumblr-post post#"+i.posts[index].id;
             }else if(type == "link"){
                 title = document.createElement("h1");
                 
                //title = "<h1 class=\"link\">"+i.posts[index]["link-text"]+"</h1>";
                 var link = document.createElement("a");
                 link.target = "_blank";
                 link.href = i.posts[index]["link-url"];
                 link.innerHTML = i.posts[index]['link-text'];
                 $(title).append(link);


                 $(item).append(title);
                 $(container).append(item);
     item.className = "link post#"+i.posts[index].id;
             }else if((type == "photo")){
             	
             	if(i.posts[index]["photo-caption"] == ""){
             		 title = "<h1 class=\"photo-video\">"+
                  
                  "<a href=\""+i.posts[index]["url"]+"\">"+"<img class=\"tumblr-thumb\" src=\""+i.posts[index]["photo-url-100"]+"\"/>"+"</a></h1>";
             	}else{
                  title = "<h1 class=\"photo-video\">"+
                  "<img class=\"tumblr-thumb\" src=\""+i.posts[index]["photo-url-100"]+"\"/>"+
                  "<a href=\""+i.posts[index]["url"]+"\">"+i.posts[index]["photo-caption"]+"</a></h1>";
				}
                 $(item).append(title);
                 $(container).append(item);
             	     item.className = "photo tumblr-post post#"+i.posts[index].id;
             }else if((type=="video")){

                  if(i.posts[index]["video-caption"] == ""){
             		 title = "<h1 class=\"photo-video\">"+
                  
                  "<div><h1><a href=\""+i.posts[index]['video-player']+"\">VideoPost:"+i.posts[index]['video-caption']+"</a></h1></div></h1>";
             	}else{
                  title = "<h1 class=\"photo-video\">"+
                  "<img class=\"tumblr-thumb\" src=\""+i.posts[index]["photo-url-100"]+"\"/>"+
                  "<a href=\""+i.posts[index]["url"]+"\">"+i.posts[index]["video-caption"]+"</a></h1>";
				}
                 $(item).append(title);
                 $(container).append(item);
             	
     item.className = "tumblr-video post#"+i.posts[index].id;
             }




         

            });
            }else if(status != "success"){
            console.log("FAIL");
            var postTitle = "<li class=\"tumblr-fail\"><h1>Tumblr has failed me! Try refreshing the page</h1></li>";



              $(container).append(postTitle);
              $(postTitle).load(function(){

                    $(this).fadeIn("slow");
              });

    
            }//end status check else
          }//end for loop
         });//end json call
     };//end tumblr function

})(jQuery);