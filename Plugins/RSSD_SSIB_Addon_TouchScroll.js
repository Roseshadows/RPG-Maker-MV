//=========================================================
// RSSD_SSIB_Addon_TouchScroll.js
//=========================================================
/*:
 * @plugindesc ver1.00 - 简易可滚动信息板 - 扩展 - 触摸滑动
 * @author 离影玫 | Rose_shadows
 * @target MZ MV
 * @orderAfter RSSD_SimpleScrollableInfoBoard
 * @url https://github.com/Roseshadows
 * @help 使用该扩展插件，你可以用手指或鼠标来滑动信息板上的内容。
 * 请将该插件放在 RSSD_SimpleScrollableInfoBoard.js 插件之下。
 * 
 * 
 *  === 更新日志 ===
 * 
 * ver1.00 - 完成。
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

(function($) {
    var parameters = PluginManager.parameters(pluginName);
    $.speed = +parameters['Speed'] || 1;

    if(Imported.RSSD_SimpleScrollableInfoBoard) {
        $.sId = RSSD.SimpleScrollableInfoBoard.switchId;
	    
        var _TouchInput_clear = TouchInput.clear;
        TouchInput.clear = function() {
            _TouchInput_clear.call(this);
            this._boardLastY = 0;
        }
        
        var _TouchInput_onTrigger = TouchInput._onTrigger;
        TouchInput._onTrigger = function(x, y) {
            if (this.isMoved()) return;
            _TouchInput_onTrigger.call(this, x, y);
            this._boardLastY = this.y;
        };

        var _TouchInput_onMove = TouchInput._onMove;
        TouchInput._onMove = function(x, y) {
            this._boardLastY = this.y;
            _TouchInput_onMove.call(this, x, y);
        };

        var _Window_ScrollText_initialize = Window_ScrollText.prototype.initialize;
        Window_ScrollText.prototype.initialize = function() {
            _Window_ScrollText_initialize.call(this);
        }
        
        var _Window_ScrollText_update = Window_ScrollText.prototype.update;
        Window_ScrollText.prototype.update = function() {
            _Window_ScrollText_update.call(this);
            if($.sId && $gameSwitches.value($.sId)) {
                if(this.canScroll()) {
                    if (this.isTouched() && TouchInput.isMoved()) {
                        var newY = (TouchInput._boardLastY - TouchInput.y) * $.speed;
                        if (newY) this.origin.y += newY;
                    }
                    if (this.isTouched() && (TouchInput.isMoved() || TouchInput._boardMoveY)) {
                        if(!this.canScrollDown()) {
                            var visibleArea = this.windowHeight() - 2 * this.padding;
                            this.origin.y = this.contents.height - visibleArea;
                        } else if(!this.canScrollUp()){
                            this.origin.y = 0;
                        }
                    }
                }
            }
        };
	
        Window_ScrollText.prototype.isTouched = function() {
            return (TouchInput.x - (this.x + this.padding)) > 0 && (TouchInput.y - (this.y + this.padding)) > 0
                && (TouchInput.x - (this.x + Number(this.windowWidth()) - this.padding)) < 0 && (TouchInput.y - (this.y + Number(this.windowHeight()) - this.padding)) < 0;
	    };
    } else {
        console.log('插件'+pluginName+'.js 未检测到前置插件。请去看看是缺少插件还是顺序不对!');
    }
})(RSSD.SSIB_TS);
