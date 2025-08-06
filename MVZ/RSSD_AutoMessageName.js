//=============================================================================
// RSSD_AutoMessageName.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.1.1 - 消息中自动绘制角色名称
 * @author Rose_shadows
 * @target MV MZ
 * @help
 * === 介绍 ===
 *
 * 该插件提供根据脸图自动绘制角色名称的功能。
 *
 * 脸图及其相应角色名称需要先在插件参数中注册，才能使用自动绘制功能。
 * 如果显示了没有注册的脸图或是没有显示脸图，角色名称就不会绘制。
 *
 * 注意，自动绘制角色名称时，因为名称会占用对话框的第一行，
 * 故消息正文的显示区域将会缩减到3行。
 * 
 * *使用 RMMZ 制作游戏时，可以在插件参数中设置关联姓名应该显示在姓名框里还是和
 * RMMV 一样显示在对话框第一行。
 * 如果设置为显示在姓名框中，插件参数“名称通用格式”和“额外消息缩进距离”则无效。
 * 
 * 
 * === 插件参数 - 脸图名称 & 索引 ===
 * 
 * 从版本 1.1.1 开始，该插件可以将姓名绑定在一张脸图图像文件的全部脸图上。
 * 只要使用了这张脸图图像上的脸图，就可以显示相同的姓名。
 * 
 * 若要使用这一功能，就空着“脸图索引”参数，只配置“脸图名称”就好。
 * 
 * 注意，如果在设置中已经设置好了同样脸图文件、特定脸图索引的姓名，
 * 则优先使用特定脸图索引对应的姓名。
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
 * 1.1.0 - 修复 Bug，添加对 MZ 的兼容性。
 * 1.1.1 - 新增功能，使姓名可以绑定在一张脸图图像文件的全部脸图上。
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
 * @default ${NAME}: 
 *
 * @param Message Extra Indent
 * @text 额外消息缩进距离
 * @desc 显示消息正文时，相对名称向右缩进的距离。单位像素。
 * @default 20
 * 
 * @param === 兼容性 ===
 * 
 * @param Use NameBox
 * @text [MZ]是否使用姓名框
 * @parent === 兼容性 ===
 * @type boolean
 * @on 姓名框
 * @off 仅对话框
 * @desc 对于 RMMZ 游戏工程，显示姓名时，名称显示在姓名框里，还是显示在对话框第一行？
 * @default true
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
 * @param Face Index
 * @text 脸图索引
 * @desc 角色名称绑定的脸图的索引。如果不写则绑定整张脸图。左上脸图索引是0，从左到右、从上到下索引依次增大。
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
 * @default 0
 */
var Imported = Imported || {};
Imported.RSSD_AutoMessageName = true;

var RSSD = RSSD || {};
RSSD.AMN = {};

RSSD.AMN.pluginName = 'RSSD_AutoMessageName';

RSSD.AMN.parameters = PluginManager.parameters(RSSD.AMN.pluginName);
RSSD.AMN.useNameBox = RSSD.AMN.parameters['Use NameBox'] === 'true';
RSSD.AMN.switchId = +RSSD.AMN.parameters['Disable Switch ID'] || 0;
RSSD.AMN.nameFormat = RSSD.AMN.parameters['Common Name Format'] || '${NAME}: ';
RSSD.AMN.extraIndent = +RSSD.AMN.parameters['Message Extra Indent'] || 20;

var temp_arr = JSON.parse(RSSD.AMN.parameters['Name List']);
RSSD.AMN.nameList = {};
temp_arr.forEach((item)=>{
    const obj = JSON.parse(item);
    const faceName = obj['Face Image'];
    const faceIndex = obj['Face Index'] || '';
    const charName = obj['Character Name'];
    const nameColor = +obj['Name Color'] || 0;
    RSSD.AMN.nameList[faceName+'_'+faceIndex] = {name: charName, color: +nameColor};
});

//=============================================================================
// Window_Message
//=============================================================================

let __RSSD_AMN_Window_Message_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    __RSSD_AMN_Window_Message_newPage.call(this, textState);
    this.addCharAutoName(textState);
};

Window_Message.prototype._RSSD_AMN_realKeyForAutoName = function(faceName, faceIndex) {
    const list = Object.keys(RSSD.AMN.nameList);
    const keyName = faceName+'_'+faceIndex;
    const keyName2 = faceName+'_';
    if(list.includes(keyName)) return keyName;
    else if(list.includes(keyName2)) return keyName2;
    return '';
};

Window_Message.prototype.addCharAutoName = function(textState) {
    if(this.needsCharAutoName()) {
        this.applyCharAutoName(textState);
    }
};

Window_Message.prototype.needsCharAutoName = function() {
    const faceName = $gameMessage.faceName() || '';
    const faceIndex = ''+$gameMessage.faceIndex() || '';
    const keyName = this._RSSD_AMN_realKeyForAutoName(faceName, faceIndex);
    const isEnabled = RSSD.AMN.switchId ? !$gameSwitches.value(RSSD.AMN.switchId) : true;
    if(keyName) return isEnabled;
    return false;
};

Window_Message.prototype.applyCharAutoName = function(textState) {
    if(Utils.RPGMAKER_NAME !== 'MZ' || (Utils.RPGMAKER_NAME === 'MZ' && !RSSD.AMN.useNameBox)) {
        this.applyCharAutoNameInMessage(textState);
    } else if (Utils.RPGMAKER_NAME === 'MZ' && RSSD.AMN.useNameBox) {
        this.applyCharAutoNameInNameBox();
    }
};

Window_Message.prototype.applyCharAutoNameInMessage = function(textState) {
    const faceName = $gameMessage.faceName() || '';
    const faceIndex = ''+$gameMessage.faceIndex() || '';
    const keyName = this._RSSD_AMN_realKeyForAutoName(faceName, faceIndex);
    const obj = RSSD.AMN.nameList[keyName];
    const name = obj.name;
    const color = obj.color;
    const extraIndent = RSSD.AMN.extraIndent;
    const format = RSSD.AMN.nameFormat;
    const textColor = Utils.RPGMAKER_NAME === 'MZ' ? ColorManager.textColor(color) : this.textColor(color);
    const normalColor = Utils.RPGMAKER_NAME === 'MZ' ? ColorManager.normalColor() : this.normalColor();
    textState.y += this.lineHeight();
    textState.x += extraIndent;
    textState.left += extraIndent;
    this.changeTextColor(textColor);
    this.drawText(format.replace('${NAME}',name), this.newLineX(textState), 0, this.contentsWidth(), 'left');
    this.changeTextColor(normalColor);
};

Window_Message.prototype.applyCharAutoNameInNameBox = function() {
    const faceName = $gameMessage.faceName() || '';
    const faceIndex = ''+$gameMessage.faceIndex() || '';
    const keyName = this._RSSD_AMN_realKeyForAutoName(faceName, faceIndex);
    const obj = RSSD.AMN.nameList[keyName];
    const color = obj.color;
    const name = '\\C['+color+']'+obj.name+'\\C[0]';
    $gameMessage.setSpeakerName(name);
    this.updateSpeakerName();
};