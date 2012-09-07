	var container, stats,object;
			var camera, scene, projector, renderer;
			var particleMaterial;
			var geometry;
			var objects = [];
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			var mouseX = 0;
			var mouseY = 0;
			var x,y;
		
			animate();

			function init() {
			 	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				window.addEventListener( 'resize', onWindowResize, false );

				container = document.getElementById("background");
				document.body.appendChild( container );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
			//	info.innerHTML = '<a href="http://github.com/mrdoob/three.js" target="_blank">three.js</a> - clickable objects';
				container.appendChild( info );

				camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.y = 300;
				camera.position.z = 1400;

				scene = new THREE.Scene();

				geometry = new THREE.CubeGeometry( 100, 100, 100 );

	for ( var i = 0; i < 100; i ++ ) {

					object = new THREE.Mesh( geometry, [ new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ), new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, wireframe: true } ) ] );
					object.position.x = Math.random() * 800 - 400;
					object.position.y = Math.random() * 800 - 400;
					object.position.z = Math.random() * 800 - 400;
					object.scale.x = Math.random() * 2 + 1;
					object.scale.y = Math.random() * 2 + 1;
					object.scale.z = Math.random() * 2 + 1;
					object.rotation.x = ( Math.random() * 360 ) * Math.PI / 180;
					object.rotation.y = ( Math.random() * 360 ) * Math.PI / 180;
					object.rotation.z = ( Math.random() * 360 ) * Math.PI / 180;
					scene.addObject( object );

					objects.push( object );

				}

			

				var PI2 = Math.PI * 2;
				particleMaterial = new THREE.ParticleCanvasMaterial( {

					color: 0x000000,
					program: function ( context ) {

						context.beginPath();
						context.arc( 0, 0, 1, 0, PI2, true );
						context.closePath();
						context.fill();

					}

				} );

				projector = new THREE.Projector();

				renderer = new THREE.CanvasRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );

				container.appendChild( renderer.domElement );

			
			
				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				
				console.log(objects[0].position.x);
			}

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
				projector.unprojectVector( vector, camera );

				var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

				var intersects = ray.intersectObjects( objects );

				if ( intersects.length > 0 ) {

					intersects[ 0 ].object.materials[ 0 ].color.setHex( Math.random() * 0xffffff );

					var particle = new THREE.Particle( particleMaterial );
					particle.position = intersects[ 0 ].point;
					particle.scale.x = particle.scale.y = 8;
					scene.addObject( particle );

				}

				/*
				// Parse all the faces
				for ( var i in intersects ) {

					intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

				}
				*/
			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
			

			}

			var radius = 600;
			var theta = 0;



		
			
			
			/*-------------
			
				Mouse Events
				
			-----------------*/
				function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

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

			function render() {

				theta += 0.2;
				//camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
				//camera.position.y = radius * Math.sin( theta * Math.PI / 360 );
				//camera.position.z = radius * Math.cos( theta * Math.PI / 360 );
camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;	
				// 	camera.position.z += (  mouseX + camera.position.z ) * 0.05;	
				 			
		
				

				for ( var i = 0; i < 300; i ++ ) {
					
						object = new THREE.Mesh( geometry, [ new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ), new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, wireframe: true } ) ] );
						object.position.x = Math.random() * 800 - 400;
						object.position.y = Math.random() * 800 - 400;
						object.position.z = Math.random() * 800 - 400;
						object.scale.x = Math.random() * 2 + 1;
						object.scale.y = Math.random() * 2 + 1;
						object.scale.z = Math.random() * 2 + 1;
						object.rotation.x = ( Math.random() * 360 ) * Math.PI / 180;
						object.rotation.y = ( Math.random() * 360 ) * Math.PI / 180;
						object.rotation.z = ( Math.random() * 360 ) * Math.PI / 180;
						
						objects.push( object );
					var dx = mouseX - objects[i].position.x;
					var dy = -mouseY - objects[i].position.y;
					
					objects[i].position.x += (dx)*0.05*Math.cos(i);
					objects[i].position.y += (dy)*0.05*Math.sin(i);
					
					

				}



				renderer.render( scene, camera );

			}



