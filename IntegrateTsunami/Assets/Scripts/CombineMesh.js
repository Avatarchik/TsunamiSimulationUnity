#pragma strict

@script RequireComponent(MeshFilter)
@script RequireComponent(MeshRenderer)
function Awake () {
    var meshFilters : Component[] = GetComponentsInChildren(MeshFilter);
    var combine : CombineInstance[] = new CombineInstance[meshFilters.length];
    for ( var i:int = 0; i < meshFilters.length; i++){
    	var m : MeshFilter = meshFilters[i];
        combine[i].mesh = m.sharedMesh;
        combine[i].transform = meshFilters[i].transform.localToWorldMatrix;
        meshFilters[i].gameObject.SetActive(false);
    }
    transform.GetComponent(MeshFilter).mesh = new Mesh();
    transform.GetComponent(MeshFilter).mesh.CombineMeshes(combine);
    transform.gameObject.SetActive(false);
}

function Start () {
	transform.rotation.y = 0 ;
}

function Update () {

}