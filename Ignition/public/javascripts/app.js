var width, height, center;
var points = 10;
var smooth = true;

//first set of waves
var path = new Path();

//second set of waves
var wave2 = new Path();


var mousePos = view.center / 2;
var pathHeight = mousePos.y;


path.fillColor = '#dfdfdf';
wave2.fillColor = "#fff";



initializePath();



function initializePath() {
    center = view.center;
    width = view.size.width;
    height = view.size.height / 1.1;


    path.segments = [];
	wave2.segments = [];
	
	
    path.add(view.bounds.bottomLeft);
    wave2.add(view.bounds.bottomLeft);

	for (var i = 1; i < points; i++) {
        var point = new Point(width / points * i, center.y);
        path.add(point);
		wave2.add(point);
    }

	wave2.add(view.bounds.bottomRight);
    path.add(view.bounds.bottomRight);


  //  path.fullySelected = true;
}

function onFrame(event) {

    for (var i = 1; i < points; i++) {
        var sinSeed = event.count + (i + i % 10) * 100;
    
		var sinHeight = Math.sin(sinSeed / 200)*50;
        var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
		var yPosAlt = Math.sin(sinSeed / 200) * sinHeight + height;
        path.segments[i].point.y = yPos;
		wave2.segments[i].point.y = yPosAlt+20;
		
    }
    if (smooth){
        path.smooth();
		wave2.smooth();
	}
}





/*-----------------

	Boid code
	
-----------------*/
function makeBoid(){
	var center,width,height;
	var boidCount = 20;
	var boidPath = new Path();

	boidPath.segments = [];

	center = view.center;
    width = view.size.width;
    height = view.size.height / 1.1;
  
	boidPath.add(view.bounds.bottomLeft);

	for (var i = 1; i < points; i++) {
        var point = new Point(20,20);
        boidPath.add(point);
	//	boidPath.segments[i].point.y*=i;
    }

	boidPath.fillColor = "red";
	boidPath.strokeColor = "red";
	



}




/*
var random = 0;
var point,point2;
var size,size2;
var path,path2;

var random2 = 0;


function onFrame(event) {
	random++;
 	
	random2++;
	
	
	point2 = new Point(Math.tan(random2),random);
	size2 = new Size(random2,random2);
	path2 = new Path.Rectangle(point2,size2);
	path2.strokeColor = 'black';
    // Each frame, rotate the path by 3 degrees:
    path2.rotate(random2);


	
	//
	point2 = new Point(Math.tan(random)/50, random2);
	size2 = new Size(random2,random2);
	path2 = new Path.Rectangle(point2,size2);
	path2.strokeColor = 'red';
    // Each frame, rotate the path by 3 degrees:
    path2.rotate(-random2);
	

	
}

*/
