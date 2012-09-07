function Social(username,count){
	this.user = username;
	this.count = count;
}


Social.prototype.getTweet = function(contain){
	
		$.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name="+this.user+"&count="+this.count,function(i){
				var container = document.createElement("div");
				container.id="tweet-box";
	
	
			$(i).each(function(a,tweet){
					
					//simplify json
					var text = tweet.text;

					//counters
					var linkcount = 0,mentioncount = 0,hashcount = 0;

					var linkstring = [];
					var mentionstring = [];
					var hashstring = []; 

					if((tweet.text.search("http://") !== -1)||(tweet.text.search("@") !== -1)||(tweet.text.search("#"))){
						var split = tweet.text.split(" ");
				
				
						$(split).each(function(i,obj){
							if(obj.search("http://") !== -1){
								linkstring.push(obj);
								linkcount++;
							}

							if(obj.search("@") !== -1){
								mentionstring.push(obj);
								mentioncount++;
							}

							if(obj.search("#") !== -1){
								hashstring.push(obj);
								hashcount++;
							}
						});
				}//end searching of specific key values

				//get total values
				var finalcount = linkcount+mentioncount+hashcount;

				
				//multi-dimensional array to hold all the values that need to be converted to useable link.
				var finalArray = {"link":linkstring,"mention":mentionstring,"hash":hashstring};

				
				//will hold the converted version of things that need to be linkified.
				var converted = process_links(finalArray);

				//seperate things out into seperate arrays
				var convertLink = converted.link;
				var mentionLink = converted.mention;
				var hashLink = converted.hash;
				
				//loop through the appropriate number of times to find and replace links
					
				/*
					Plan:
					1. Start out with current itteration of text.
					
					2. feed it into one of the conversion functions that
					finds and replaces text that needs to be turned into a link.

					3. take the text that one of those functions returns and feed it into 
					the next function.


					In the end we should be left with the final tweet with 
					all links converted appropriately.

				*/


					//current state of the text
					var current = tweet.text;

				
					//replace all links with actual link tags
					var after_link_replace = find_replace_links(current,convertLink);


					//replace all @ mentions with links to those user's profiles
					var after_mention_replace = find_mention_replace(after_link_replace,mentionLink);

					//replace all #hashes with links to those search queries.
					var after_hash_replace = find_hash_replace(after_mention_replace,hashLink);


					var div = document.createElement("div");
					div.innerHTML = after_hash_replace;
					div.className = "tweet";

					$(container).append(div);
					
					
			});//end each
				
				$(contain).append(container);
			
		});	//end json call
	
	
};

function find_hash_replace(text,hashes){
	var finalArray = [];
	var v;
	if(text.search("#") !== -1){
		
		var split = text.split(" ");
		var finalText = [];

		$(split).each(function(a,bit){
			

			$(hashes).each(function(b,hash){
				if(bit === hash.innerHTML){
					bit = '';
					var hl = "<a href=\"http://www.twitter.com/#!/search?q="+hash.innerHTML+"\">"+hash.innerHTML+"</a>";
					finalText.push(hl);

				}

			});

			finalText.push(bit);

		});
		var t = finalText.join(" ");
		finalArray.push(t);

	}else{
		

		finalArray.push(text);




	}

	v = finalArray.join(" ");
	return v;
	



}

function find_mention_replace(text,mentions){
	var finalArray = [];
	var t = [];
	if(text.search("@")!== -1){
		
		var split = text.split(" ");
		var finalText = [];
		
	$(split).each(function(b,bit){
			var m;
		$(mentions).each(function(a,mention){
			m = mention;
			if(bit === m.innerHTML){
				bit = '';
				var ml = "<a href=\"http://www.twitter.com/#!/"+m.innerHTML+"\">"+m.innerHTML+"</a>";
				finalText.push(ml);
			}
		 });
			
				finalText.push(bit);
			
	});
		
		var t = finalText.join(" ");
		finalArray.push(t);



	}else{
		
		finalArray.push(text);
	}

	var vv = finalArray.join(' ');
	

	return vv;

}

function find_replace_links(text,links){
	var v = [];


	/*---------------
	
		if there is a link in the text:
		a. Split it into a array(will split word by word).
		b. loop through that array and replace any matches of links with the html link version
		c. join it into a complete sentece again.
		d. push it to the array that we're gonna return.


		-------------------------*/
	if(text.search("http://") !== -1){
		var split = text.split(" ");
		var finalText = [];
		$(split).each(function(i,bit){
		
			$(links).each(function(a,link){
			
				if(bit === link.href){
					bit = '';
					var l = "<a href=\""+link.href+"\">"+link.href+"</a>";
					

					finalText.push(l);


				}

			});

			finalText.push(bit);

	});
		var t = finalText.join(" ");
		v.push(t);

	}else{
		/*---------------
	
			if we don't have a link, 
			push the text into 


		-------------------------*/
		v.push(text);



	}


	var vv = v.join(' ');
	

	return vv;


}

/*----------------

	Converts strings that need to be links to 
	actual links.

	returns a large array of the converted text.

	hl = hashlink;
	ll = link;
	ml = mention link

-------------------*/

function process_links(links){
		var link = [];
		var mentions = [];
		var hash = [];

		$(links.mention).each(function(i,obj){
		//	var ml = "<a href=\"http://www.twitter.com/#!/"+obj+"\">"+obj+"</a>";
			var ml = document.createElement("a");
			ml.href = "http://www.twitter.com/#!/"+obj;
			ml.innerHTML = obj;
			mentions.push(ml);

		});

		$(links.link).each(function(i,obj){
			//var ll = "<a href=\""+obj+"\">"+obj+"</a>";
			var ll = document.createElement("a");
			ll.href=obj;
			ll.innerHTML = obj;
			link.push(ll);

		});

		$(links.hash).each(function(i,obj){
			//var hl = "<a href=\"http://www.twitter.com/#!/search?q="+obj+"\">"+obj+"</a>";
			var hl = document.createElement("a");
			hl.href= "http://www.twitter.com/#!/search?q="+obj.replace("#","%23");
			hl.innerHTML = obj;
			hash.push(hl);

		});
		

		var finalArray = {"link":link,"mention":mentions,"hash":hash};

		return finalArray;

};

Social.prototype.flickr = function(contain){
	 var flickurl = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&id=12351406@N06&lang=en-us&format=json";


	//outter container unordered list
	var ul = document.createElement("ul");
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
	
		
         //retrieve flickr
        $.getJSON(flickurl,function(i){

         //for loop controls how many things get shown.
         var limit = 6;

		for(var count=0;count<limit;count++){
           //cycle through everything so that we have a chance at getting every possible photo.
           $(i.items[count]).each(function(a,flickr){
               //create the individual elements starting with image
               var image = document.createElement("img");
               var link = document.createElement("a");
               var li = document.createElement("li");

               image.src = flickr.media.m;
			   image.className = "flickr-image "+flickr.title;
			
			   link.href = flickr.link;
			
			   
               $(image).load(function(){
                  // console.log("thumb loaded");
                   $(this).fadeIn(400,"easeInSine");

               });

			//attach everything
			$(link).append(image);
			$(li).append(link);

			$(ul).append(li);
           });
         }//end for loop
        });
       
		//append to anchoring container
		$(contain).append(ul);
	
};
