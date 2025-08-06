//=========================================================
// RSSD_SSIB_Addon_TouchScroll.js
//=========================================================
/*:
 * @plugindesc 1.0.0 - 简易可滚动信息板 - 扩展 - 触摸滑动
 * @author 离影玫 | Rose_shadows
 * @target MV MZ
 * @orderAfter RSSD_SimpleScrollableInfoBoard
 * @url https://github.com/Roseshadows
 * @help 使用该扩展插件，你可以用手指或鼠标来滑动信息板上的内容。
 * 请将该插件放在 RSSD_SimpleScrollableInfoBoard.js 插件之下。
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT 协议
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 * 
 * @param Speed
 * @text 滚动速度
 * @desc 文本的滚动速度。数字越大，滑动越快。默认是1。
 * @default 1
 */
var Imported = Imported || {};
var pluginName = 'RSSD_SSIB_Addon_TouchScroll';
Imported[pluginName] = true;

var RSSD = RSSD || {};
RSSD.SSIB_TS = {};
RSSD.SSIB_TS.pluginName = pluginName;

var parameters = PluginManager.parameters(pluginName);
RSSD.SSIB_TS.speed = +parameters['Speed'] || 1;

if(Imported.RSSD_SimpleScrollableInfoBoard) {
    RSSD.SSIB_TS.sId = RSSD.SimpleScrollableInfoBoard.switchId;

    //=============================================================================
    // TouchInput
    //=============================================================================
    
    var __RSSD_SSIB_TS_TouchInput_clear = TouchInput.clear;
    TouchInput.clear = function() {
        __RSSD_SSIB_TS_TouchInput_clear.call(this);
        this._boardLastY = 0;
    }
    
    var __RSSD_SSIB_TS_TouchInput_onTrigger = TouchInput._onTrigger;
    TouchInput._onTrigger = function(x, y) {
        if (this.isMoved()) return;
        __RSSD_SSIB_TS_TouchInput_onTrigger.call(this, x, y);
        this._boardLastY = this.y;
    };

    var __RSSD_SSIB_TS_TouchInput_onMove = TouchInput._onMove;
    TouchInput._onMove = function(x, y) {
        this._boardLastY = this.y;
        __RSSD_SSIB_TS_TouchInput_onMove.call(this, x, y);
    };

    //=============================================================================
    // Window_ScrollText
    //=============================================================================
    
    var __RSSD_SSIB_TS_Window_ScrollText_update = Window_ScrollText.prototype.update;
    Window_ScrollText.prototype.update = function() {
        __RSSD_SSIB_TS_Window_ScrollText_update.call(this);
        this.updateInfoBoardTouchScroll();
    };

    Window_ScrollText.prototype.updateInfoBoardTouchScroll = function() {
        if(RSSD.SSIB_TS.sId && $gameSwitches.value(RSSD.SSIB_TS.sId) && this.canScroll()) {
            this.updateInfoBoardScrollState();
            this.checkInfoBoardScrollEnd();
        }
    };

    Window_ScrollText.prototype.updateInfoBoardScrollState = function() {
        if (this.isTouched() && TouchInput.isMoved()) {
            var newY = (TouchInput._boardLastY - TouchInput.y) * RSSD.SSIB_TS.speed;
            if (newY) this.origin.y += newY;
        }
    };

    Window_ScrollText.prototype.checkInfoBoardScrollEnd = function() {
        if (this.isTouched() && (TouchInput.isMoved() || TouchInput._boardMoveY)) {
            if(!this.canScrollDown()) {
                var visibleArea = this.windowHeight() - 2 * this.padding;
                this.origin.y = this.contents.height - visibleArea;
            } else if(!this.canScrollUp()){
                this.origin.y = 0;
            }
        }
    };

    Window_ScrollText.prototype.canScroll = function() {
        return this.canScrollUp() || this.canScrollDown();
    };

    Window_ScrollText.prototype.isTouched = function() {
        return (TouchInput.x - (this.x + this.padding)) > 0 && (TouchInput.y - (this.y + this.padding)) > 0
            && (TouchInput.x - (this.x + Number(this.windowWidth()) - this.padding)) < 0 && (TouchInput.y - (this.y + Number(this.windowHeight()) - this.padding)) < 0;
    };
} else {
    console.log('插件'+pluginName+'.js 未检测到前置插件。请去看看是缺少插件还是顺序不对!');
}
