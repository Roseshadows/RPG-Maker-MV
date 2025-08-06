//===============================================================
// RSSD_VarSwiFindIdByName.js
//===============================================================
/*:
 * @plugindesc ver1.00 - 通过开关/变量名称调用开关/变量
 * @author 离影玫 | Rose_shadows
 * @help
 * === 介绍 ===
 * 
 * 可以在脚本中通过写变量名称来控制开关和变量。
 * 如：
 *   $gameSwitches.value('是否使用滤镜')
 *    - 获取名为'是否使用滤镜'的ID最小的开关值。
 *   $gameSwitches.setValue('是否使用滤镜',true);
 *    - 将名为'是否使用滤镜'的ID最小的开关值设为true
 *   $gameVariables.value('胜利次数')
 *    - 获取名为'胜利次数'的ID最小的变量值。
 *   var oldValue = $gameVariables.value('胜利次数');
 *   $gameVariables.setValue('胜利次数', oldValue + 1);
 *    - 给名为'胜利次数'的ID最小的变量值+1。
 * 
 * 该插件提供2个函数：
 *   $gameSwitches.findIdByName(switchesName);
 *   - 通过开关名来获取符合条件的ID最小的开关的ID。
 *   $gameVariables.findIdByName(variableName);
 *   - 通过变量名来获取符合条件的ID最小的变量的ID。
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
 * 
 */
var Imported = Imported || {};
Imported.RSSD_VarSwiFindIdByName = true;

var RSSD = RSSD || {};
RSSD.VSFIBN = {};

//===============================================================
// Game_Variables
//===============================================================

var __Game_Variables_value = Game_Variables.prototype.value;
Game_Variables.prototype.value = function(variableId) {
    if(typeof variableId === 'string') {
        var id = this.findIdByName(variableId);
        if(id) return this._data[id] || 0;
        return 0;
    } else {
        return __Game_Variables_value.call(this, variableId);
    }
};

Game_Variables.prototype.setValue = function(variableId, value) {
    if(typeof variableId === 'string') {
        var id = this.findIdByName(variableId);
        if(id) {
            this._data[id] = value;
            this.onChange();
        }
    } else if(typeof variableId === 'number') {
        if (variableId > 0 && variableId < $dataSystem.variables.length) {
            this._data[variableId] = value;
            this.onChange();
        }
    };
};

Game_Variables.prototype.findIdByName = function(name) {
    for(var i = 1; i < $dataSystem.variables.length; i++) {
        if($dataSystem.variables[i] === name) {
            return i;
        }
    };
    return 0;
};

//===============================================================
// Game_Switches
//===============================================================

var __Game_Switches_value = Game_Switches.prototype.value;
Game_Switches.prototype.value = function(switchId) {
    if(typeof switchId === 'string') {
        var id = this.findIdByName(switchId);
        if(id) return !!this._data[id];
        return false;
    } else {
        return __Game_Switches_value.call(this, switchId);
    }
};

var __Game_Switches_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
    if(typeof switchId === 'string') {
        var id = this.findIdByName(switchId);
        if(id) {
            this._data[id] = value;
            this.onChange();
        }
    } else {
        __Game_Switches_setValue.call(this, switchId, value);
    };
};

Game_Switches.prototype.findIdByName = function(name) {
    for(var i = 1; i < $dataSystem.switches.length; i++) {
        if($dataSystem.switches[i] === name) {
            return i;
        }
    };
    return 0;
};