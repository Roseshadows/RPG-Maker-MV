//=============================================================================
// RSSD_MessageWindowSound.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.0.3 - 消息切换音效
 * @author Rose_shadows
 * @target MV MZ
 * @help
 * === 介绍 ===
 * 
 * 该插件允许你在每次切换对话消息时播放一次指定的音效。
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT协议
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 * 1.0.1 - 修复长按回车会多次播放音效的问题。
 *         确认该插件兼容 MZ。
 * 1.0.2 - 修复该插件在打开消息窗口和关闭消息窗口时不播放音效的问题。
 * 1.0.3 - 添加用开关控制是否播放音效的功能。
 * 
 * @param SE Play Switch ID
 * @text SE 播放开关 ID
 * @type switch
 * @desc 控制消息切换时是否播放音效的开关。若为0，则永久播放。
 * @default 0
 * 
 * @param SE Name
 * @text SE 文件名
 * @type file
 * @require 1
 * @dir audio/se/
 * @desc 音效的文件名。音频文件放在 audio/se/ 文件夹下。默认 Cursor1
 * @default Cursor1
 * 
 * @param SE Volume
 * @text SE 音量
 * @type number
 * @min 0
 * @max 100
 * @desc 音效的音量。默认为 90
 * @default 90
 * 
 * @param SE Pitch
 * @text SE 音调
 * @type number
 * @min 50
 * @max 150
 * @desc 音效的音调。默认 100
 * @default 100
 * 
 * @param SE Pan
 * @text SE 声像
 * @type number
 * @min -100
 * @max 100
 * @desc 音效的声像。默认 0
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.RSSD_MessageWindowSound = true;

var RSSD = RSSD || {};
RSSD.MWS = {};
RSSD.MWS.pluginName = 'RSSD_MessageWindowSound';

(function(_){
    var parameters = PluginManager.parameters(_.pluginName);
    _.switchId = +parameters['SE Play Switch ID'] || 0;
    _.name     = parameters['SE Name'] || 'Cursor1';
    _.volume   = +parameters['SE Volume'] || 90;
    _.pitch    = +parameters['SE Pitch'] || 100;
    _.pan      = +parameters['SE Pan'] || 0;

    var __Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
        this.playSoundWhenChange();
        __Window_Message_newPage.call(this, textState);
    };

    var __Window_Message_close = Window_Message.prototype.close;
    Window_Message.prototype.close = function() {
        this.playSoundWhenChange();
        __Window_Message_close.call(this);
    };

    Window_Message.prototype.playSoundWhenChange = function() {
        if(_.switchId === 0 || (_.switchId !== 0 && $gameSwitches.value(_.switchId))) {
            AudioManager.playStaticSe({name:_.name, pan: _.pan, pitch: _.pitch, volume: _.volume});
        }
    };
})(RSSD.MWS)