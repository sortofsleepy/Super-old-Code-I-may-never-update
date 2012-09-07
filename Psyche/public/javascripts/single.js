
$(window).ready(function(){

});


$(document).ready(function() {


 $("#main").animate({
    opacity:1
 },200,"swing");

  $("#page-content").animate({
    opacity:1
  },400,"easeInSine");
if($("img").length != 0){
    
  $("img").load(function(a,b){
      $(this).fadeIn(400,"easeInSine");
  });
}

    //other triggers for other effects.
    $("#slider").nivoSlider();
  
    SyntaxHighlighter.all();

});

