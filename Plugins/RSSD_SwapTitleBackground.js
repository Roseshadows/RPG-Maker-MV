// ============================================================
//  RSSD_SwapTitleBackground.js
// ============================================================
/*:
 * @plugindesc ver1.00 - 在标题界面中动态切换多个背景图片
 * @author 离影玫 | Rose_shadows
 * @help
 *  === 介绍 ===
 * 
 * 该插件允许你在标题界面中动态切换多个背景图片。
 * 请将所有标题背景图片放到 img/titles1/ 文件夹下。
 * 
 * 
 *  === 部分参数说明 ===
 * 
 *    【背景帧序列】
 *  - 每个背景都有编号。打开参数【背景图片设置列表】，你会看到你所设置的
 *    每一行参数前面都有一个小数字，这就是背景的编号。
 *    该插件会通过背景的编号来控制背景图片的显示顺序/帧序列。
 *  # 举个例子：
 *     假设在【背景图片设置列表】中设置了如下图像：
 *        1: 背景_1
 *        2: 背景_2
 *        3: 背景_3
 *     如果在【背景帧序列】中进行如下设置：
 *        1,2,3,2
 *     那么标题图像就会以：
 *        背景_1 -> 背景_2 -> 背景_3 -> 背景_2
 *     的顺序循环播放。
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
 * @param 背景图片设置列表
 * @type struct<back>[]
 * @desc 在这里设置各个背景图片的相关参数。
 * @default []
 * 
 * @param 淡入淡出切换时长
 * @type number
 * @min 1
 * @desc 从当前图片切换到下一图片时所用的时长。单位帧。若想立即切换，设为1即可。
 * @default 40
 * 
 * @param 背景帧序列
 * @desc 背景将会按照此序列进行显示。数字间用逗号隔开。具体去看帮助文档。
 * @default 1,2,3,2
 */

/*~struct~back:
 * @param 图片资源
 * @type file
 * @dir img/titles1/
 * @require 1
 * @desc 所要使用的背景图片资源。
 * @default 
 * 
 * @param 显示时长
 * @type number
 * @min 1
 * @desc 该背景的显示时长。不包括淡入淡出切换时长。单位帧。
 * @default 180
 */

var Imported = Imported || {};
Imported.RSSD_SwapTitleBackground = true;

var RSSD = RSSD || {};
RSSD.SwapTitleBackground = {};

RSSD.SwapTitleBackground.parameters       = PluginManager.parameters('RSSD_SwapTitleBackground');
RSSD.SwapTitleBackground.transferDuration = +RSSD.SwapTitleBackground.parameters['淡入淡出切换时长'];
RSSD.SwapTitleBackground.animFrames       = RSSD.SwapTitleBackground.parameters['背景帧序列'].split(/[,，]/);
RSSD.SwapTitleBackground.animFrames = RSSD.SwapTitleBackground.animFrames.map(function(a){
    return +a;
});

RSSD.SwapTitleBackground.backImgs         = [null];
RSSD.SwapTitleBackground.animStayDuration = [null];
var imgArray = JSON.parse(RSSD.SwapTitleBackground.parameters['背景图片设置列表']) || [];
imgArray.forEach(function(a){
    var json = JSON.parse(a);
    var pic = json['图片资源'] || '';
    var duration = +json['显示时长'];
    RSSD.SwapTitleBackground.backImgs.push(ImageManager.loadBitmap('img/titles1/',pic));
    RSSD.SwapTitleBackground.animStayDuration.push(duration);
    return a;
});

Scene_Title.prototype.createBackground = function() {
    this._backImgs             = RSSD.SwapTitleBackground.backImgs;
    this._animFrames           = RSSD.SwapTitleBackground.animFrames;
    this._currentFrame         = 0;
    this._animStayDuration     = RSSD.SwapTitleBackground.animStayDuration;
    this._animTransferDuration = RSSD.SwapTitleBackground.transferDuration;
    this._backSpriteLast       = new Sprite(this._backImgs[this._animFrames[this._currentFrame]]);
    this._backSpriteNext       = new Sprite();
    this._backSpriteNext.opacity = 0;
    this.addChild(this._backSpriteLast);
    this.addChild(this._backSpriteNext);
};

Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.centerSprite(this._backSpriteLast);
    this.centerSprite(this._backSpriteNext);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
};

var Scene_Title_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
    Scene_Title_update.call(this);
    this._realStayDuration = this._realStayDuration || 0;
    if(this._realStayDuration >= this._animStayDuration[this._animFrames[this._currentFrame]] && 
        this._realStayDuration < this._animStayDuration[this._animFrames[this._currentFrame]] + this._animTransferDuration) {
        /** 开始淡入转换 */
        this.updateTransferBack();
    } else if(this._realStayDuration > this._animStayDuration[this._animFrames[this._currentFrame]] && 
            this._realStayDuration >= this._animStayDuration[this._animFrames[this._currentFrame]] + this._animTransferDuration) {
        /** 淡入结束，backSpriteNext和backSpriteLast接力 */
        this.updateBackAssociation();
    }
    this._realStayDuration += 1;
};

Scene_Title.prototype.updateTransferBack = function() {
    var opacityOffset = 255 / this._animTransferDuration;
    var nextBackIndex = this._animFrames[(this._currentFrame+1)%this._animFrames.length];
    this._backSpriteNext.bitmap = this._backImgs[nextBackIndex];
    this._backSpriteNext.opacity += opacityOffset;
};

Scene_Title.prototype.updateBackAssociation = function() {
    var nextBackIndex = this._animFrames[(this._currentFrame+1)%this._animFrames.length];
    this._backSpriteLast.bitmap = this._backImgs[nextBackIndex];
    this._backSpriteNext.opacity = 0;
    this._currentFrame++;
    this._currentFrame = this._currentFrame % this._animFrames.length;
    this._realStayDuration = 0;
};