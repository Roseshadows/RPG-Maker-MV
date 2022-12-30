// ================================================
//  StopScrollTextProcess.js
// ================================================
/*
 *@plugindesc 滚动文字时按住向下键即可停止滚动文字。
 */

 (function(){

    var _Window_ScrollText_scrollSpeed = Window_ScrollText.prototype.scrollSpeed;
    Window_ScrollText.prototype.scrollSpeed = function() {
        var speed = $gameMessage.scrollSpeed() / 2;
        if(this.isStoppedScroll()) {
            return speed *= 0;
        };
        return _Window_ScrollText_scrollSpeed.call(this);
    };

    Window_ScrollText.prototype.isStoppedScroll = function() {
        return (Input.isPressed('down'));
    };

})();