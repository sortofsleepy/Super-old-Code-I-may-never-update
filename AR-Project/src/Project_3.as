package
{
	import com.transmote.flar.FLARManager;
	import com.transmote.flar.marker.FLARMarker;
	import com.transmote.flar.marker.FLARMarkerEvent;
	import com.transmote.flar.utils.geom.FLARPVGeomUtils;
	import com.transmote.utils.time.FramerateDisplay;
	
	import flash.display.Sprite;
	import flash.events.Event;
	
	import org.libspark.flartoolkit.support.pv3d.FLARCamera3D;
	import org.papervision3d.materials.ColorMaterial;
	import org.papervision3d.materials.MovieMaterial;
	import org.papervision3d.objects.DisplayObject3D;
	import org.papervision3d.objects.parsers.DAE;
	import org.papervision3d.objects.primitives.Plane;
	import org.papervision3d.render.LazyRenderEngine;
	import org.papervision3d.scenes.Scene3D;
	import org.papervision3d.view.Viewport3D;
	
	[SWF(width='640', height='480', backgroundColor='#000000', frameRate='40')]
	
	public class Project_3 extends Sprite
	{
		//FLAR stuff
		private var fm:FLARManager;
		private var camera:FLARCamera3D;
		
	
			
		//Papervision stuff
		private var scene:Scene3D;
		private var view:Viewport3D;
		private var lre:LazyRenderEngine;
		
			
		
		//papervision objects
		private var p:Plane;
		private var p2:Plane;
		private var cameraModel:DAE;
		
		//materials
		//private var v:Vid;
		private var material:MovieMaterial;
		private var colorMat:ColorMaterial;
		
		//display containers to hold papervision objects
		private var cameraContainer:DisplayObject3D;
		private var movieContainer:DisplayObject3D;
		
		//variables for markers
		private var marker:FLARMarker;
		private var marker2:FLARMarker;
		private var v:Vid;
		
		public function Project_3()
		{
			initFLAR();
			cameraModel = new DAE(false,null,false);
			cameraModel.load("2.dae");
			v = new Vid();
			v.vid.source = "kramer.m4v";
			v.vid.stop();
		}
		
		private function initFLAR():void
		{
			fm = new FLARManager("flarConfig.xml");
			fm.addEventListener(FLARMarkerEvent.MARKER_ADDED, onAdded);
			fm.addEventListener(FLARMarkerEvent.MARKER_REMOVED, onRemoved);
			fm.addEventListener(Event.INIT, init3D);
			addChild(Sprite(fm.flarSource));
		}
		
		private function onAdded(e:FLARMarkerEvent):void
		{
			marker = e.marker;
			marker2 = e.marker;
			
			p.visible = true;
			
			cameraModel.play();
			v.vid.play();
		}
		
		private function onRemoved(e:FLARMarkerEvent):void
		{
			marker = null;
			marker2 = null;
			
			p.visible = false;
			cameraModel.stop();
			v.vid.stop();
		}
		
		private function init3D(e:Event):void
		{
			scene = new Scene3D();
			camera = new FLARCamera3D(fm.cameraParams);
			camera.z = -30;
			view = new Viewport3D(640, 480, true);
			lre = new LazyRenderEngine(scene, camera, view);
			
			
			//first object
			material = new MovieMaterial(v,false,true);
			p = new Plane(material, 320, 240, 2, 2);
			p.scaleY = -1;
			p.x = -60;
			p.z = 140;
			p.y = 10;
			p.rotationZ = 90;
			
			//second object
			cameraModel.scale = 5;
			//cameraModel.y = 100;
			cameraModel.rotationZ = 90;
			cameraModel.rotationY = 260;
			cameraModel.rotationX = 180;
			
			
			
			//container 1
			movieContainer = new DisplayObject3D();
			movieContainer.addChild(p);
			scene.addChild(movieContainer);
			
			//container 2
			cameraContainer = new DisplayObject3D();
			cameraContainer.addChild(cameraModel);
			scene.addChild(cameraContainer);
		
			addChild(view);
			//addChild(new FramerateDisplay());
		
			addEventListener(Event.ENTER_FRAME, loop);
		}
		
		private function loop(e:Event):void
		{
			if(marker != null)
			{
				movieContainer.transform = FLARPVGeomUtils.convertFLARMatrixToPVMatrix(marker.transformMatrix);
				cameraContainer.transform = FLARPVGeomUtils.convertFLARMatrixToPVMatrix(marker2.transformMatrix);
			}
			
			
			
			
			lre.render();
		}
		
		
	}
}







