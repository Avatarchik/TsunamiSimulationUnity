#pragma strict


private var rotateSpeed : float = 40 ;

function Start () {

}

function Update () {
	 transform.Rotate(Vector3.up * rotateSpeed * Time.deltaTime);
}