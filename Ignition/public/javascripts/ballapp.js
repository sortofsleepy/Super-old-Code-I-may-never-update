		var container, stats;
			var camera, scene, renderer, particles, geometry, material, i, h, color, colors = [], sprite, size, x, y, z,light;
			var mouseX = 0, mouseY = 0;
 
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			
			
		
		
			
			function init(){
				
		
				container = document.getElementById("background");
		
 
				camera = new THREE.Camera( 50, window.innerWidth / window.innerHeight, 1, 3000 );
				camera.position.z = 1400;
 
				scene = new THREE.Scene();
				//scene.fog = new THREE.FogExp2( 0x000000, 0.0009 );
 
				geometry = new THREE.Geometry();
 
				sprite = THREE.ImageUtils.loadTexture( "/images/ball.png" );
 
				for ( i = 0; i < 2000; i++ ) {
 					
 					x = 1500 * Math.random() - 1000;
					y = 2000 * Math.random() - 1000;
					z = 2000 * Math.random() - 1000;
					
					vector = new THREE.Vector3( x, y, z );
					geometry.vertices.push( new THREE.Vertex( vector ) );
 
					colors[ i ] = new THREE.Color( 0xffffff );
					colors[ i ].setHSV( (x+1000)/2000, 1.0, 1.0 );
 
				}
 				
				geometry.colors = colors;
 				
				material = new THREE.ParticleBasicMaterial( { size: 85, map: sprite, vertexColors: true } );
				material.color.setHSV( 1.0, 0.2, 0.8 );
 
				particles = new THREE.ParticleSystem( geometry, material );
				console.log(geometry);
				
				particles.sortParticles = true;
				particles.updateMatrix();
				scene.addObject( particles );
 
				
 
				renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
 
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				document.addEventListener('click',onMouseClick,false);
				window.addEventListener( 'resize', onWindowResize, false );
 				animate();
			}
			
			/*-------------
			
				Mouse Events
				
			-----------------*/
				function onDocumentMouseMove( event ) {
 
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
 
			}
 
 
 			function onMouseClick(){
 				
 				for (var a = 0; a < 2000; a++ ) {
 					
 					var currentX = geometry.vertices[a].position.x; 				
					var currentY = geometry.vertices[a].position.y;
					var currentZ = geometry.vertices[a].position.z;
					
					var dx = currentX - geometry.vertices[a].position.x;
 					var dy = -currentY - geometry.vertices[a].position.y;
 					var dz = currentZ - geometry.vertices[a].position.z;
 
 
 					geometry.vertices[a].position.x -= ((dx)*0.05*Math.sin(a))*-1;
						
					geometry.vertices[a].position.y -=  ((dy)*0.05*Math.sin(a))*-1;
					geometry.vertices[a].position.z -=  ((dz)*0.05*Math.sin(a))*-1;;
				}
 			}
			function onDocumentTouchStart( event ) {
 
				if ( event.touches.length == 1 ) {
 
					event.preventDefault();
 
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
 
				}
			}
 
			function onDocumentTouchMove( event ) {
 
				if ( event.touches.length == 1 ) {
 
					event.preventDefault();
 
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
 
				}
 
			}
 
			function onWindowResize( event ) {
 
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
 
				renderer.setSize( window.innerWidth, window.innerHeight );
 
			}


			/*
				Animate and 
				Render
			*/
			
			function animate() {
 
				requestAnimationFrame( animate );
 
				render();
			
 
			}
 
			function render() {
 
				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;	
 				
 				
 				
 				for (var a = 0; a < 2000; a++ ) {
 					var dx = mouseX - geometry.vertices[a].position.x;
 					var dy = -mouseY - geometry.vertices[a].position.y;
 					var dz = mouseX - geometry.vertices[a].position.z;
 				
 					geometry.vertices[a].position.x+=(dx)*0.05*Math.sin(a);
				
					geometry.vertices[a].position.y+=(dy)*0.05*Math.sin(a);
				
				
 
				}
 				
 				
 			
 				
				renderer.render( scene, camera );
 
			}
			