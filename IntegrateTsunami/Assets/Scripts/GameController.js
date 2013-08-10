#pragma strict



var MAP_MAXIMIZED : boolean = false ;
var minimapCamera : Camera ;

function Start () {
	
}

function Update () {

}

function AndroidToggleMap ( dummy : String ) {
	
	if ( MAP_MAXIMIZED == false ){
		//maximize
		//( X, Y, width, height )
		minimapCamera.rect = Rect ( 0, 0, 1, 1 );
		
		MAP_MAXIMIZED = true;
		
	}else if ( MAP_MAXIMIZED == true){
		//minimize
		minimapCamera.rect = Rect ( 0.55, 0.75, 0.45, 0.25 );
		
		MAP_MAXIMIZED = false;
	}	
	
}