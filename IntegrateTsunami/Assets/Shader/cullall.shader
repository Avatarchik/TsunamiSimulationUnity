Shader "Library/Cull All"
{
	SubShader
	{
		Tags {"Queue" = "Background"}
		Blend SrcAlpha OneMinusSrcAlpha
		Lighting Off
		ZWrite On
		ZTest Less
		Pass
		{
			Cull Back
			Color(0,0,0,0)
		}
	}
}