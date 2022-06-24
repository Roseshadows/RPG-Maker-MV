/**
 * 电脑/手机桌面样式界面的父类。
 */

/*:
 * @plugindesc 电脑/手机桌面样式界面的父类。单用没有任何效果。
 * @author 离影玫 | Rose_shadows
 * @help
 * === 指引 === （怕自己忘了...）
 * 
 * 该代码提供两个类：Window_Desktop(x, y) 和 Scene_Desktop 。
 * 注意，目前的写法只能实现静态绘制界面。游戏中实时增加、删除指令的功能
 * 有待开发。
 * 
 * ----------------------------------------------------------------------------
 * === Window_Desktop ===
 * 
 * <== 父类 ==>
 *   Window_Command
 * 
 * <== 特殊属性 ==>
 * 
 *  this._iconList 
 *    (Type: Array) - 存放图标序列的数组。存放顺序和后面this.addCommand时添
 *                    加指令的顺序一一对应。
 *  this._standardBackOpacity 
 *    (Type: Number) - 窗口背景的不透明度。
 *  this._frameOpacity 
 *    (Type: Number) - 窗口边框的不透明度。
 * 
 *  *注：给属性赋值时，建议将属性放在方法外面。
 * 
 *  *注：由于重写了 this.standardBackOpacity() 方法，
 *   this._standardBackOpacity 和 this._frameOpacity 代替了 
 *   this.standardBackOpacity() 方法所实现的功能。
 *   所以在写该类的子类时，若想调整不透明度，请直接给以上两种属性赋值，
 *   否则需自行重写 this.standardBackOpacity() 。
 * 
 * <== 特殊方法 ==>
 * 
 *  this.iconDrawingWidth() 
 *    - 返回*实际绘制*的图标宽度。默认是32。
 *  this.iconDrawingHeight() 
 *    - 返回*实际绘制*的图标高度。默认是32。
 *  this.iconTextDrawingOffset() 
 *    - 返回图标和文字整体的纵轴偏移量。向下为正，向上为负。默认是0。
 *  this.iconTextDrawingDistance() 
 *    - 返回图标的文字之间的距离。默认是0。
 * 
 * <== 其他注意事项 ==>
 *  
 *  this.lineHeight() 默认的返回值为：
 *    this.iconDrawingHeight() + this.standardFontSize()
 *  + this.iconTextDistance()
 *  如果要重写，建议只在原有的基础上单纯增加或减少数字。
 * 
 *  如果发现图标被吞了一部分，试着增加行高看看能不能解决问题。
 * 
 * ---------------------------------------------------------------------------
 * === Scene_Desktop ===
 * 
 * <== 父类 ==>
 *  Scene_MenuBase
 * 
 * <== 特殊方法 ==>
 *  this.addExtendedSprite(src, fileName, x, y, opacity) 
 *    - 向背景增加一个额外的自定义图片。可以是手机屏幕、电脑壁纸什么的。
 *      写子类时，在createBackground()方法中要先call父类，之后再写该方法。
 *  src: 图片路径
 *  fileName: 图片名称
 *  x: 图片x坐标
 *  y: 图片y坐标
 *  opacity: 图片不透明度
 *  
 * e.g.
 * // 创建一个子类的背景时：
 * Scene_NewPhone.prototype.createBackground = function() {
 *   Scene_Desktop.prototype.createBackground.call(this);
 *   var y = SceneManager._screenHeight/2;
 *   var x = SceneManager._screenWidth/2;
 *   this.addExtendedSprite('img/desktop_pictures/', 'Phone-1', x, y, 255);
 * }
 * 
 *  *注：图片的锚点默认是在图片中央，这没得改。
 *   所以准备图片时尽量将要使用的图像放在整个图片的正中央。
 * 
 */

var Imported = Imported || {};
Imported.SceneDesktop = true;

/**
 * 窗口边框不透明度（前置）
 */
Object.defineProperty(Window.prototype, "RSSDframeOpacity", { // 勿动
    get:function() {
        return this._windowSpriteContainer.alpha * 255;
    },
    set:function(value) {
        return this._windowSpriteContainer.alpha = value.clamp(0,255) / 255;
    },
    configurable: true
});

/**
 * Window_Desktop
 */

function Window_Desktop() {
    this.initialize.apply(this, arguments);
}

Window_Desktop.prototype = Object.create(Window_Command.prototype);
Window_Desktop.prototype.constructor = Window_Desktop;

/**
 * 
 * @param {number} x 窗口x坐标
 * @param {number} y 窗口y坐标
 * 
 */

Window_Desktop.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.selectLast();
}

