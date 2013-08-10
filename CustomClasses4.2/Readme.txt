カスタムのclasses.jarを作成します。

■必要なファイル

classes.jar
	
	EclipseでUnityEngineを使ったapkを作成するのに使います。
	"インストールフォルダ\Editor\Data\PlaybackEngines\androidplayer\bin"
	の中にあります。


android.jar
	
	Androidのライブラリです。classを作成するときに使います。
	Android SDKの中にあります。


JDK1.6
	
	.classファイルを作成するのに必要です。
	コマンドラインから使えるようにPATHを通しておきます。
	1.7ではエラーが出ます。(2013/08/10現在）


■手順

1.オリジナルのclasses.jarを展開します。（unpackClasses.bat）


2.UnityPlayerActivity.javaを編集します。
　（その他必要なファイルを編集します）
　
　
3.UnityPlayerActivity.classを作成します。（makeClass.bat）
　（1で展開した同名のファイルが置換されます）


4.カスタムのclasses.jarファイルを作成します。（makejar.bat）
　（customclasses.jarという名前で作成されます）


5.Eclipseプロジェクトのlibs内に置きます。
　classes.jarを置換する形で設置します。