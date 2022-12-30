//=============================================================================
// RSSD_VXFacesets.js
//=============================================================================
/*:
 * @plugindesc ver1.00 - 在MV中应用VX/VXACE脸图
 * @author Rose_shadows
 * @help 
 *   === 介绍 ===
 * 
 * 当从VX/VXACE转移项目时，不难发现MV脸图的尺寸比原来工程的尺寸要大。
 * 虽然，如果不嫌麻烦的话，可以一个一个将单个脸图组织成576x288的标准MV
 * 格式，但当脸图文件数量过于庞大时，这样的工作就会变得费时费力，几乎
 * 毫无意义。
 * 而本插件允许你在MV中直接使用VX/VXACE样式的脸图。
 * 虽然仍需对原图进行一点修改，但工程量远比依次组织单个脸图要少。
 * 而且不只是VX/VXACE标准素材，自定义的素材大小也允许使用。
 * 
 * ----------------------------------------------------------------------------
 *   === 指导 ===
 * 
 * 1. 设置好相关的插件参数。
 * 2. 在img/文件夹里创建一个名为 {文件夹前缀}+faces 的文件夹。
 *      {文件夹前缀}是要读取的文件夹的前缀，在插件参数中可以自定义，
 *      但不能为空。默认是 vx_ 。
 *    所以默认情况下，你需要在img/文件夹中创建一个名叫 vx_faces 的文件夹。
 * 3. 将所要使用的VX/VXACE脸图同时放入 img/faces/ 文件夹和刚才创建的文件夹
 *    中。
 * 4. 打开编辑器，像编辑MV脸图一样编辑所要使用的脸图就行了。
 * 
 * *注*：如果你直接将原图放进去，不做任何修改的话，会出现一个问题：
 *      你会发现你永远都无法使用从左到右第4列（索引为3,7）的脸图。
 *      目前的解决办法是：打开ps(或任何可以创建图形的软件，这里只以ps
 *      为例):
 *      新建一个576x288大小的透明底背景，将脸图拖进去，图片左上角与背景
 *      左上角对齐。
 *      随后直接导出.png文件，然后替换原来两个文件夹中的脸图即可。
 *      这样，在编辑器中最右侧一列的脸图就可以选上了。
 * 
 * ----------------------------------------------------------------------------
 *   === 部分插件参数说明 ===
 * 
 *  Face Offset X/Y 
 * - 新功能：设置对话框、状态界面、姓名编辑框和菜单中脸图位置的偏移。
 *   若为0，则代表脸图会贴在左上角。
 *   建议是 (MV默认单个脸图大小(144) - 所使用的单个脸图的大小) / 2 。
 *   这样，脸图可以居中显示。
 *   默认是24，即 (MV脸图大小(144) - VX/Ace脸图大小(96)) / 2 。
 * 
 * ----------------------------------------------------------------------------
 *   === 兼容性 ===
 * 
 * - 将该插件放在YEP_MessageCore.js的下面。
 *   记得将消息核心的'有脸图时文本缩进'的参数改一下。建议改成168 (144+24)
 * - 覆写了一些方法……所以请尽量将该插件放在靠上的位置。
 * 
 * ----------------------------------------------------------------------------
 *   === 使用条款 ===
 * 
 * - MIT协议
 * 
 * ----------------------------------------------------------------------------
 *   === 更新日志 ===
 * 
 * v1.00 - 完成。
 * v1.10 - 简化了代码。
 * 
 * @param === 常规 ===
 *
 * @param Folder Prefix
 * @text 文件夹前缀名
 * @parent === 常规 ===
 * @desc 为将新创建的文件夹与原文件夹faces区分开而提供的功能。
 * 默认: vx_
 * @default vx_
 * 
 * @param File Prefix
 * @text 图像文件前缀名
 * @parent === 常规 ===
 * @desc 为将所使用的脸图与放在faces文件夹的脸图区分开而提供的功能。
 * 默认: （空）
 * @default 
 * 
 * @param Face Width
 * @text 脸图宽度
 * @parent === 常规 ===
 * @type number
 * @desc 所用单个脸图的宽度。默认96
 * @default 96
 * 
 * @param Face Height
 * @text 脸图高度
 * @parent === 常规 ===
 * @type number
 * @desc 所用单个脸图的高度。默认96
 * @default 96
 * 
 * @param Face Offset X
 * @text 脸图位置偏移 X
 * @parent === 常规 ===
 * @type number
 * @desc 脸图的X偏移。默认是24
 * @default 24
 * 
 * @param Face Offset Y
 * @text 脸图位置偏移 Y
 * @parent === 常规 ===
 * @type number
 * @desc 脸图的Y偏移。默认是24
 * @default 24
 */

(function() {

    var Imported = Imported || {};
    Imported.RSSD_VXFacesets = true;

    var RSSD = RSSD || {};
    RSSD.DVFM = {};

    var parameters = PluginManager.parameters('RSSD_VXFacesets');
    RSSD.DVFM.folderPrefix = String(parameters['Folder Prefix'] || 'vx_');
    RSSD.DVFM.filePrefix   = String(parameters['File Prefix']);
    RSSD.DVFM.faceWidth    = Number(parameters['Face Width'] || 96);
    RSSD.DVFM.faceHeight   = Number(parameters['Face Height'] || 96);
    RSSD.DVFM.faceOffsetX  = Number(parameters['Face Offset X']);
    RSSD.DVFM.faceOffsetY  = Number(parameters['Face Offset Y']);

    if (Imported.DP_VXTiles) {
        console.log('提醒：插件 RSSD_VXFacesets.js 与插件 DP_VXTiles.js 部分功能重合。\n只打开其中任意一个插件即可。');
    }

    Window_Base._faceWidth  = RSSD.DVFM.faceWidth;
    Window_Base._faceHeight = RSSD.DVFM.faceHeight;

    ImageManager.loadFace = function(filename, hue) {
        return this.loadBitmap('img/' + RSSD.DVFM.folderPrefix + 'faces/', RSSD.DVFM.filePrefix + filename, hue, true);
    };

    Window_Base.prototype.drawActorFace = function(actor, x, y, width, height) {
        this.drawFace(actor.faceName(), actor.faceIndex(), x + RSSD.DVFM.faceOffsetX, y + RSSD.DVFM.faceOffsetY, width, height);
    }

    Window_SkillStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            var y = h / 2 - this.lineHeight() * 1.5;
            var width = w - 162 - this.textPadding();
            this.drawActorFace(this._actor, 0, 0, Window_Base._faceWidth, Window_Base._faceHeight);
            this.drawActorSimpleStatus(this._actor, 162, y, width);
        }
    };
})();
