#pragma strict

var waterHeightIndicator : boolean = false ;
var waterHeightLabel : GUIText ;
var waterHeightTextM : GUIText ;
var waterHeightText : GUIText ;
var waterHeightTexture : GUITexture ;
var waterHeightFromGround : float ;

var floodAnimation = false ;
var timeBackGround : GUITexture ;
var timeLabel : GUIText;
var timeMinuteText : GUIText;
var timeMinuteLabel : GUIText;
var timeSecondText : GUIText;
var timeSecondLabel : GUIText;
var timeScaleText : GUIText;
var timeScaleLabel : GUIText;

private var waterSurface : GameObject ;

function Start () {
	waterSurface = GameObject.Find("Water Surface");
	setWaterHeightIndicator("true");
}

function Update () {
	if(waterHeightIndicator){
		var height : float = waterSurface.GetComponent(WaterSurfaceController).height;
		waterHeightText.text = height.ToString("f1");
	}
	
	if(waterSurface.GetComponent(WaterSurfaceController).FLOOD_ANIMATION){
		timeScaleText.text = waterSurface.GetComponent(WaterSurfaceController).floodTimeScale.ToString("f1");
		var t = waterSurface.GetComponent(WaterSurfaceController).floodTime;
		var m = (t / 60);
		timeMinuteText.text = "" + Mathf.Floor(m);
		var s = (t % 60);
		timeSecondText.text = "" + Mathf.Floor(s);
	}
}

function OnGUI () {
	
}

function setWaterHeightIndicator ( flag : String ) {
	waterHeightIndicator = boolean.Parse(flag);
	waterHeightLabel.enabled = waterHeightIndicator;
	waterHeightTextM.enabled = waterHeightIndicator;
	waterHeightText.enabled = waterHeightIndicator;
	waterHeightTexture.enabled = waterHeightIndicator;
}

function setTimeIndicator ( flag : String ) {
	floodAnimation = boolean.Parse(flag);
	timeBackGround.enabled = floodAnimation;
	timeLabel.enabled = floodAnimation;
	timeMinuteText.enabled = floodAnimation;
	timeMinuteLabel.enabled = floodAnimation;
	timeSecondText.enabled = floodAnimation;
	timeSecondLabel.enabled = floodAnimation;
	timeScaleText.enabled = floodAnimation;
	timeScaleLabel.enabled = floodAnimation;
}