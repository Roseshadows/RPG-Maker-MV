//==============================================================================
// RSSD_MultiPriorityFade.js
// Author: Rose_shadows
//==============================================================================
/*:
 * @plugindesc 1.0.0 - 多层级淡入淡出
 * @author Rose_shadows
 * @target MZ
 * @help
 * === 介绍 ===
 * 
 * 原生 RM 只允许在背景层+图片层之上淡入淡出，而无法单独对背景层
 * 或整个游戏画面屏幕（背景层+图片层+窗口层）进行淡入淡出效果。
 * 该插件解除了这一限制，允许通过插件指令将淡入淡出效果运用到各个层级。
 * 
 * 
 * === 脚本 ===
 * 
 * $gameScreen.startAdvancedFadeOut(层级, 帧时长, 淡出颜色是否为白色);
 * - 执行淡出效果。
 *   层级：
 *    -1 - 背景层
 *     0 - 背景层 + 图片层
 *     1 - 屏幕
 *   注：“淡出颜色是否为白色”这一项仅在“层级”为 1 时生效。
 *   例如：
 *    $gameScreen.startAdvancedFadeOut(-1, 60);
 *    $gameScreen.startAdvancedFadeOut(0, 180);
 *    $gameScreen.startAdvancedFadeOut(1, 60, true);
 * 
 * $gameScreen.startAdvancedFadeIn(层级, 帧时长, 是否从白屏淡入);
 * - 执行淡入效果。
 *   层级：
 *    -1 - 背景层
 *     0 - 背景层 + 图片层
 *     1 - 屏幕
 *   注：“是否从白屏淡入”这一项仅在“层级”为 1 时生效。
 *   例如：
 *    $gameScreen.startAdvancedFadeIn(-1, 60);
 *    $gameScreen.startAdvancedFadeIn(0, 180);
 *    $gameScreen.startAdvancedFadeIn(1, 60, true);
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
 * @command 淡出
 * 
 * @arg 淡出层级
 * @type select
 * @option 背景层
 * @value -1
 * @option 背景层+图片层
 * @value 0
 * @option 屏幕
 * @value 1
 * @default 0
 * 
 * @arg 时长
 * @type number
 * @min 0
 * @default 60
 * 
 * @arg 是否淡出为白色
 * @type boolean
 * @on 白色
 * @off 黑色
 * @desc 注意，仅当淡出层级为“屏幕”时有效。
 * @default false
 * 
 * @command 淡入
 * 
 * @arg 淡入层级
 * @type select
 * @option 背景层
 * @value -1
 * @option 背景层+图片层
 * @value 0
 * @option 屏幕
 * @value 1
 * @default 0
 * 
 * @arg 时长
 * @type number
 * @min 0
 * @default 60
 * 
 * @arg 是否从白色淡入
 * @type boolean
 * @on 白色
 * @off 黑色
 * @desc 注意，仅当淡入层级为“屏幕”时有效。
 * @default false
 */

var Imported = Imported || {};
Imported.RSSD_MultiPriorityFade = true;

var RSSD = RSSD || {};
RSSD.MPF = {};
RSSD.MPF.pluginName = 'RSSD_MultiPriorityFade';

//=============================================================================
// Game_Screen
//=============================================================================

var __RSSD_MPF_Game_Screen_clear = Game_Screen.prototype.clear;
Game_Screen.prototype.clear = function() {
    __RSSD_MPF_Game_Screen_clear.call(this);
    this.clearBaseFade();
};

Game_Screen.prototype.clearBaseFade = function() {
    this._baseBrightness = 255;
    this._baseFadeOutDuration = 0;
    this._baseFadeInDuration = 0;
};

Game_Screen.prototype.baseBrightness = function() {
    return this._baseBrightness;
};

Game_Screen.prototype.startBaseFadeOut = function(duration) {
    this._baseFadeOutDuration = duration;
    this._baseFadeInDuration = 0;
};

Game_Screen.prototype.startBaseFadeIn = function(duration) {
    this._baseFadeInDuration = duration;
    this._baseFadeOutDuration = 0;
};

var __RSSD_MPF_Game_Screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function() {
    __RSSD_MPF_Game_Screen_update.call(this);
    this.updateBaseFadeOut();
    this.updateBaseFadeIn();
};

Game_Screen.prototype.updateBaseFadeOut = function() {
    if (this._baseFadeOutDuration > 0) {
        const d = this._baseFadeOutDuration;
        this._baseBrightness = (this._baseBrightness * (d - 1)) / d;
        this._baseFadeOutDuration--;
    }
};

Game_Screen.prototype.updateBaseFadeIn = function() {
    if (this._baseFadeInDuration > 0) {
        const d = this._baseFadeInDuration;
        this._baseBrightness = (this._baseBrightness * (d - 1) + 255) / d;
        this._baseFadeInDuration--;
    }
};

Game_Screen.prototype.startAdvancedFadeOut = function(priority, duration, white) {
    switch(priority) {
        case -1:
            this.startBaseFadeOut(duration);
            break;
        case 0:
            this.startFadeOut(duration);
            break;
        case 1:
            SceneManager._scene.startFadeOut(duration, white);
            break;
    }
};

Game_Screen.prototype.startAdvancedFadeIn = function(priority, duration, white) {
    switch(priority) {
        case -1:
            this.startBaseFadeIn(duration);
            break;
        case 0:
            this.startFadeIn(duration);
            break;
        case 1:
            SceneManager._scene.startFadeIn(duration, white);
            break;
    }
};

//=============================================================================
// Spriteset_Map
//=============================================================================

var __RSSD_MPF_Spriteset_Map_updateBaseFilters = Spriteset_Map.prototype.updateBaseFilters;
Spriteset_Map.prototype.updateBaseFilters = function() {
    __RSSD_MPF_Spriteset_Map_updateBaseFilters.call(this);
    this.updateBaseFadeInOut();
};

Spriteset_Map.prototype.updateBaseFadeInOut = function() {
    const filter = this._baseColorFilter;
    filter.setBrightness($gameScreen.baseBrightness());
};

//=============================================================================
// PluginManager
//=============================================================================

PluginManager.registerCommand(RSSD.MPF.pluginName, '淡入', (args)=>{
    const priority = +args['淡入层级'] || 0;
    const duration = +args['时长'];
    const white = args['是否从白色淡入'] === 'true';
    $gameScreen.startAdvancedFadeIn(priority, duration, white);
});

PluginManager.registerCommand(RSSD.MPF.pluginName, '淡出', (args)=>{
    const priority = +args['淡出层级'] || 0;
    const duration = +args['时长'];
    const white = args['是否淡出为白色'] === 'true';
    $gameScreen.startAdvancedFadeOut(priority, duration, white);
});