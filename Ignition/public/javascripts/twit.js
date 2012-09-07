function twit(options){
    	this.defaults = {
		time:'1000',
		username: 'rice9650',
		count:3,
		entities:false,
		containerID:"#social"
		

	};

        //extend defaults with whatever we pass in
        this.opts = $.extend(this.defaults,options);

       //urls
       this.tweeturl = "http://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name="+this.opts.username+"&count=";
       this.flickurl = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&id=12351406@N06&lang=en-us&format=json";
       this.blogurl = "http://rice9650.tumblr.com/api/read/json?callback=?";
      
}


twit.prototype.getTweets = function(container,limit){
		count = 40;

		var twitter = this.tweeturl+count;
       $.getJSON(twitter,function(i,p){
        	var rand = random(count);
			var tweet = i[rand];
			var split = tweet.text.split("http://");
		    var url = "http://"+split[1];
			var li = document.createElement("li");
			li.className = "tweet";
				var link = document.createElement("a");
			var text = document.createElement("p");
			text.innerHTML = tweet.text;
			
			if(split[1] !== undefined){
			
				link.href= url;
				
			}
			
			$(li).append(text);
			$(li).append(link);
			
			$(container).append(li);
			
			
	    });
	
};
function random(count){

    return Math.floor(Math.random()*count);



}


/*----------------------
 *
 *  Flicker intergration
 *  Note: index refers to a number signifying place in the "items" array
 *  Path to Thumb = i.items[index].media.m
 *  Path to title = i.items[index].title
 *  path to full image = i.items[index].link
 *
 *  "container" is the element you want to append the images to.
 *  "limit" limits the number of photos shown.
 *-------------------------*/


twit.prototype.flickr = function(container,limit,index){

         //retrieve flickr
         $.getJSON(this.flickurl,function(i){

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

           //     $(li).css("height") = $(image).css("height");
             //   $(li).css("width") = $(image).css("width");

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


};


    /*
      * Interface for tumblr.
      * Note: index refers to a number signifying place in the "posts" array
      * "i.posts" references all posts
      * "i.posts[index]["regular-title"]" references title
      * "i.posts[index]["url"] references url
      */
     twit.prototype.tumblr = function(container,limit,index){

        //retrieve posts
         $.getJSON(this.blogurl,function(i,status){
          for(var s=0;s<limit;s++){
              if(status == "success"){

            $(i.posts[s]).each(function(a,tumblr){

             //log the type
             var type = i.posts[index]['type'];
            // console.log(i.posts);

             //create the basic outter link element
             var item = document.createElement("li");
             item.className = "tumblr-post post#"+i.posts[index].id;
             var title;
             if(type == "regular"){
                title = "<h1 class=\"post\"><a href=\""+i.posts[index].url+"\">"+i.posts[index]["regular-title"]+"</a></h1>";

                 $(item).append(title);
                 $(container).append(item);


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

             }else if((type == "photo")||(type=="video")){

                  title = "<h1 class=\"photo-video\"><a href=\""+i.posts[index]["url"]+"\">"+i.posts[index]["caption"]+"</a></h1>";

                 $(item).append(title);
                 $(container).append(item);


             }






            });
            }else if(status != "success"){
          //  console.log("FAIL");
            var postTitle = "<li class=\"tumblr-fail\"><h1>Tumblr has failed me! Try refreshing the page</h1></li>";



              $(container).append(postTitle);
              $(postTitle).load(function(){

                    $(this).fadeIn("slow");
              });


            }//end status check else
          }//end for loop
         });//end json call


     };//end tumblr function