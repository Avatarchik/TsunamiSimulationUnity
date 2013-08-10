#pragma strict

var mainCam : Camera ;

function Start () {

}

function Update () {
	
	this.transform.position.x = mainCam.transform.position.x ;
	this.transform.position.z = mainCam.transform.position.z ;
	this.transform.rotation = mainCam.transform.rotation ;

}