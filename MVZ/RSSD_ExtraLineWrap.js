/*:
 * @plugindesc 1.0.0 - 窗口文本手动另起一行
 * @target MZ
 * @help 
 * === 介绍 ===
 * 
 * 使用该插件，可以设置三行或三行以上的帮助窗口文本。
 * 功能和用法等同于 YEP_MessageCore.js 里的 <LINEBREAK> 。
 * 
 * 
 * === 使用方法 ===
 * 
 * 在需要断行的地方添加 <NEWLINE> 标签，即可让该标签之后的文字另起一行。
 * ！注意！该插件不会修改窗口的实际高度。
 * 
 * 
 * === 使用条款 ===
 *
 * MIT 协议
 * 
 */

var Imported = Imported || {};
Imported.RSSD_ExtraLineWrap = true;

var RSSD = RSSD || {};
RSSD.ELW = {};

var __RSSD_ELW_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = this.setCustomLineBreak(text);
    text = __RSSD_ELW_Window_Base_convertEscapeCharacters.call(this, text);
    return text;
};

Window_Base.prototype.setCustomLineBreak = function(text) {
    text = text.replace(/<NEWLINE>/gi, '\n');
    return text;
};

var __RSSD_ELW_Window_Base_processNormalCharacter = Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
    if(this.shouldCustomLineBreak(textState)) {
        this.processNewLine(textState);
    } else {
        __RSSD_ELW_Window_Base_processNormalCharacter.call(this, textState);
    }
};

Window_Base.prototype.shouldCustomLineBreak = function(textState) {
    if(textState) {
        var nextBreak = textState.text.indexOf('\n', textState.index + 1);
        if (nextBreak > 0) return true;
    }
    return false;
};