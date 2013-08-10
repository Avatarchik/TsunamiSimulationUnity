var url = "";
var latitude : float = 38.24905942;
var longitude : float = 140.91723748;

var ENABLE : boolean = true;

private var projector : Projector ;

function Start () {
	projector = GetComponent(Projector);

	updateGoogleMapTexture();
}

function updateGoogleMapTexture () {
	url="http://maps.google.com/maps/api/staticmap?center="+latitude+","+longitude+"&zoom=14&size=800x600&maptype=roadmap&sensor=true";

	var www : WWW = new WWW(url);
	yield www;

	//GetComponent(Projector).material.mainTexture = www.texture;
	projector.material.SetTexture("_ShadowTex", www.texture);
	//renderer.material.SetTexture("_BumpMap", bumpMap);
	
	// Adjest to main camera position.
	var cameraPosition : Vector3 = GameObject.Find("Main Camera").GetComponent(Transform).position;
	transform.position.x = cameraPosition.x;
	transform.position.z = cameraPosition.z;
}

function setLatitude ( lat : String ) {		latitude = float.Parse(lat); }
function setLongitude ( lon : String ) {	longitude = float.Parse(lon); }
function setEnable ( flag : String ) {		ENABLE = boolean.Parse(flag); }