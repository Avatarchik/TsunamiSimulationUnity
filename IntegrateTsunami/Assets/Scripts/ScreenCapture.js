#pragma strict
import System.IO;

function captureScreen ( value : String ) {
	//var width = Screen.width;
	//var height = Screen.height;
	//var tex = new Texture2D(width, height, TextureFormat.RGB24, false);

	//tex.ReadPixels(Rect(0, 0, width, height), 0, 0);
	//tex.Apply();

	//var bytes = tex.EncodeToPNG();
	//Destroy(tex);
	var dt = System.DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss");
	//File.WriteAllBytes("/sdcard/DCIM/100ANDRO/"+"Tsunami_"+dt+".png", bytes);
	
	Application.CaptureScreenshot( "../../../../../sdcard/DCIM/100ANDRO/"+"Tsunami_"+dt+".png");

	
	
}