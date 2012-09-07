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
		count = 8;

		var twitter = this.tweeturl+count;
       $.getJSON(twitter,function(obj,p){
        
			$(".tweet").each(function(a){
				var text = document.createElement("p");
				text.innerHTML = obj[a].text;
				text.className = "tweet";
				
				var search = obj[a].text.search("http://");
				
				
					var temp = obj[a].text.split("http://");
				
					var url = temp[1];
					obj[a].text.replace("http://"+url,"");
					var a = document.createElement("a");
					a.href = "http://"+url;
					a.innerHTML = "http://"+url;
					
					
				
				
				$(this).append(text);
				$(text).append(url);
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
	
		var list = [1,2,3,4,5];
		
		/*
		$(list).each(function(){
		
					//create the div container
					var div = document.createElement("div");
					div.className = "item flickr";
				$("#items").append(div);
			
		});
		
		
	*/
	

	     //retrieve flickr
         $.getJSON(this.flickurl,function(i){
	
		
				sessionStorage.setItem("flickr",JSON.stringify(i.items));
			
			});
		
		
		var flickr = jQuery.parseJSON(sessionStorage.getItem("flickr"));
		
		
  	   //for loop controls how many things get shown.
       for(var s=0;s<limit;s++){
		
		$(flickr[s]).each(function(i,obj){
			console.log(flickr);
			//create the container div
			var div = document.createElement("div");
			div.className = "item flickr";
			
			//create the image object
			var img = document.createElement("img");
			img.src = obj.media.m;
			img.alt = "flickrImage";
			
			//create the link to flickr
			var a = document.createElement("a");
			a.href = obj.link;
			a.target = "_blank";
			
			//initialy hide the images
			$("img").hide();
			
			
			//attach everything together
			$(a).append(img);
			$(div).append(a);
			$("#items").append(div);
			
			//fade in when ready
			$("img").load(function(){
				$(".flickr").fadeIn("slow");
				$(this).fadeIn("slow");
					$(".flickr").css("height",$(img).css("height"));
					$(".flickr").css("width",$(img).css("width"));
			});
			
		});
	}//end for loop


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
             var item = document.createElement("div");
             item.className = "item tumblr post#"+i.posts[index].id;
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
