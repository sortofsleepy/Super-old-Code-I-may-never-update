$(window).ready(function(){
		//get the hash
		var hash = window.location.hash;
	//replace hash so we're left with a useable jquery selector
	var place = hash.replace("/","");
	var work = place.replace("#","");
	var first = work.substring(0,1);	

});
$(document).ready(function(){
	


	//get the hash
	var hash = window.location.hash;
	
	//replace hash so we're left with a useable jquery selector
	var place = hash.replace("/","");
	//new gallery object
	var gal = new Gallery();
	var work = place.replace("#","");
	var first = work.substring(0,1);
	document.title = first.toUpperCase()+work.substring(1);
	if((document.getElementById(place.replace("#","")) === null)&&(hash !== "")){
		
		//get the title
		var title = place.replace("#","");
		
		gal.fetchItem(title,true);

	
	}else{
	

	if(hash === ""){
		$("#home").fadeIn("slow");
			localStorage.setItem("currentPage","#home");
	}else{

		//if we're on the work page, make sure to fetch work.
		if(place === "#work"){

						//new gallery object
						var gal = new Gallery();
						gal.fetchThumbs("#works-container");
						
						$("#work").fadeIn("slow");



		}else{
	
			$(place).fadeIn("slow");
	}
		//store our current location in the history
		localStorage.setItem("currentPage",place);
	}



	
}
});


$(window).bind('hashchange',function(){

	/*
		First clear out the works container
	*/
	$("#works-container").remove();
	$("#share").hide();
	//recreate it
	var works = document.createElement("section");
	works.id = "works-container";
	
	$("#work").append(works);
	
	//get hash
	var hash = window.location.hash;
	
	//grab the current page
	var current = localStorage.getItem("currentPage");
	
	//figure out where we want to go
	var place = hash.replace("/","");
	var work = place.replace("#","");
	
	
	//new gallery object
	var gal = new Gallery();
	

	
	if(document.getElementById(place.replace("#","")) === null){
		
		//get the title
		var title = place.replace("#","");
	
		gal.fetchItem(title);

		
		
	}else{
		var first = work.substring(0,1);
		document.title = first.toUpperCase()+work.substring(1);
	
	$(current).fadeOut("slow",function(){
		//if we're on the work page, make sure to fetch work.
		if(place === "#work"){
					//new gallery object
					var gal = new Gallery();
					gal.fetchThumbs("#works-container");
					
					$("#work").fadeIn("slow");



		}else{
					//fade in new location
					$(place).fadeIn("slow");
				
		}
	
	

		//clear the localStorage
		localStorage.removeItem("currentPage");
			localStorage.setItem("currentPage",place);
	});

	
}

});