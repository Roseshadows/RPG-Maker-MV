//=============================================================================
// TAA_BookMenu_UnreadBookTitle.js
// 作者: Rose_shadows
// 源插件作者：Taaspider
//=============================================================================
/*:
 * @plugindesc [1.0.0] 书籍菜单 - 扩展 - 待阅书籍标题/内容
 * @author Rose_shadows
 * @target MV MZ
 * @help 
 * 本插件是 TAA_BookManu.js 的扩展插件。
 * 源插件作者：Taaspider 
 * https://taaspider.itch.io
 * 请将本插件放在 TAA_BookMenu.js 之下。
 * 
 * 使用后，可以自定义待阅书籍在书籍菜单列表窗口中所显示的书籍名和内容。
 * 当书籍的阅读状态设为已阅时，真正的书籍名和内容就会显示出来。
 * 
 * ！注意！
 * 在使用本插件之前，必须先将 TAA_BookMenu.js 中“菜单列表窗口配置”（Menu List 
 * Window Config）参数下的“是否隐藏待阅书籍”（Hide Unread Books）设为 false，
 * 否则该插件无法生效。
 * 
 * @param Unread Book Title
 * @text 待阅书籍标题
 * @desc 要显示的待阅书籍标题。
 * @default ?????
 * 
 * @param Unread Book Contents
 * @text 待阅书籍内容
 * @desc 要显示的待阅书籍内容文本。
 * @default 该书籍还未发现。
 * 
 * @param Title Color
 * @text 标题颜色代码
 * @type number
 * @desc 待阅书籍标题的颜色代码。和对话消息框中的颜色代码一致。默认是 8 (灰色)。
 * @default 8
 */

var Imported = Imported || {};
Imported.TAA_BM_UBT = true;

var RSSD = RSSD || {};
RSSD.TAA_BM_UBT = {};

var pluginName = 'TAA_BookMenu_UnreadBookTitle';
var parameters = PluginManager.parameters(pluginName);
RSSD.TAA_BM_UBT.unreadTitle    = parameters['Unread Book Title'] || '?????';
RSSD.TAA_BM_UBT.unreadContents = parameters['Unread Book Contents'] || '该书籍还未发现。'
RSSD.TAA_BM_UBT.titleColorCode = parameters['Title Color'] || '8';

Window_BookList.prototype.addBookItem = function(item){
    var category = $dataBooks._categoryByBookKey[item];
    var title = !$dataBooks._booksRead[category].contains(item) ? this.convertEscapeCharacters('\\C['+RSSD.TAA_BM_UBT.titleColorCode+']'+RSSD.TAA_BM_UBT.unreadTitle+'\\C[0]') : this.convertEscapeCharacters($dataBooks.getBookTitle(item));
    if(item !== undefined)
        this.addCommand(title, 'book', true, item);
};

Window_BookTitle.prototype.drawBookTitle = function(align){
    var category = $dataBooks._categoryByBookKey[this._bookKey];
    var wx = this.getAlignedX($dataBooks.getBookTitle(this._bookKey), align);
    var t = !$dataBooks._booksRead[category].contains(this._bookKey) ? RSSD.TAA_BM_UBT.unreadTitle : $dataBooks.getBookTitle(this._bookKey);
    var title = "\\C[" + $dataBooks.getBookTitleColor(this._bookKey) + "]" + t + "\\C[0]";
    this.drawTextEx(title, wx, 0);
};

var __Window_BookText_prepareBookText = Window_BookText.prototype.prepareBookText;
Window_BookText.prototype.prepareBookText = function(bookKey){
    var category = $dataBooks._categoryByBookKey[bookKey];
    if(!$dataBooks._booksRead[category].contains(bookKey)) {
        var text = RSSD.TAA_BM_UBT.unreadContents;
        this.preparePrintableObjects(text);
        this._prepareToPrint = false;
    } else {
        __Window_BookText_prepareBookText.call(this, bookKey);
    }
};