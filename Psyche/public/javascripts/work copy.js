$(window).ready(function(){
  //  $("#main").hide();
    $("#sidebar").hide();
});

$(document).ready(function() {
// $("#main").fadeIn(400,"easeInSine");
    $("#sidebar").hide();
     ///////////////// FOR THE WORK PAGE //////////////////////
        //setup the outter work container
    var workWrapper = document.createElement("section");
    workWrapper.id="work-container";
    document.getElementById("page-content").appendChild(workWrapper);

    var list = document.createElement("ul");
    list.id = "work-list";

    document.getElementById("work-container").appendChild(list);
     //lets load up our stuff.
    $.get("/posts/postfeed.json",function(i){

     


   
        $(i).each(function(a,data){
                //create the list element
                var item = document.createElement("li");
                item.className = "work-item";

                //create the container for each piece of work
                var work = document.createElement("div");
                work.className = "piece";


                //create the individual elements starting with image
                var image = document.createElement("img");
                image.src=data.post.thumbnail;
                image.className = "post-image";
                $(image).hide();

                //now title
                var title = document.createElement("h1");
                title.className="post-title";
           
                //now excerpt
                var excerpt = document.createElement("p");
                excerpt.className = "post-excerpt";
                excerpt.innerHTML = data.post.excerpt;

                //link
                var link = document.createElement("a");
                link.href="#"+data.post.title;

                /*
                 * sets up the click event. When we click, we run the function
                 * that loads up the particular item.
                 */
                 
                $(link).click(function(){
                    load_item(data.post.permalink);
                });
                
                link.className="post-permalink";
                link.innerHTML = data.post.title;


                //append everything
                document.getElementById("work-container").appendChild(item);
                item.appendChild(work);


                work.appendChild(image);
                $(image).load(function(){
                    $(this).fadeIn(400,"easeInSine",function(){
                              $(title).fadeIn(400,"easeInSine");
                    });
             
                });

                work.appendChild(title);
                title.appendChild(link);
                list.appendChild(item);

           
               // $(item).hover(function(){
                    work.appendChild(title);
                    work.appendChild(excerpt);
             //   },function(){
                     work.removeChild(title);
                     work.removeChild(excerpt);

              //  });
        });//end each

    

    });

 

    /*
     * Loads the particular piece that's asked for.
     *
     * Parameters:
     * page - the permalink of the work
     * 
     */
    function load_item(page){

    $("#main").fadeOut(400,"easeInSine",function(){
        window.location = page;
    });

    
    }
    function close_item(){
        $("#single-view").removeClass("single-view");
        $("#single-view-content").fadeOut("slow");
    }

});
