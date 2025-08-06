//===============================================================
// RSSD_CEFindIdByName.js
// Author: Rose_shadows
//===============================================================
/*:
 * @plugindesc 1.0.0 - 通过公共事件名称来调用公共事件
 * @author 离影玫 | Rose_shadows
 * @help
 * === 介绍 ===
 * 
 * 可以在脚本中通过写公共事件名称来控制公共事件。
 * 如：
 *   $gameTemp.reserveCommonEvent('重置时间');
 *    - 预约名为'重置时间'的ID最小的公共事件。
 * 
 * 该插件提供1个函数：
 *   $gameTemp.findCommonEventIdByName(commonEventName);
 *   - 通过公共事件名来获取符合条件的ID最小的公共事件的ID。
 * 
 * 
 * === 使用条款 ===
 *
 * MIT 协议
 * 
 * 
 *  === 更新日志 ===
 * 
 * 1.00 - 完成。
 */
var Imported = Imported || {};
Imported.RSSD_CEFindIdByName = true;

var RSSD = RSSD || {};
RSSD.CEFIBN = {};

//===============================================================
// Game_Temp
//===============================================================

var __Game_Temp_reserveCommonEvent = Game_Temp.prototype.reserveCommonEvent;
Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
    if(typeof commonEventId === 'string') {
        var id = this.findCommonEventIdByName(commonEventId);
        if(id) this._commonEventId = id;
    } else {
        __Game_Temp_reserveCommonEvent.call(this, commonEventId);
    }
};

Game_Temp.prototype.findCommonEventIdByName = function(name) {
    for(var i = 1; i < $dataCommonEvents.length; i++) {
        if($dataCommonEvents[i].name === name) {
            return i;
        }
    }
    return 0;
};