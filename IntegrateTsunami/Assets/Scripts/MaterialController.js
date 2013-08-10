#pragma strict
// 0 = textured
// 1 = transparent
// 2 = cull
// 3 = projected
var MATERIAL_MODE : int = 0;
var mat0 : Material ;
var mat1 : Material ;
var mat2 : Material ;
var mat3 : Material ;
var materialColor : Color ;
var materialAlpha : float = 0.5; // Applied if transparent

var TAG : String ;
var objects : GameObject[] ;


function Start () {
	TAG = gameObject.tag;
	
	objects = GameObject.FindGameObjectsWithTag(TAG);
	
	//test
	
	updateMaterial();
}

function Update () {

}

function changeMaterials ( m : Material ) {
	if(objects == null)	return;
	for (var o : GameObject in objects) {
		if(o.GetComponent(Renderer) != null){
			o.renderer.material = m;
			if(MATERIAL_MODE == 1)
				o.renderer.material.color.a = materialAlpha;
		}
	}
}


//
function setMaterialMode ( i : String ) {
	MATERIAL_MODE = int.Parse(i);
	updateMaterial();
}
//
function updateMaterial () {
	switch (MATERIAL_MODE) {
		case 0:
			changeMaterials(mat0);
			break;
		case 1:
			changeMaterials(mat1);
			break;
		case 2:
			changeMaterials(mat2);
			break;
		case 3:
			changeMaterials(mat3);
			break;
		default:
			break;
	}
}

//
function setMaterialColor ( c : String ) {}
//
function setMaterialAlpha ( a : String ) {	materialAlpha = float.Parse(a); }