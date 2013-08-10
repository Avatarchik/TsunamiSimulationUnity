#pragma strict

var height : float = 10.0;

var FLOOD_ANIMATION : boolean = false ;

var floodTimer : float ;
var floodTime : float ; // seconds
var floodTimeScale : float = 1.0;

var floodFrames : Array ;



function Start () {
	floodFrames = new Array(); // need initialize
	
	// test
	AddFloodKeyFrame( "1,3,2,5,4,8,10,15" );
	setHeight("15.0");
}

function Update () {
	if(FLOOD_ANIMATION){
		floodTime += Time.deltaTime * floodTimeScale;
		height = getFloodHeight(floodTime);
	}
	transform.position.y = height ;
}


// flood animation
//
//
function FloodReset () {	floodTime = 0.0; }

function FloodPlay () {		FLOOD_ANIMATION = true; }

function FloodStop () {		FLOOD_ANIMATION = false; }

// time(second), height, time,height...
//
//
function AddFloodKeyFrame ( contents : String ) {
	var readString : String[] = contents.Split(",".Chars[0]);
	if(readString.length % 2 == 0){
		for( var i:int = 0; i<readString.length; i+=2 ){
			var vec:Vector2 = Vector2(float.Parse(readString[i]), float.Parse(readString[i+1]));
			floodFrames.Add(vec);
		}
	}else{
		
	}
}
// Clear key frame.
function ResetFloodKeyFrame () {
	floodFrames.clear();
}

//
function getFloodHeight ( t : float ) : float {
	if(floodFrames.length == 0)	return 0.0;
	
	var vec : Vector2 ;
	for( var i:int = 0 ; i < floodFrames.length ; i++ ) {
		vec = floodFrames[i];
		if (vec.x > t) {
			if(i == 0){
				return Mathf.Lerp( 0.0, vec.y, ( t / vec.x ) );
			}else{
				var vec0:Vector2 = floodFrames[i-1];
				return Mathf.Lerp( vec0.y, vec.y, (t - vec0.x)/(vec.x - vec0.x));
			}
		}
	}
	return vec.y;
}

// Set water height manualy.
function setHeight ( y : String ) {	height = float.Parse(y); }