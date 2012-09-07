$(window).ready(function(){

	//get the title
	var title =	$(document).find("title");
	
	//get the hash 
	var hash = location.hash;

	if(hash != ""){
		
		
			//find the work
			$.get("/feed/json/",function(i){

				$(i).each(function(count,obj){
					if(obj.fields.title == title){

						Work.loadWork(obj);
					}
				});
			});
		
		
		
	}//end if hash 





	
	
});




$(document).ready(function(){
	
   //setup the outter work container
    var workWrapper = document.createElement("section");
    workWrapper.id="work-container";
    document.getElementById("page-content").appendChild(workWrapper);

	//gonna put things into a list
    var list = document.createElement("ul");
    list.id = "work-list";

    document.getElementById("work-container").appendChild(list);

	
	

});

//namespacing the work function so we don't gotta write it twice
var Work = {
	
	loadWork:function(obj){
		
		
	},
	
	reset:function(){
		
		
		
	},
	
};