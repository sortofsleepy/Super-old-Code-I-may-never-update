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
		count = 99;

		var twitter = this.tweeturl+count;
       $.getJSON(twitter,function(obj,p){
        

			$(".tweet").each(function(a){
				var text = document.createElement("p");
				text.innerHTML = obj[a].text;
				text.className = "tweettext";
				
				var search = obj[a].text.search("http://");
				
				
					var temp = obj[a].text.split("http://");
				
					var url = temp[1];
					obj[a].text.replace("http://"+url,"f");
					var a = document.createElement("a");
					a.href = "http://"+url;
					a.innerHTML = "http://"+url;
					
					
			
				$(text).load(function(){
					
					$(this).fadeIn("slow");
				});
				
				$(this).append(text);
				$(text).append(url);
				
				a++;
			});
			
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
	
	

	 
		var twitter = this.flickurl;
	  $.getJSON(twitter,function(obj,p){
        	var index = 0;
			var flickr = obj.items;
			$(".flickr").each(function(a){
				var img = document.createElement("img");
				img.src = obj.items[a].media.m;
				img.alt="flickrImage";
				
				$(img).hide();
				$(img).css("height",$(".flickr").css("height"));
				$(img).css("width",$(".flickr").css("width"));
				$(img).load(function(){
					$(".flickr").fadeIn("slow");
					$(this).fadeIn("slow");
				});
				
				$(this).append(img);
				
				a++;
				
			
			});
			
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
		
      
		
			var tumblr = jQuery.parseJSON(localStorage.getItem("tumblr"));
		 
          for(var s=0;s<limit;s++){
            
			$(tumblr.posts[s]).each(function(i,obj){
				   if(status == "success"){
			
				//create the container
				var div = document.createElement("div");
				div.className = "item tumblr";
				
				//title 
				var title = document.createElement("h2");
				title.className = "tumblr-title";
			
				console.log(tumblr.posts[index]['regular-title']);
				
				
				$(div).append(title);
				$(container).append(div);
				
				
			}else{
				//note, this may crash non-webkit browsers.
				console.log("Tumblr Error: There was a error either loading the posts, or there aren't enough posts to send back");
			}
				
			});//end each function
          }//end for loop
        


     };//end tumblr function
