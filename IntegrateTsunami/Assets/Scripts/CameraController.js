#pragma strict

// set camera angle from android
var angle_x : float ;
var angle_y : float ;
var angle_z : float ;

// camera smooth
var smooth : float = 5.0;

// ignore this amount of disorientation
var threshold : float = 1.0;

// keep update camera from unity
var AUTO_UPDATE : boolean = true ;

//
var LOCK_CAM : boolean = false;

// for galaxy bug
var GALAXY_FIX : boolean = false;

//
var GPS_UPDATE : boolean = true;

// On ground or not.
// If its true, force to grounded depends on userHeight.
var GROUNDING : boolean = true;
// User's height. Not camera.
var userHeight : float = 1.6;
//
var satelliteOffset : float = 3000.0;
//
var vMoveSmooth : float = 5.0;
//
var RPCSX : float = 0.0;
var RPCSY : float = 0.0;

//
var posX : float = 0.0;
var posZ : float = 0.0;

//
var height : float = 0.0;

// private variables
private var lastX : float ;
private var lastY : float ;
private var lastZ : float ;

//
var groundLayer : int = 9;
//
var layerMask = 1 << groundLayer;
//
var distanceFromGround : float = 0.0;
//
var raycastHitToGround : RaycastHit ;

//
var floodHeight : float = 0.0 ;

function Start () {

}

function Update () {
	
	if(AUTO_UPDATE){
		UpdateCameraRotation();
	}
	
	if(GPS_UPDATE){
	
	}
	
	updatePosition();
		
	if(GROUNDING){
		//grounding();
		var target : Vector3 = transform.position;
		target.y = userHeight ;
		transform.position = Vector3.Slerp(transform.position, target, Time.deltaTime * vMoveSmooth);
	}
	
	// 
	//updateFloodHeight();
}

//
function UpdateCameraRotation () {
	var target : Quaternion ;
	if(isOrientated())
	{
		target = Quaternion.Euler(angle_x, angle_z, -angle_y );
		if(GALAXY_FIX)	target = Quaternion.Euler(angle_x, angle_z, -angle_y+90);
		if(!LOCK_CAM)	transform.localRotation = Quaternion.Slerp(transform.localRotation, target, Time.deltaTime * smooth);
		
		lastX = angle_x;
		lastY = angle_y;
		lastZ = angle_z;
		
	}else{
		target = Quaternion.Euler(lastX, lastZ, -lastY );
		if(GALAXY_FIX)	target = Quaternion.Euler(lastX, lastZ, -lastY+90);
		if(!LOCK_CAM)	transform.localRotation = Quaternion.Slerp(transform.localRotation, target, Time.deltaTime * smooth);
	}
	
}

//
function isOrientated () : boolean {
	if(Mathf.Abs( angle_x-lastX ) >= threshold ||
		Mathf.Abs( angle_y-lastY )>= threshold ||
		Mathf.Abs( angle_z-lastZ )>= threshold )
	{
		return true;
	}
	return false ;
}

// Access from android
//
//
// camera rotation angle eular
function setAngleX ( x : String ) {	angle_x = float.Parse(x); }
function setAngleY ( y : String ) {	angle_y = float.Parse(y); }
function setAngleZ ( z : String ) {	angle_z = float.Parse(z); }
// rotate y +90 for galaxy glitch
function setGalaxyFix ( flag : String ) {	GALAXY_FIX = boolean.Parse(flag); }
//
function setSmooth ( value : String ) {		smooth = float.Parse(value); }
//
function setAutoUpdate ( flag : String ) {	AUTO_UPDATE = boolean.Parse(flag); }
//
function setLockCam ( flag : String ) {		LOCK_CAM = boolean.Parse(flag); }
//
function setUserHeight ( value : String ) {	userHeight = float.Parse(value); }
//
function setGrounding ( flag : String ) {	GROUNDING = boolean.Parse(flag); }
//
function setVMoveSmooth ( value : String ) {	vMoveSmooth = float.Parse(value); }

//RPCS
function setRPCSX ( value : String ) {	 RPCSX = float.Parse(value); }
function setRPCSY ( value : String ) {	 RPCSY = float.Parse(value); }

//X,Z
function setX ( value : String ) {	posX = float.Parse(value); }
function setZ ( value : String ) {	posZ = float.Parse(value); }

function forceUpdateLocation ( value : String ) {
	transform.position = Vector3( RPCSY, transform.position.y, RPCSX);
}


// [note]
// static function Raycast (	origin : Vector3,
//								direction : Vector3,
//								out hitInfo : RaycastHit,
//								distance : float = Mathf.Infinity,
//								layerMask : int = kDefaultRaycastLayers
//							) : boolean
//
function hitGround () : boolean {
	var pos : Vector3 = transform.position;
	pos.y += satelliteOffset;
	if (Physics.Raycast(pos, -Vector3.up, raycastHitToGround, Mathf.Infinity, layerMask )) {
		return true ;
	}
	return false ;
}

// do grounding
function grounding() {
	if(hitGround()) {
		var d : float = raycastHitToGround.distance - satelliteOffset ;
		var target : Vector3 = transform.position;
	//	target.y = target.y - d + userHeight ;
		target.y = userHeight ;
	//	transform.position = pos;
		transform.position = Vector3.Slerp(transform.position, target, Time.deltaTime * vMoveSmooth);
	}
}

function updatePosition () {
	var target : Vector3 = Vector3( RPCSY, transform.position.y, RPCSX);
	transform.position = Vector3.Slerp(transform.position, target, Time.deltaTime * vMoveSmooth);
}


function updateFloodHeight () {
	hitGround();
	var hit_y : float = raycastHitToGround.point.y ;
	var ws : GameObject = GameObject.Find("Water Surface");
	var ws_y : float = ws.GetComponent(WaterSurfaceController).height;
	
	// flood height = water height - hit point
	var f = ws_y - hit_y ;
	if( f < 0 )	f = 0;
	floodHeight = f ;
}