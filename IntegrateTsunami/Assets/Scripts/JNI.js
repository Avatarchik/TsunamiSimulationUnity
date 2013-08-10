#pragma strict

var cls_UnityPlayer : AndroidJavaClass ;
var obj_Activity : AndroidJavaObject ;
var cls_MainActivity : AndroidJavaClass ;

var b : boolean = true ;

function Start () {

#if !UNITY_EDITOR
	AndroidJNI.AttachCurrentThread();
	cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
	obj_Activity = cls_UnityPlayer.GetStatic.<AndroidJavaObject>("currentActivity");
#else
#endif
}

function sendFloodHeight() {
	var mc : GameObject = GameObject.Find("Main Camera");
	var f : double = mc.GetComponent(CameraController).floodHeight;
	Debug.Log("flood:"+f);
#if !UNITY_EDITOR
	obj_Activity.Set.<double>("floodHeight", f);
#else
#endif
}

function Update() {
	sendFloodHeight();
}