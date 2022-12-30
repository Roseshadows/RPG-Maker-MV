// ====================================
//  SimpleSplashScreen.js
// ====================================
/*:
 * @plugindesc 简单地显示一张标题前图片。可用作展示LOGO或注意事项。
 * @arthor Rose_shadows (感谢鳗驼螺的教程)
 * @help
 * === 介绍 ===
 * 
 * 简单地显示一张标题前图片。可用作展示LOGO或注意事项。
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT协议
 * 
 * @param 标题前图片
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 要显示的图片资源。
 * @default Splash
 * 
 * @param 显示时长
 * @type number
 * @min 1
 * @desc 标题前图片的显示时长。
 * @default 60
 * 
 * @param 淡入淡出时长
 * @type number
 * @min 1
 * @desc 标题前图片淡入淡出的时长。
 * @default 24
 */
var Imported = Imported || {};
Imported.SimpleSplashScreen = true;

var RSSD = RSSD || {};
RSSD.SimpleSplashScreen = {};

var parameters = PluginManager.parameters('SimpleSplashScreen');
RSSD.SimpleSplashScreen.bitmap       = parameters['标题前图片'];
RSSD.SimpleSplashScreen.showDuration = parameters['显示时长'];
RSSD.SimpleSplashScreen.fadeDuration = parameters['淡入淡出时长'];

Scene_Boot.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_RSSDSplash);
    }
    this.updateDocumentTitle();
};

function Scene_RSSDSplash() {
    this.initialize.apply(this,arguments);
};

Scene_RSSDSplash.prototype = Object.create(Scene_Base.prototype);
Scene_RSSDSplash.prototype.constructor = Scene_RSSDSplash;

Scene_RSSDSplash.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_RSSDSplash.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this._wait = 0;
    this.splashImage = new Sprite();
    this.splashImage.bitmap = ImageManager.loadSystem(RSSD.SimpleSplashScreen.bitmap);
    this.splashImage.x = Graphics.width / 2;
    this.splashImage.y = Graphics.height / 2;
    this.splashImage.anchor.x = 0.5;
    this.splashImage.anchor.y = 0.5;
    this.addChild(this.splashImage);
};

Scene_RSSDSplash.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(RSSD.SimpleSplashScreen.fadeDuration);
};

Scene_RSSDSplash.prototype.stop = function() {
    Scene_Base.prototype.stop.call(this);
    var time = RSSD.SimpleSplashScreen.fadeDuration / 60;
    AudioManager.fadeOutBgm(time);
    AudioManager.fadeOutBgs(time);
    AudioManager.fadeOutMe(time);
    this.startFadeOut(RSSD.SimpleSplashScreen.fadeDuration);
};

Scene_RSSDSplash.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    AudioManager.stopAll();
};

Scene_RSSDSplash.prototype.update = function() {
    if(this.isActive() && !this.isBusy() && (Input.isTriggered('ok') || TouchInput.isTriggered())) {
        SceneManager.goto(Scene_Title);
        Window_TitleCommand.initCommandPosition();
        this._wait = -1;
        return;
    };
    if(this._wait === undefined) this._wait = 0;
    if(this._wait >= 0){
        if(this._wait >= RSSD.SimpleSplashScreen.showDuration) {
            SceneManager.goto(Scene_Title);
            Window_TitleCommand.initCommandPosition();
            this._wait = -1;
        } else {
            this._wait++;
        }
    };
    Scene_Base.prototype.update.call(this);
};