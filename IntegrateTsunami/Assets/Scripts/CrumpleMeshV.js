// This script is placed in public domain. The author takes no responsibility for any possible harm.

var scale = 1.0;
var speed = 1.0;
var recalculateNormals = false;

// flag for animation
private var WAVING : boolean = true;

private var baseVertices : Vector3[];
private var noise : Perlin;

function Start ()
{
	noise = new Perlin ();
}

function Update () {
	
	// animation off
	if(!WAVING)	return;
	
	var mesh : Mesh = GetComponent(MeshFilter).mesh;
	
	if (baseVertices == null)
		baseVertices = mesh.vertices;
		
	var vertices = new Vector3[baseVertices.Length];
	
	//~ var timex = Time.time * speed + 0.1365143;
	var timey = Time.time * speed ;
	//~ var timez = Time.time * speed + 2.5564;
	for (var i=0;i<vertices.Length;i++)
	{
		var vertex = baseVertices[i];
				
		//~ vertex.x += noise.Noise(timex + vertex.x, timex + vertex.y, timex + vertex.z) * scale;
		vertex.y += noise.Noise(timey + vertex.x, timey + vertex.y, timey + vertex.z) * scale;
		//~ vertex.z += noise.Noise(timez + vertex.x, timez + vertex.y, timez + vertex.z) * scale;
		
		vertices[i] = vertex;
	}
	
	mesh.vertices = vertices;
	
	if (recalculateNormals)	
		mesh.RecalculateNormals();
	mesh.RecalculateBounds();
}

//
function setWavingAnimation ( flag : String ) {	WAVING = boolean.Parse(flag); }
function setWavingScale ( s : String ) {	scale = float.Parse(s); }
function setWavingSpeed ( s : String ) {	speed = float.Parse(s); } 
