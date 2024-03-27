//=============================================================================
// RSSD_AutoMessageName.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.0.0 - 消息中自动绘制角色名称
 * @author Rose_shadows
 * @help
 * === 介绍 ===
 *
 * 该插件提供根据脸图自动绘制角色名称的功能。
 *
 * 脸图及其相应角色名称需要先在插件参数中注册，才能使用自动绘制功能。
 * 如果显示了没有注册的脸图或是没有显示脸图，角色名称就不会绘制。
 *
 * 注意，自动绘制角色名称时，消息正文的显示区域将会缩减到3行。
 *
 *
 * === 更新日志 ===
 *
 * 1.0.0 -完成。
 * 
 * @param Name List
 * @text 名称注册列表
 * @type struct<nameList>[]
 * @desc 将脸图与角色名称相关联起来的列表。
 * @default []
 *
 * @param Disable Switch ID
 * @text 自动名称禁用开关ID
 * @type switch
 * @desc 打开这个开关时，名称自动绘制功能将被禁用。若为0，则永久启用。
 * @default 0
 * 
 * @param Common Name Format
 * @text 名称通用格式
 * @desc 所有名称通用的格式。${NAME} 指代要显示的名称。
 * @default ${NAME}：
 *
 * @param Default Name Color
 * @text 默认名称颜色
 * @type number
 * @desc 默认的名称颜色代码。
 * @default 0
 *
 * @param Message Extra Indent
 * @text 额外消息缩进距离
 * @desc 显示消息正文时，相对名称向右缩进的距离。单位像素。
 * @default 20
 * 
 */
/*~struct~nameList:
 * @param Face Image
 * @text 脸图
 * @type file
 * @dir img/faces/
 * @require 1
 * @desc 角色名称绑定的脸图。显示该脸图时将会绘制对应的角色名称。
 * @default 
 * 
 * @param Character Name
 * @text 角色名称
 * @desc 显示脸图时绘制的角色名称。
 * @default 
 *
 * @param Name Color
 * @text 名称颜色
 * @type number
 * @desc 该角色名称的颜色代码。若为空，则保持默认。
 * @default 
 */
var Imported = Imported || {};
Imported.RSSD_AutoMessageName = true;

var RSSD = RSSD || {};
RSSD.AMN = {};

RSSD.AMN.pluginName = 'RSSD_AutoMessageName';

var parameters = PluginManager.parameters(RSSD.AMN.pluginName);
RSSD.AMN.switchId = +parameters['Disable Switch ID'] || 0;
RSSD.AMN.nameFormat = parameters['Common Name Format'] || '${NAME}：';
RSSD.AMN.nameColor = +parameters['Default Name Color'] || 0;
RSSD.AMN.extraIndent = +parameters['Message Extra Indent'] || 20;

var temp_arr = JSON.parse(parameters['Name List']);
RSSD.AMN.nameList = {};
temp_arr.forEach((item)=>{
    var obj = JSON.parse(item);
    var faceName = obj['Face Image'];
    var charName = obj['Character Name'];
    var nameColor = obj['Name Color'] || RSSD.AMN.nameColor;
    RSSD.AMN.nameList[faceName] = {name: charName, color: nameColor};
});

RSSD.AMN.getRegisteredFaceNames = function() {
    return Object.keys(RSSD.AMN.nameList);
};

var __Window_Message_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    __Window_Message_newPage.call(this, textState);
    this.addCharAutoName(textState);
};

Window_Message.prototype.addCharAutoName = function(textState) {
    var list = RSSD.AMN.getRegisteredFaceNames();
    var faceName = $gameMessage.faceName() || '';
    var isEnabled = RSSD.AMN.switchId ? !$gameSwitches.value(RSSD.AMN.switchId) : true;
    if(list.indexOf(faceName) !== -1 && isEnabled) {
        var obj = RSSD.AMN.nameList[faceName];
        var name = obj.name;
        var color = obj.color;
        var extraIndent = RSSD.AMN.extraIndent;
        var format = RSSD.AMN.nameFormat;
        textState.y += this.lineHeight();
        textState.x += extraIndent;
        textState.left += extraIndent;
        this.changeTextColor(this.textColor(color));
        this.drawText(format.replace('${NAME}',name), this.newLineX(), 0, this.contentsWidth(), 'left');
        this.changeTextColor(this.normalColor());
    }
};