//=========================================================
// RSSD_SimpleScrollableInfoBoard.js
//=========================================================
/*:
 * @plugindesc ver1.00 - 简易可滚动信息板 (读报系统)
 * @author 离影玫 | Rose_shadows
 * @help 
 *  === 介绍 ===
 * 
 * 该插件扩展了滚动文本的功能。
 * 
 * 在打开特定开关后，可以使用事件指令【显示滚动文本】来显示一个可滚动的
 * 信息板。
 * 在信息板中，可以用滚轮或上下方向键滚动文本。
 * 若要退出信息板，请按Esc键、点击鼠标右键或双击屏幕。
 * 
 * 关闭开关后，【显示滚动文本】将会恢复原来的功能。
 * 
 * !注意!如果你在使用信息板时需要连续使用两次以上事件指令【显示滚动文本
 * 】，请在相邻事件指令之间添加【等待】指令。时长推荐为10帧。
 * 否则有的信息板有可能不会显示出来。
 * 
 * 
 *  === 使用条款 ===
 * 
 * 免费用于商业与非商业工程。允许二次转发及修改。
 * 不强制署名，但不要声明该插件是除 Rose_shadows | 离影玫 | OrchidBones | 兰骨
 * 以外的人所写的。
 * Free to be used in both commercial and non-commercial projects. You can 
 * also modify or redistribute this plugin, as long as you do not claim this
 * plugin belongs to anyone except me, Rose_shadows | 离影玫 | OrchidBones | 
 * 兰骨. 
 * Credits are appreciated, but not required.
 * 
 * 
 *  === 更新日志 ===
 * 
 * ver1.00 - 完成。
 * 
 * @param Enable Switch ID
 * @text 启用开关ID
 * @type switch
 * @desc 启用信息板功能的开关。默认为 开关#19 。
 * @default 19
 * 
 * @param Default Width
 * @text 信息板默认宽度
 * @type number
 * @desc 信息板的默认宽度。默认：400
 * @default 400
 * 
 * @param Default Height
 * @text 信息板默认高度
 * @type number
 * @desc 信息板的默认高度。默认：500
 * @default 500
 * 
 * @param Width Variable ID
 * @text 信息板宽度变量ID
 * @type variable
 * @desc 在游戏中控制信息板宽度的变量ID。默认：19
 * @default 19
 * 
 * @param Height Variable ID
 * @text 信息板高度变量ID
 * @type variable
 * @desc 在游戏中控制信息板高度的变量ID。默认：20
 * @default 20
 */
var Imported = Imported || {};
Imported.RSSD_SimpleScrollableInfoBoard = true;

var RSSD = RSSD || {};
RSSD.SimpleScrollableInfoBoard = {};
var parameters = PluginManager.parameters('RSSD_SimpleScrollableInfoBoard');
RSSD.SimpleScrollableInfoBoard.switchId  = parameters['Enable Switch ID'] || 19;
RSSD.SimpleScrollableInfoBoard.width     = parameters['Default Width'] || 400;
RSSD.SimpleScrollableInfoBoard.height    = parameters['Default Height'] || 500;
RSSD.SimpleScrollableInfoBoard.varWidth  = parameters['Width Variable ID'] || 19;
RSSD.SimpleScrollableInfoBoard.varHeight = parameters['Height Variable ID'] || 20;

Window_ScrollText.prototype.isOpenAndActive = function() {
    return this.isOpen() && this.active;
};

Window_ScrollText.prototype.windowWidth = function() {
    return $gameVariables.value(RSSD.SimpleScrollableInfoBoard.varWidth) || RSSD.SimpleScrollableInfoBoard.width;
};

Window_ScrollText.prototype.windowHeight = function() {
    return $gameVariables.value(RSSD.SimpleScrollableInfoBoard.varHeight) || RSSD.SimpleScrollableInfoBoard.height;
};

