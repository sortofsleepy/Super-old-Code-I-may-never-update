
/*
	General Site JS should go here
*/

$(window).ready(function(){
	

});
$(document).ready(function() {
$("#main").fadeIn();




$("footer").click(function(){
	if($(this).hasClass("open") == false){
		$(this).animate({
			bottom:'0px'
		},400,function(){
			$(this).addClass("open");
	        $("#footer-title").addClass("footer-title-border");
			
			
		});
	

	}else if(($(this).hasClass("open") == true)){
		$(this).animate({
			bottom:'-300px'
		},400,function(){
			$(this).removeClass("open");
	        $("#footer-title").removeClass("footer-title-border");
			
			
			
		});
	
		
	}
});


$("#Contact-button").click(function(){


		if($("#contact").hasClass("contact-open") == false){
	
			$("#contact").animate({
		
				marginTop:['0px','easeInOutExpo'],
			},1200);
			$("#contact").addClass("contact-open");
			$("#Contact-button").innerHTML = "Close Contact";
	  
		}else if(($("section#contact").hasClass("contact-open") == true)){
		
			$("#contact").animate({
				marginTop:['-400px','easeInOutExpo'],
			},1200);
			$("#contact").removeClass("contact-open");
	                     	$("#Contact-button").innerHTML = "Contact";
						
		}
	
	


});//end contact open function


});


function backtotop(){
	$.scrollTo($("#top"),2000);
}



/*
	effects for page switching
*/
function onPageSwitch(id,newPage){
	
	$(id).fadeOut("slow");
	
	$(newPage).fadeIn();

}