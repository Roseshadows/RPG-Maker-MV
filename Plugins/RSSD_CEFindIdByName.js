//===============================================================
// RSSD_CEFindIdByName.js
//===============================================================
/*:
 * @plugindesc ver1.00 - 通过公共事件名称来调用公共事件
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
 *  === 使用条款 ===
 * 
 * 免费用于商业与非商业工程。允许二次转发及修改。
 * 不强制署名，但不要声明该插件是除 Rose_shadows | 离影玫 | OrchidBones | 
 * 兰骨 以外的人所写的。
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