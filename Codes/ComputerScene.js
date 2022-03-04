/**
 * Keywords: Scene_Test
 * 关键字: Scene_Test
 * 
 * 请自行修改代码。
 */


Object.defineProperty(Window.prototype, "frameOpacity", { // 勿动
    get:function() {
        return this._windowSpriteContainer.alpha * 255;
    },
    set:function(value) {
        return this._windowSpriteContainer.alpha = value.clamp(0,255) / 255;
    },
    configurable: true
});

// =======================================
// Window_Test
// ----------------------

function Window_Test() {
    this.initialize.apply(this, arguments);
}

Window_Test.prototype = Object.create(Window_Command.prototype);
Window_Test.prototype.constructor = Window_Test;

Window_Test.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 96, 0);  // 96指窗口的x坐标，0指窗口的y坐标
};

Window_Test.prototype.windowWidth = function() {
    return 624;   // 窗口宽度
};

Window_Test.prototype.windowHeight = function() {
    return this.fittingHeight(this.maxCols());   // 窗口高度
}

Window_Test.prototype.numVisibleRows = function() {
    return 5;  // 最多显示多少行
}

Window_Test.prototype.maxCols = function() {
    return 5;  // 一行最多显示几个指令
};

Window_Test.prototype.itemTextAlign = function() {
    return 'center';  // 文本对齐（'left','right' or 'center'）
}

Window_Test.prototype.lineHeight = function() {
    return 72;   // 行高。建议此值大于 图标大小+文本高度。
}

Window_Test.prototype.standardFontSize = function() {
    return 24;   // 标准字体大小（高度 & 宽度）
}

Window_Test.prototype.standardPadding = function() {
    return 16;   // 标准缩放。指令与窗口边沿的距离。
}

Window_Test.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem('Window');   // 使用的窗口皮肤。'Window'可替换为要使用的皮肤图片名称。
}

Window_Test.prototype.standardBackOpacity = function() {
    this.frameOpacity = 0;   // 窗口边框的不透明度。如果不想显示边框，可将该值设为 0
    return 0;   // 窗口背景的标准不透明度。如果不想显示边框，可将该值设为 0
}

Window_Test.prototype.normalColor = function() {
    return this.textColor(0);   // 指令名称的颜色。(窗口颜色)
}

Window_Test.prototype.drawBigIcon = function(iconIndex, x, y, dw, dh) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap,sx,sy,pw,ph,x,y,dw,dh);
}

// 在指令中绘制图标
var iconIndex = [288,289,290,291,292]; // 图标序列数组。图标与后面addCommand部分的指令按顺序一一对应。数量*必须*等于后面添加的指令数量。比如设了5个图标序列，那么下面makeCommandList()方法中就要添加5个指令。
Window_Test.prototype.drawItem = function(index) {
    var iconSize = 36;   // 所显示的图标的大小。
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.changeTextColor(this.normalColor());
    this.changePaintOpacity(this.isCommandEnabled(index));
    var ix = (rect.width - iconSize)/2; // Offset
    this.drawBigIcon(iconIndex[index],rect.x+ix,rect.y+3,iconSize,iconSize);
    var ty = (this.lineHeight() - iconSize)/2; // Offset
    this.drawText(this.commandName(index),rect.x,rect.y+ty,rect.width,align);
}

Window_Test.prototype.makeCommandList = function() {   // add了几个指令，就在下面的createWindowTest()方法里添加相应的绑定功能。
 // this.addCommand('这是指令的名称', 'this-is-the-keyword-of-the-command', true);
    this.addCommand('应用1', 'test1', true);
    this.addCommand('应用2', 'test2', true);
    this.addCommand('应用3', 'test3', true);
    this.addCommand('应用4', 'test4', true);
    this.addCommand('应用5', 'test5', true);
};


// =======================================
// Scene_Test
// ----------------------

function Scene_Test() {
    this.initialize.apply(this, arguments);
}

Scene_Test.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Test.prototype.constructor = Scene_Test;

Scene_Test.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
}

Scene_Test.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindowTest();
}

// 想增加背景的话，把注释的斜杠去掉即可。
// Scene_Test.prototype.createBackground = function() {
//     // 注意，这个写法会导致：大小不等于屏幕分辨率的图片会惨遭拉伸/压缩至屏幕分辨率大小。
//     this._background = new Sprite();

//     // 设置背景不透明度
//     this._background.opacity = 255;
//     // 设置背景图片
//     this._background.bitmap = ImageManager.loadParallax('Mountains1');   // 可将'Mountains1'替换为其他的图片名称。图片放在'Parallaxes'文件夹中。

//     this.addChild(this._background);
// }

Scene_Test.prototype.createWindowTest = function() {
    this._windowTest = new Window_Test();

 // 格式：
 // this._windowTest.setHandler('this-is-the-keyword-of-the-command', this.customFunction.bind(this));
 // 当按下关键字为'this-is-the-keyword-of-the-command'的指令时，就会执行Scene_Test.customFunction()方法。具体可以看下面的例子。

    this._windowTest.setHandler('test1',  this.onFirst.bind(this));
    this._windowTest.setHandler('test2',  this.onSecond.bind(this));
    this._windowTest.setHandler('test3',  this.onThird.bind(this));
    this._windowTest.setHandler('test4',  this.onForth.bind(this));
    this._windowTest.setHandler('test5',  this.onFifth.bind(this));

    this._windowTest.setHandler('cancel', this.popScene.bind(this));   // 别改这行

    this.addWindow(this._windowTest);
}

// 指令相关的方法。
Scene_Test.prototype.onFirst = function() {
    SceneManager.push(Scene_Item);
}

Scene_Test.prototype.onSecond = function() {
    SceneManager.push(Scene_Options);
}

Scene_Test.prototype.onThird = function() {
    SceneManager.push(Scene_Save);
}

Scene_Test.prototype.onForth = function() {
    SceneManager.push(Scene_Debug);
}

Scene_Test.prototype.onFifth = function() {
    SceneManager.push(Scene_Load);
}
