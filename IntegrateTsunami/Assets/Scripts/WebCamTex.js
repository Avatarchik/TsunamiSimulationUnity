var webcamTexture:WebCamTexture ;
var devices:WebCamDevice[] ;
var m_Camera:Camera;

var mScreenOrientation : ScreenOrientation ;
var mScreenWidth : int;
var mScreenHeight : int;

var mWebCamTextureWidth : int = 800 ;
var mWebCamTextureHeight : int = 1280 ;

var vh : float ;

var MODE_NEXUS : boolean = true ;

function Start () {
	devices = WebCamTexture.devices;
	if (devices.length > 0) {
		webcamTexture = WebCamTexture(mWebCamTextureWidth, mWebCamTextureHeight, 12);
		renderer.material.mainTexture = webcamTexture;
		webcamTexture.Play();
	} else {
		Debug.LogError("Web");
	}
	
	CreateVideoMesh(10, 10);
}

function Update() {
	if (mScreenOrientation != Screen.orientation ||
                     mScreenWidth != Screen.width ||
                     mScreenHeight != Screen.height)
	{
		// Position the video mesh
		PositionVideoMesh();
	}

}


function PositionVideoMesh()
{
	// Cache the screen orientation and size
	mScreenOrientation = Screen.orientation;
	mScreenWidth = Screen.width;
	mScreenHeight = Screen.height;

	// Reset the rotation so the mesh faces the camera
	gameObject.transform.localRotation = Quaternion.AngleAxis(270.0, Vector3.right);

	// Adjust the rotation for the current orientation
	if (mScreenOrientation == ScreenOrientation.Landscape)
	{
		gameObject.transform.localRotation *= Quaternion.identity;
	}
	else if (mScreenOrientation == ScreenOrientation.Portrait)
	{
		gameObject.transform.localRotation *= Quaternion.AngleAxis(270.0, Vector3.up);
	}
	else if (mScreenOrientation == ScreenOrientation.LandscapeRight)
	{
		gameObject.transform.localRotation *= Quaternion.AngleAxis(180.0, Vector3.up);
	}
	else if (mScreenOrientation == ScreenOrientation.PortraitUpsideDown)
	{
		gameObject.transform.localRotation *= Quaternion.AngleAxis(270.0, Vector3.up);
	}
	
	
	// Scale game object for full screen video image:
	gameObject.transform.localScale = new Vector3(1, 1, 1.0 * webcamTexture.height / webcamTexture.width );
	
	
	if (m_Camera.orthographic)
	{
		// Set the scale of the orthographic camera to match the screen size:

		// Visible portion of the image:
		var visibleHeight : float = 0;
		if (ShouldFitWidth())
		{
			visibleHeight = 1.0 * mScreenHeight / mScreenWidth ;
		}
		else
		{
			visibleHeight = 1.0;
		}
		
		m_Camera.orthographicSize = visibleHeight * 5.0;
		m_Camera.orthographicSize = 5.0;
		vh = visibleHeight;
	}
	
	//
	if ( MODE_NEXUS )
	{
		gameObject.transform.Rotate(Vector3.up * 180);
	}
}


function ShouldFitWidth():boolean
{
	if (mScreenWidth > mScreenHeight)
	{
		var height : float = webcamTexture.height * ( 1.0 * mScreenWidth / webcamTexture.width );
		
		return (height >= mScreenHeight);
	}
	else
	{
		var width : float = webcamTexture.height * ( 1.0 * mScreenHeight / webcamTexture.width );
		
		return (width < mScreenWidth);
	}
}

function CreateVideoMesh( numRows : int , numCols : int ):Mesh
{
	var mesh : Mesh = new Mesh();

	// Build mesh:
	mesh.vertices = new Vector3[numRows * numCols];
	var vertices : Vector3[] = mesh.vertices;

	for (var r : int = 0; r < numRows; ++r)
	{
		for (var c : int = 0; c < numCols; ++c)
		{
			var x : float = ((c * 1.0) / ((numCols-1) * 1.0)) - 0.5;
			var z : float = (1.0 - (1.0 * r) / (1.0 * (numRows-1))) - 0.5;

			vertices[r * numCols + c].x = x * 2.0;
			vertices[r * numCols + c].y = 0.0;
			vertices[r * numCols + c].z = z * 2.0;
		}
	}
	mesh.vertices = vertices;

	// Builds triangles:
	mesh.triangles = new int[numRows*numCols*2*3];
	var triangleIndex : int = 0;

	// Setup UVs to match texture info:
	var scaleFactorX = 1.0 * webcamTexture.width / Screen.width;
	var scaleFactorY = 1.0 * webcamTexture.height / Screen.height ;

	mesh.uv = new Vector2[numRows * numCols];

	var triangles : int[] = mesh.triangles;
	var uvs : Vector2[] = mesh.uv;

	for (r = 0; r < numRows-1; ++r)
	{
		for (c = 0; c < numCols-1; ++c)
		{
			// p0-p3
			//  |\ |
			// p2-p1

			var p0Index : int = r * numCols + c;
			var p1Index : int = r * numCols + c + numCols + 1;
			var p2Index : int = r * numCols + c + numCols;
			var p3Index : int = r * numCols + c + 1;

			triangles[triangleIndex++] = p0Index;
			triangles[triangleIndex++] = p1Index;
			triangles[triangleIndex++] = p2Index;

			triangles[triangleIndex++] = p1Index;
			triangles[triangleIndex++] = p0Index;
			triangles[triangleIndex++] = p3Index;

			uvs[p0Index] = new Vector2((1.0 * c) / (1.0 * (numCols-1)) * scaleFactorX,
											(1.0 * r) / (1.0 * (numRows-1)) * scaleFactorY);

			uvs[p1Index] = new Vector2((1.0 * (c + 1)) / (1.0 * (numCols - 1)) * scaleFactorX,
							(1.0 * (r + 1)) / (1.0 * (numRows - 1)) * scaleFactorY);

			uvs[p2Index] = new Vector2((1.0 * c) / (1.0 * (numCols - 1)) * scaleFactorX,
						(1.0 * (r + 1)) / (1.0 * (numRows - 1)) * scaleFactorY);

			uvs[p3Index] = new Vector2((1.0 * (c + 1)) / (1.0 * (numCols - 1)) * scaleFactorX,
						(1.0 * r) / (1.0 * (numRows - 1)) * scaleFactorY);
		}
	}

	mesh.triangles = triangles;
	mesh.uv = uvs;

	mesh.normals = new Vector3[mesh.vertices.Length];
	mesh.RecalculateNormals();

	return mesh;
}