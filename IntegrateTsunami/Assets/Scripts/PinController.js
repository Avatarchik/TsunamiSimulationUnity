#pragma strict

var mainCamera : Camera ;
var pinPrefab : GameObject ;

private var folderName = "pins" ;

function Start () {
	
}

function Update () {

}

function addPin () {
	var pins = GameObject.Find(folderName);
	
	if ( pins == null ){
		pins = new GameObject();
		pins.name = "pins";
	}
	
	var new_pin = Instantiate(pinPrefab, mainCamera.transform.position, Quaternion.identity);
	new_pin.transform.parent = pins.transform ;
}

function AndroidPinCurrentLocation ( dummy : String ) {
	addPin();
}

function AndroidClearPin ( dummy : String ) {
	var go = GameObject.Find(folderName);
	Destroy(go);
	
}