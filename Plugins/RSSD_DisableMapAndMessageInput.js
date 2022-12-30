//=============================================================================
// RSSD_DisableMapAndMessageInput.js
//=============================================================================
/*:
 * @plugindesc ver1.00 - 特定开关打开时禁用地图/消息输入
 * <RSSD_DMAMI>
 * @author 离影玫 | Rose_shadows
 * @help
 * === 介绍 ===
 * 
 * 特定开关打开时，将会禁用地图/消息输入。
 * 
 * 这个插件主要用于搭配图片事件菜单，
 * 在打开菜单时可以禁用按键输入对地图/消息框的影响。
 * 若禁用地图输入，则方向键和触控都不会使玩家移动。
 * 若禁用消息输入，则任何按键都对消息框无效。
 * 一定要慎用，否则很可能会使游戏卡住。
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
 * @param Map Switch ID
 * @text 禁用地图输入开关ID
 * @type switch
 * @desc 当该开关开启时，禁用地图输入。
 * @default 17
 * 
 * @param Message Switch ID
 * @text 禁用消息输入开关ID
 * @type switch
 * @desc 当该开关开启时，禁用消息输入。
 * @default 18
 */
var Imported = Imported || {};
Imported.RSSD_DisableMapAndMessageInput = true;

var RSSD = RSSD || {};
RSSD.DMAMI = {};

var tag = '<RSSD_DMAMI>';
var parameters = $plugins.filter(function(plugin){return plugin.description.contains(tag)})[0].parameters;
RSSD.DMAMI.sId_map = +parameters['Map Switch ID'] || 17;
RSSD.DMAMI.sId_msg = +parameters['Message Switch ID'] || 18;

//=============================================================================
// Game_Player
//=============================================================================

var __Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if($gameSwitches.value(RSSD.DMAMI.sId_map)) return false;
    return __Game_Player_canMove.call(this);
};

//=============================================================================
// Window_Message
//=============================================================================

var __Window_Message_isTriggered = Window_Message.prototype.isTriggered;
Window_Message.prototype.isTriggered = function() {
    if($gameSwitches.value(RSSD.DMAMI.sId_msg)) return false;
    return __Window_Message_isTriggered.call(this);
};