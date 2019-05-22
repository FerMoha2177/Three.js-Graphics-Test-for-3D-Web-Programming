
//function to load resources

var gl;
var scene, camera, renderer, shape, wire , loader, obj,
		material, game, controls, color, player, god;

var mousePos={x:0, y:0};

var WIDTH, HEIGHT;

var ASPECT_RATIO = WIDTH / HEIGHT;


function InitDemo(){

	//scene and renderer initialization
	initScene();

	//scene =  new THREE.Scene();
	// camera = new THREE.PerspectiveCamera(75, ASPECT_RATIO, 0.1, 1000);
	//
	// renderer = new THREE.WebGLRenderer( );
	// renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	// renderer.setSize(WIDTH, HEIGHT);
	// document.body.appendChild(renderer.domElement);


	//camera.position.z = 5;
	//camera.position.y = 1;



	//Filling the Scene
	initGod();
	initPlayer();

	initGround();

	initControls();


//Resizes Viewport
	window.addEventListener('resize', viewPortResize, false);

}

var initPlayer = function(){

	var playerGeometry = new THREE.BoxGeometry(1, 1, 1);
	var playerMaterial = new THREE.MeshBasicMaterial({color: 0x885352});
	player = new THREE.Mesh( playerGeometry, playerMaterial );
	player.castShadow = true;
	player.recieveShadow = false;
	player.position.y = 2;


	var geo = new THREE.EdgesGeometry(playerGeometry);
	var lines =  new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 50 } );
	wire = new THREE.LineSegments( geo, lines );

	wire.position.x = player.position.x;
	wire.position.y = player.position.y;
	wire.position.z = player.position.z;


	scene.add(player);
	scene.add(wire);

	console.log( "ACTION!");

};

//initialize Scene, Camera, and Renderer
var initScene = function(){

	HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;


	scene =  new THREE.Scene( );

	//scene.fog = new THREE.FogExp2( 0xf0fff0, 0.14 );

	camera = new THREE.PerspectiveCamera( 75, ASPECT_RATIO, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer();
	//renderer.setClearColor(0xfffafa, 1);
	//renderer.shadowMap.enabled = true
  //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize( WIDTH, HEIGHT );

  //camera.position.x = player.position.x;
	//camera.position.y = player.position.y;
	camera.position.z = 5;
	camera.position.y = 1;

	document.body.appendChild( renderer.domElement );
	console.log( "CAMERA!" );


};

var initGround = function (){
	//Floor code
	var floorGeometry = new THREE.PlaneGeometry(5, 5, 4 ,4 );
	//replace texure name
	var floorMat = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load('grass.jpg'),
	                                              side: THREE.DoubleSide});

	var floor = new THREE.Mesh(floorGeometry, floorMat);
	floor.receiveShadow = true;
	floor.castShadow = false;

	floor.rotation.x = -Math.PI/2;
	scene.add( floor );
};


var initGod = function(){
		var hemisphereLight = new THREE.HemisphereLight(0xfffafa,0x000000, .9);
		scene.add(hemisphereLight);
 		god = new THREE.DirectionalLight( 0xcdc1c5, 0.9);
		god.position.set( 12,6,-7 );
		god.castShadow = true;


	//God will be the lighting on the Scene
	  god = new THREE.DirectionalLight( 0xffffff, 0.8);
		god.position.set( 0,4,1 );
		god.castShadow = true;

	//properties of god
		god.shadow.mapSize.width = 256;
		god.shadow.mapSize.height = 256;
		god.shadow.camera.near = 0.5;
		god.shadow.camera.far = 50 ;

		scene.add(god);
		console.log("LIGHTS");

};

var initControls = function(){
	//Using THREE.js Orbital controls

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );

	controls.enableZoom = false;
};





//game logic


var update = function(){

	player.rotation.x += 0.01;
	wire.rotation.x  += 0.01;

	player.rotation.y += 0.05;
	wire.rotation.y  += 0.05;

	player.rotation.z += 0.06;
	wire.rotation.z  += 0.06;

};



//draws scene
var render = function(){
	renderer.render(scene, camera);

};

//runs game loop  processInput --> update() --> render()
var GameLoop = function(){

 requestAnimationFrame( GameLoop );
 update();
 render();

};

var viewPortResize = function(){
	h = window.innerHeight;
  w = window.innerWidth;
	renderer.setSize(w, h);
	camera.aspect = w / h;
	camera.updateProjectionMatrix();

};

var mouseHandler = function( e ){


	var tx = -1 + (e.clientX / WIDTH)*2;
	var ty = 1 - (e.clientY / HEIGHT)*2;
	mousePos = {x:tx, y:ty};

};

function handleTouchMove(e) {
    e.preventDefault();
    var tx = -1 + (e.touches[0].pageX / WIDTH)*2;
    var ty = 1 - (e.touches[0].pageY / HEIGHT)*2;
    mousePos = {x:tx, y:ty};
}

function runDemo( e ){
	InitDemo();
	//document.addEventListener('mousemove', mouseHandler, false);
	//document.addEventListener('mousemove', mouseHandler, false);
	console.log("SETUP!");
	GameLoop();
}
