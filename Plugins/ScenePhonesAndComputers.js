// 游戏中要用的手机界面。
// 需要SceneDesktop.js作为前置插件。

/*:
 * @plugindesc 真正创建界面的代码。需要 SceneDesktop.js 提供父类。
 * @author 离影玫 | Rose_shadows
 * @help 直接在代码中修改吧。
 */

/**
 * Francis' phone
 */

function Window_FrancisPhone() {
    this.initialize.apply(this, arguments);
}

Window_FrancisPhone.prototype = Object.create(Window_Desktop.prototype);
Window_FrancisPhone.prototype.constructor = Window_FrancisPhone;

Window_FrancisPhone.prototype.initialize = function(x, y) {
    this._iconList = [160,161,162,163,164,165];
    this._standardBackOpacity = 0;
    this._frameOpacity = 0;
    Window_Desktop.prototype.initialize.call(this, x, y);
}

Window_FrancisPhone.prototype.windowWidth = function() {
    return 287;
}

Window_FrancisPhone.prototype.windowHeight = function() {
    return 512;
}

Window_FrancisPhone.prototype.numVisibleRows = function() {
    return 7;
}

Window_FrancisPhone.prototype.maxCols = function() {
    return 4;
}

Window_FrancisPhone.prototype.lineHeight = function() {
    return this.iconDrawingHeight() + this.standardFontSize() + this.iconTextDistance() + 18;
}

Window_FrancisPhone.prototype.standardFontSize = function() {
    return 16;
}

Window_FrancisPhone.prototype.iconTextDistance = function() {
    return 2;
}

Window_FrancisPhone.prototype.makeCommandList = function() {
    this.addCommand('搜索', 'search1', true);
    this.addCommand('备忘录', 'notebook1', true);
    this.addCommand('视频', 'video1', true);
    this.addCommand('照片', 'photo1', true);
    this.addCommand('电话簿', 'phonelist1', true);
    this.addCommand('关机', 'shutdown1', true);
}

function Scene_FrancisPhone() {
    this.initialize.apply(this, arguments);
}

Scene_FrancisPhone.prototype = Object.create(Scene_Desktop.prototype);
Scene_FrancisPhone.prototype.constructor = Scene_FrancisPhone;

Scene_FrancisPhone.prototype.initialize = function() {
    Scene_Desktop.prototype.initialize.call(this);
}

Scene_FrancisPhone.prototype.create = function() {
    Scene_Desktop.prototype.create.call(this);
    this.createPhoneWindow();
}

Scene_FrancisPhone.prototype.createPhoneWindow = function() {
    this._phoneWindow = new Window_FrancisPhone(268, 63);
    this._phoneWindow.setHandler('search1',     this.onFirst.bind(this));
    this._phoneWindow.setHandler('notebook1',   this.onSecond.bind(this));
    this._phoneWindow.setHandler('video1',      this.onThird.bind(this));
    this._phoneWindow.setHandler('photo1',      this.onForth.bind(this));
    this._phoneWindow.setHandler('phonelist1',  this.onFifth.bind(this));
    this._phoneWindow.setHandler('shutdown1',   this.exitPhone.bind(this));
    this._phoneWindow.setHandler('cancel',      this.popScene.bind(this));
    this.addWindow(this._phoneWindow);
}

// 指令相关的方法。
Scene_FrancisPhone.prototype.onFirst = function() {
    SceneManager.push(Scene_Item);
}

Scene_FrancisPhone.prototype.onSecond = function() {
    SceneManager.push(Scene_Options);
}

Scene_FrancisPhone.prototype.onThird = function() {
    SceneManager.push(Scene_Save);
}

Scene_FrancisPhone.prototype.onForth = function() {
    SceneManager.push(Scene_Debug);
}

Scene_FrancisPhone.prototype.onFifth = function() {
    SceneManager.push(Scene_Load);
}

Scene_FrancisPhone.prototype.exitPhone = function() {
    SceneManager.pop();
}

Scene_FrancisPhone.prototype.createBackground = function() {
    Scene_Desktop.prototype.createBackground.call(this);
    var x = SceneManager._screenWidth/2;
    var y = SceneManager._screenHeight/2;
    this.addExtendedSprite('img/pictures/','Phone-1',x+50,y+30,255,$gameSwitches.value(15));
}