Window_Desktop.prototype.itemTextAlign = function() {
    return 'center';
}

Window_Desktop.prototype.standardPadding = function() {
    return 12;
}

Window_Desktop.prototype.lineHeight = function() {
    return 
}

Window_Desktop.prototype._iconList = [];    // 所加的图标序列要与添加的指令顺序相一致。
Window_Desktop.prototype.iconList = function() {
    return this._iconList;
}

Window_Desktop.prototype._standardBackOpacity = 196;
Window_Desktop.prototype._frameOpacity = 255;
Window_Desktop.prototype.standardBackOpacity = function() {
    this.RSSDframeOpacity = this._frameOpacity;
    return this._standardBackOpacity;
}



/**
 * @method iconDrawingWidth 返回**实际绘制**的图标的宽。
 * @memberof Window_Desktop
 */

Window_Desktop.prototype.iconDrawingWidth = function() {
    return 32;
}

/**
 * @method iconDrawingHeight 返回**实际绘制**的图标的高。
 * @memberof Window_Desktop
 */

Window_Desktop.prototype.iconDrawingHeight = function() {
    return 32;
}

Window_Desktop.prototype.iconTextDrawingOffset = function() {
    return 0;
}

Window_Desktop.prototype.iconTextDistance = function() {
    return 0;
}

/**
 * @method drawIconEx 绘制不同大小的图标。
 * @memberof Window_Desktop
 * 
 * @param {number} iconIndex 图标序列
 * @param {number} x 图标在目标上绘制的位置（X坐标）
 * @param {number} y 图标在目标上绘制的位置（Y坐标）
 * @param {number} dw 实际绘制的图标宽度
 * @param {number} dh 实际绘制的图标高度
 */

Window_Desktop.prototype.drawIconEx = function(iconIndex, x, y, dw, dh) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap,sx,sy,pw,ph,x,y,dw,dh);
}

Window_Desktop.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.changeTextColor(this.normalColor());
    this.changePaintOpacity(this.isCommandEnabled(index));
    var ix = (rect.width - this.iconDrawingWidth()) / 2; // Offset
    var iy = (this.lineHeight() - (this.iconDrawingHeight() + this.standardFontSize() + this.iconTextDistance())) / 2 + this.iconTextDrawingOffset();
    this.drawIconEx(this.iconList()[index],rect.x+ix,rect.y+iy,this.iconDrawingWidth(),this.iconDrawingHeight());
    var ty = this.iconDrawingHeight() / 2 + this.iconTextDrawingOffset() + this.iconTextDistance();
    this.drawText(this.commandName(index),rect.x,rect.y+ty,rect.width,align);
}

Window_Desktop.prototype.processOk = function() {
    Window_Desktop._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
}

/**
 * @method selectLast 记住指令
 * @memberof Window_Desktop
 */

Window_Desktop.prototype.selectLast = function() {
    this.selectSymbol(Window_Desktop._lastCommandSymbol);
}



/**
 * Scene_Desktop
 */

function Scene_Desktop() {
    this.initialize.apply(this, arguments);
}

Scene_Desktop.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Desktop.prototype.constructor = Scene_Desktop;

Scene_Desktop.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
}

Scene_Desktop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
}

Scene_Desktop.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.initializeExtendedSprite();
}

/**
 * @property {sprite} Scene_Desktop._extendedSprite 自定义增加图片的图层
 */

Scene_Desktop.prototype.initializeExtendedSprite = function() {
    this._extendedSprites = new Sprite();
    this.addChild(this._extendedSprites);
}

/**
 * @method addExtendedSprite 增加背景
 * 
 * @param {string} src 图片路径
 * @param {string} filename 图片名称
 * @param {number} x 图片在界面的x坐标
 * @param {number} y 图片在界面的y坐标
 * @param {number} opacity 图片透明度
 */

Scene_Desktop.prototype.addExtendedSprite = function (src, filename, x, y, opacity, visible, rotate, blendMode, scaleX, scaleY) {
    this._background = new Sprite();
    this._background.x = x || 0;
    this._background.y = y || 0;
    this._background.opacity = opacity === undefined ? 255 : opacity;
    this._background.visible = visible === undefined ? true : visible;
    this._background.rotation = rotate || 0;
    this._background.blendMode = blendMode || 0;
    this._background.scale.x = scaleX || 1;
    this._background.scale.y = scaleY || 1;
    this._background.anchor.x = 0.5;
    this._background.anchor.y = 0.5;
    this._background.bitmap = ImageManager.loadBitmap(src, filename, 0, true);
    this._extendedSprites.addChild(this._background);
}