var __Window_ScrollText_startMessage = Window_ScrollText.prototype.startMessage;
Window_ScrollText.prototype.startMessage = function() {
    this.refreshWindowType();
    __Window_ScrollText_startMessage.call(this);
    if($gameSwitches.value(RSSD.SimpleScrollableInfoBoard.switchId)) {
        this.open();
    }
};

Window_ScrollText.prototype.refreshWindowType = function() {
    if($gameSwitches.value(RSSD.SimpleScrollableInfoBoard.switchId)) {
        this.opacity = 192;
        this.openness = 0;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.y = (Graphics.boxHeight - this.height) / 2;
    } else {
        this.opacity = 0;
        this.openness = 255;
        this.width = Graphics.boxWidth;
        this.height = Graphics.boxHeight;
        this.x = 0;
        this.y = 0;
    }
};

var __Window_ScrollText_refresh = Window_ScrollText.prototype.refresh;
Window_ScrollText.prototype.refresh = function() {
    __Window_ScrollText_refresh.call(this);
    if($gameSwitches.value(RSSD.SimpleScrollableInfoBoard.switchId)) {
        this.origin.y = 0;
    }
};

var __Window_ScrollText_updateMessage = Window_ScrollText.prototype.updateMessage;
Window_ScrollText.prototype.updateMessage = function() {
    if($gameSwitches.value(RSSD.SimpleScrollableInfoBoard.switchId)) {
        this.processWheel();
        this.updateArrow();
        if(Input.isPressed('cancel') || TouchInput.isCancelled()) {
            Input.update();
            this.terminateMessage();
        }
    } else {
        __Window_ScrollText_updateMessage.call(this);
    }
};

Window_ScrollText.prototype.updateArrow = function() {
    var visibleArea = this.windowHeight() - 2 * this.padding;
    if(visibleArea > this.contents.height) return;
    var top = this.contents.height - visibleArea;
    var bottom = 0;
    this.upArrowVisible = this.origin.y > bottom;
    this.downArrowVisible = this.origin.y < top;
};

Window_ScrollText.prototype.processWheel = function() {
    if(this.isOpenAndActive()) {
        var visibleArea = this.windowHeight() - 2 * this.padding;
        if(visibleArea > this.contents.height) return;
        var threshold = 20;
        if(TouchInput.wheelY >= threshold || Input.isRepeated('down')) {
            this.scrollDown();
        }
        if(TouchInput.wheelY <= -threshold || Input.isRepeated('up')) {
            this.scrollUp();
        }
    }
};

Window_ScrollText.prototype.scrollDown = function() {
    var visibleArea = this.windowHeight() - 2 * this.padding;
    var top = this.contents.height - visibleArea;
    if(this.origin.y === top) return;
    if(top - this.origin.y < this.scrollSpeed() && top - this.origin.y > 0) {
        this.origin.y = top;
    } else {
        if(this.canScrollDown()) {
            this.origin.y += this.scrollSpeed();
        }
    }
};

Window_ScrollText.prototype.scrollUp = function() {
    var bottom = 0;
    if(this.origin.y === bottom) return;
    if(this.origin.y - bottom < this.scrollSpeed() && this.origin.y - bottom > 0) {
        this.origin.y = bottom;
    } else {
        if(this.canScrollUp()) {
            this.origin.y -= this.scrollSpeed();
        }
    }
};

Window_ScrollText.prototype.canScrollDown = function() {
    var visibleArea = this.windowHeight() - 2 * this.padding;
    return this.origin.y <= this.contents.height - visibleArea;
};

Window_ScrollText.prototype.canScrollUp = function() {
    return this.origin.y != 0 && this.origin.y >= 0;
};

var __Window_ScrollText_scrollSpeed = Window_ScrollText.prototype.scrollSpeed;
Window_ScrollText.prototype.scrollSpeed = function() {
    if($gameSwitches.value(RSSD.SimpleScrollableInfoBoard.switchId)) {
        return 30;  //px
    } else {
        return __Window_ScrollText_scrollSpeed.call(this);
    }
};