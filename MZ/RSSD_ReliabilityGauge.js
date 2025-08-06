//==============================================================================
// RSSD_ReliabilityGauge.js
// Author: Rose_shadows
//==============================================================================
/*:
 * @plugindesc 1.0.0 - 可信度血条
 * @author Rose_shadows
 * @target MZ
 * @help
 * 
 * === 功能 ===
 * 
 * 1. 实现逆转裁判123“可信度血条”的功能。在对话进行时可显示在右上角。
 * 2. 用控制字符控制可信度血条的显隐、预备减少的血量、表演血量的减少等。
 * 
 * 
 * === 所需图片 ===
 * 
 * Window_RpGauge.png - 可信度血条窗口皮肤（名称在插件参数中可改）
 * 
 * 
 * === 控制字符 ===
 * 
 * \RPCWI
 * - 使可信度血条滑入屏幕。
 * 
 * \RPCWI[预备减少的血量数字]
 * - 滑入可信度血条，并以闪烁的效果表现将要扣除的血量。
 *   “预备减少的血量数字”：
 *   假设“预备减少的血量数字”为2，则可信度血条上会有2格血闪烁。
 * 
 * \RPCWO
 * - 使可信度血条滑出屏幕。滑出时预备减少的血量会成为0。
 * 
 * \RPCWC
 * - 立即更改预备减少的血量。在可信度血条已经滑入的前提下使用。
 * 
 * \RPCWR
 * - 根据已设的“预备减少的血量”表演血量的减少。
 *   在血量减少表演完成后，对话才会继续。
 * 
 *   具体表演流程：
 *   1. 预备减少的血量部分红黑交替闪烁3次（次数可在插件参数中改）
 *   2. 预备减少的血量消失，血量条震动（震动设定可在插件参数中改）
 * 
 * 
 * === 事件脚本 ===
 * 
 * $gameRpCounter.addRp(增加值);
 * - 增加可信度。
 * 
 * $gameRpCounter.reduceRp(减少值);
 * - 扣除可信度。
 * 
 * $gameRpCounter.setRpToBeReduced(预备扣除的可信度血量);
 * - 设置预备扣除的可信度。
 * 
 * $gameRpCounter.currentRp()
 * - 返回当前的可信度血量。
 * 
 * $gameRpCounter.maxRp()
 * - 返回可信度血量上限有几格。
 * 
 * $gameRpCounter.isOver()
 * - 检查可信度是否已被扣光。
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
 * @command 增加可信度
 * @desc 设置要增加的可信度。
 * 
 * @arg 值
 * @type number
 * @min 0
 * @desc 增加几格可信度？
 * @default 0
 * 
 * @command 减少可信度
 * @desc 设置要减少的可信度。
 * 
 * @arg 值
 * @type number
 * @min 0
 * @desc 减少几格可信度？
 * @default 0
 * 
 * @command 回满可信度
 * @desc 立即将可信度增加到最大值。
 * 
 * @command 扣光可信度
 * @desc 立即扣除全部可信度。
 * 
 * @param === 可信度血条参数设置 ===
 * 
 * @param 血量最大值
 * @parent === 可信度血条参数设置 ===
 * @type number
 * @default 10
 * 
 * @param 单块血条宽度
 * @parent === 可信度血条参数设置 ===
 * @type number
 * @default 20
 * 
 * @param === 可信度血条窗口设置 ===
 * 
 * @param 窗口皮肤
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 用于可行度血条背景窗口的窗口皮肤。
 * @default Window_RpGauge
 * 
 * @param 窗口X偏移
 * @parent === 可信度血条窗口设置 ===
 * @type number
 * @desc 血量条右侧和屏幕右侧的距离。
 * @default 10
 * 
 * @param 窗口Y坐标
 * @parent === 可信度血条窗口设置 ===
 * @type number
 * @default 15
 * 
 * @param 窗口高度
 * @parent === 可信度血条窗口设置 ===
 * @type number
 * @default 25
 * 
 * @param 窗口缩进
 * @parent === 可信度血条窗口设置 ===
 * @type number
 * @default 3
 * 
 * @param 窗口滑入滑出速度
 * @parent === 可信度血条窗口设置 ===
 * @type number
 * @desc 滑入滑出时每帧移动的距离。
 * @default 10
 * 
 * @param === 血条块贴图设置 ===
 * 
 * @param 血条块贴图CSS颜色
 * @parent === 血条块贴图设置 ===
 * @default #2989bc
 * 
 * @param 虚线CSS颜色
 * @parent === 血条块贴图设置 ===
 * @default #ffffff
 * 
 * @param 虚线偏移角度
 * @parent === 血条块贴图设置 ===
 * @type number
 * @min 45
 * @max 90
 * @desc 虚线和窗口底部之间的夹角大小。45度~90度之间。
 * @default 60
 * 
 * @param === 血条减少表演设置 ===
 * 
 * @param 闪烁间隔
 * @parent === 血条减少表演设置 ===
 * @type number
 * @desc 红黑交错闪烁的间隔时长。单位帧。
 * @default 15
 * 
 * @param 闪烁次数
 * @parent === 血条减少表演设置 ===
 * @type number
 * @desc 红黑交错闪烁的次数。
 * @default 3
 * 
 * @param 闪烁速度
 * @parent === 血条减少表演设置 ===
 * @type number
 * @min 1
 * @max 100
 * @desc 数字越大闪烁越快。
 * @default 50
 * 
 * @param 震动力度
 * @parent === 血条减少表演设置 ===
 * @type number
 * @default 1
 * 
 * @param 震动速度
 * @parent === 血条减少表演设置 ===
 * @type number
 * @default 15
 * 
 * @param 震动时长
 * @parent === 血条减少表演设置 ===
 * @type number
 * @desc 单位帧。
 * @default 10
 * 
 */
var Imported = Imported || {};
Imported.RSSD_ReliabilityGauge = true;

var RSSD = RSSD || {};
RSSD.RLG = {};
RSSD.RLG.pluginName = 'RSSD_ReliabilityGauge';

RSSD.RLG.parameters = PluginManager.parameters(RSSD.RLG.pluginName);
RSSD.RLG.maxRp = +RSSD.RLG.parameters['血量最大值'] || 10;
RSSD.RLG.oneRpWidth = +RSSD.RLG.parameters['单块血条宽度'] || 20;

RSSD.RLG.windowskin = RSSD.RLG.parameters['窗口皮肤'] || 'Window_RpGauge';
RSSD.RLG.windowPadding = +RSSD.RLG.parameters['窗口缩进'] || 3;
RSSD.RLG.windowHeight = +RSSD.RLG.parameters['窗口高度'] || 25;
RSSD.RLG.windowY = +RSSD.RLG.parameters['窗口Y坐标'] || 15;
RSSD.RLG.offsetX = +RSSD.RLG.parameters['窗口X偏移'] || 10;
RSSD.RLG.windowSlideSpeed = +RSSD.RLG.parameters['窗口滑入滑出速度'] || 10;

RSSD.RLG.dottedLineAngle = +RSSD.RLG.parameters['虚线偏移角度'] || 60; // 60°
RSSD.RLG.dottedLineCssColor = RSSD.RLG.parameters['虚线CSS颜色'] || '#ffffff';
RSSD.RLG.rpCssColor = RSSD.RLG.parameters['血条块贴图CSS颜色'] || '#2989bc';

RSSD.RLG.rpReducingFlashInterval = +RSSD.RLG.parameters['闪烁间隔'] || 15; // frames
RSSD.RLG.rpReducingFlashTimes = +RSSD.RLG.parameters['闪烁次数'] || 3;
RSSD.RLG.rpReducingFlashSpeed = +RSSD.RLG.parameters['闪烁速度'] || 50;
RSSD.RLG.rpReducingShakePower = +RSSD.RLG.parameters['震动力度'] || 1;
RSSD.RLG.rpReducingShakeSpeed = +RSSD.RLG.parameters['震动速度'] || 15;
RSSD.RLG.rpReducingShakeDuration = +RSSD.RLG.parameters['震动时长'] || 10;

//=============================================================================
// DataManager
//=============================================================================

var $gameRpCounter = null;

var __AA_RG_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    __AA_RG_DataManager_createGameObjects.call(this);
    $gameRpCounter = new Game_RpCounter();
};

var __AA_RG_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const contents = __AA_RG_DataManager_makeSaveContents.call(this);
    contents.rpCounter = $gameRpCounter;
    return contents;
};

var __AA_RG_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    __AA_RG_DataManager_extractSaveContents.call(this, contents);
    $gameRpCounter = contents.rpCounter;
};

//=============================================================================
// Game_RpCounter
//=============================================================================

function Game_RpCounter() {
    this.initialize(...arguments);
}

Game_RpCounter.prototype.initialize = function() {
    this.clear();
};

Game_RpCounter.prototype.clear = function() {
    this._currentRp = this.maxRp();
    this._rpToBeReduced = 0;
};

Game_RpCounter.prototype.maxRp = function() {
    return RSSD.RLG.maxRp;
};

Game_RpCounter.prototype.addRp = function(num) {
    const max = this.maxRp();
    this._currentRp = Math.min(max, this._currentRp + num);
};

Game_RpCounter.prototype.reduceRp = function(num) {
    this._currentRp = Math.max(0, this._currentRp - num);
};

Game_RpCounter.prototype.rpToBeReduced = function() {
    return this._rpToBeReduced;
};

Game_RpCounter.prototype.setRpToBeReduced = function(num) {
    this._rpToBeReduced = num;
};

Game_RpCounter.prototype.isOver = function() {
    return this._currentRp === 0;
};

Game_RpCounter.prototype.oneRpWidth = function() {
    return RSSD.RLG.oneRpWidth;
};

Game_RpCounter.prototype.currentRp = function() {
    return this._currentRp;
};

//=============================================================================
// Window_RpCounter
//=============================================================================

function Window_RpCounter() {
    this.initialize(...arguments);
}

Window_RpCounter.prototype = Object.create(Window_Base.prototype);
Window_RpCounter.prototype.constructer = Window_RpCounter;

Window_RpCounter.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.margin = RSSD.RLG.windowPadding;
    this.width = rect.width + this.rpPadding() + this._rpSpriteBaseX() + $gameRpCounter.oneRpWidth();
    this.initRpSprites();
    this.initSlide();
    this._windowBasicX = this.x; // 操作 x 时只操作这个参数，用来兼容震动
};

Window_RpCounter.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(RSSD.RLG.windowskin);
};

Window_RpCounter.prototype.updatePadding = function() {
    this.padding = RSSD.RLG.windowPadding;
};

Window_RpCounter.prototype.initRpSprites = function() {
    this.refreshRpData();
    this.initRgSpriteContainer();
};

Window_RpCounter.prototype.initSlide = function() {
    this._isSlidingIn = false;
    this._isSlidingOut = false;
};

Window_RpCounter.prototype.refreshRpData = function() {
    this.clearRpToBeReduced();
    this.clearRpReducing();
    this.clearRpFlash();
    this.clearRpShake();
};

Window_RpCounter.prototype.clearRpReducing = function() {
    this._isRpReducing = false;
    this._rpReduceTimes = 0;
    this._rpSepWaitCount = 0;
    this._isRpReducingColorBlack = true;
};

Window_RpCounter.prototype.clearRpFlash = function() {
    this._rpFlashTransparentColor = [255, 255, 255, 0];
    this._rpFlashBlackColor = [0, 0, 0, 255];
    this._rpFlashInitColor = [243, 43, 43, 255];
    this._rpFlashInitColorForReducing = this._rpFlashInitColor.clone();
    this._rpFlashColor = this._rpFlashInitColor.clone();
};

Window_RpCounter.prototype.clearRpShake = function() {
    this._rpShake = 0;
    this._rpShakePower = RSSD.RLG.rpReducingShakePower;
    this._rpShakeSpeed = RSSD.RLG.rpReducingShakeSpeed;
    this._rpShakeDirection = 1;
    this._rpShakeDuration = 0;
};

Window_RpCounter.prototype.rpShake = function() {
    return this._rpShake;
};

Window_RpCounter.prototype.initRgSpriteContainer = function() {
    this._rpSpriteContainer = new Sprite();
    this._rpSpriteContainer.setFrame(0, 0, this.contentsWidth(), this.contentsHeight());
    this._rpRectContainer = new Sprite();
    this._rpDottedLineContainer = new Sprite();
    for(let i = 0; i < $gameRpCounter.maxRp(); i++) {
        const sprite1 = new Sprite();
        const sprite2 = new Sprite();
        this._rpRectContainer.addChild(sprite1);
        this._rpDottedLineContainer.addChild(sprite2);
        this.updateRpSpriteGeometry(sprite1, i);
        this.updateDottedLineSpriteGeometry(sprite2, i);
    }
    this._rpSpriteContainer.addChild(this._rpRectContainer);
    this._rpSpriteContainer.addChild(this._rpDottedLineContainer);
    this._contentsSprite.addChild(this._rpSpriteContainer);
    /**
     * 血条图片排布方式 child index
     * [9] [8] [7] [6] [5] [4] [3] [2] [1] [0]
     */
};

Window_RpCounter.prototype.updateRpSpriteGeometry = function(sprite, index) {
    this.drawRectForSprite(sprite, index);
    this.resetRpSpritePosition(sprite, index);
};

Window_RpCounter.prototype.updateDottedLineSpriteGeometry = function(sprite, index) {
    this.drawDottedLineForSprite(sprite, index);
    this.resetDottedLineSpritePosition(sprite, index);
};

Window_RpCounter.prototype.drawRectForSprite = function(sprite, index) {
    const side = this.rpRectSideLength();
    const color = this.rpCssColor();
    sprite.bitmap = new Bitmap(side, side);
    sprite.bitmap.fillAll(color);
};

Window_RpCounter.prototype.drawDottedLineForSprite = function(sprite, index) {
    if(index < $gameRpCounter.maxRp()) {
        // 新Sprite
        const side = this.rpRectSideLength();
        sprite.bitmap = new Bitmap(side, side);
        // 画虚线
        const c_dl = this.dottedLineCssColor();
        const width = this.dottedLineWidth();
        const length = this.dottedLineLength();
        const space = this.dottedLineSpace();
        const x = side - width;
        let currentLength = 0;
        while(currentLength < side) {
            sprite.bitmap.fillRect(x, currentLength, width, length, c_dl);
            currentLength += length + space;
        }
    }
};

Window_RpCounter.prototype.resetRpSpritePosition = function(sprite, index) {
    const side = this.rpRectSideLength();
    const width = $gameRpCounter.oneRpWidth();
    const angle = Math.PI / 2 - this.dottedLineAngle();
    const baseX = this._rpSpriteBaseX();
    const max = $gameRpCounter.maxRp();
    const p_index = max - index;
    let x = Math.round(baseX + p_index * width);
    sprite.setFrame(0, 0, side, side);
    sprite.anchor.x = 1;
    sprite.anchor.y = 0;
    sprite.move(x, 0);
    if(index) {
        sprite.rotation = angle;
    }
};

Window_RpCounter.prototype.resetDottedLineSpritePosition = function(sprite, index) {
    this.resetRpSpritePosition(sprite, index);
};

Window_RpCounter.prototype.start = function() {
    this.refresh();
    this.startSlideIn();
};

Window_RpCounter.prototype.terminate = function() {
    $gameRpCounter.setRpToBeReduced(0);
    this.startSlideOut();
};

Window_RpCounter.prototype.startSlideIn = function() {
    this._isSlidingIn = true;
    this._isSlidingOut = false;
};

Window_RpCounter.prototype.startSlideOut = function() {
    this._isSlidingOut = true;
    this._isSlidingIn = false;
};

Window_RpCounter.prototype.startRpReducing = function() {
    this._isRpReducing = true;
};

Window_RpCounter.prototype.rpToBeReduced = function() {
    return $gameRpCounter.rpToBeReduced();
};

Window_RpCounter.prototype.clearRpToBeReduced = function() {
    this._spritesToBeReduced = [];
};

Window_RpCounter.prototype.dottedLineAngle = function() {
    return RSSD.RLG.dottedLineAngle / 180 * Math.PI;
};

Window_RpCounter.prototype.dottedLineWidth = function() {
    return 1;
};

Window_RpCounter.prototype.dottedLineLength = function() {
    return 3;
};

Window_RpCounter.prototype.dottedLineSpace = function() {
    return 2;
};

Window_RpCounter.prototype.rpPadding = function() {
    return $gameRpCounter.oneRpWidth() / 2;
};

Window_RpCounter.prototype.rpCssColor = function() {
    return RSSD.RLG.rpCssColor;
};

Window_RpCounter.prototype.dottedLineCssColor = function() {
    return RSSD.RLG.dottedLineCssColor;
};

Window_RpCounter.prototype.rpRectSideLength = function() {
    return Math.round($gameRpCounter.oneRpWidth() * 2);
};

Window_RpCounter.prototype._rpSpriteBaseX = function() {
    const ch = this.contentsHeight();
    const padding = this.rpPadding();
    const width = $gameRpCounter.oneRpWidth();
    const angle = this.dottedLineAngle();
    return padding + ch / Math.tan(angle) - width;
};

Window_RpCounter.prototype.slideSpeed = function() {
    return RSSD.RLG.windowSlideSpeed;
};

Window_RpCounter.prototype.isRpReducing = function() {
    return this._isRpReducing;
};

Window_RpCounter.prototype.refresh = function() {
    this.refreshRpSpriteVisibility();
    this.refreshRpToBeReduced();
};

Window_RpCounter.prototype.refreshRpSpriteVisibility = function() {
    this._rpRectContainer.children.forEach((sprite)=>{
        sprite.visible = true;
    });
    this._rpDottedLineContainer.children.forEach((sprite)=>{
        sprite.visible = true;
    });
    const rp = $gameRpCounter.currentRp();
    const max = $gameRpCounter.maxRp();
    const rest = max - rp;
    for(let i = 0; i < rest; i++) {
        const index = i;
        this.reduceRp(index);
    }
};

Window_RpCounter.prototype.refreshRpToBeReduced = function() {
    if(!this.isRpReducing()) {
        this.clearRpToBeReduced();
        const max = $gameRpCounter.maxRp();
        const rp = $gameRpCounter.currentRp();
        const rest = max - rp;
        const reduced = Math.min(rp, this.rpToBeReduced());
        for(let i = rest; i < rest + reduced; i++) {
            const index = i;
            const sprite = this._rpRectContainer.children[index];
            this._spritesToBeReduced.push(sprite);
        }
    }
};

Window_RpCounter.prototype.reduceRp = function(index) {
    this._rpRectContainer.children[index].visible = false;
    if(index < $gameRpCounter.maxRp()) {
        this._rpDottedLineContainer.children[index+1].visible = false;
    }
};

Window_RpCounter.prototype.addRp = function(index) {
    this._rpRectContainer.children[index].visible = true;
    if(index < $gameRpCounter.maxRp()) {
        this._rpDottedLineContainer.children[index+1].visible = true;
    }
};

Window_RpCounter.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateSlideIn();
    this.updateSlideOut();
    this.updateRpShake();
    this.updateRpSpriteFlashEffect();
    this.updateRpSpriteBlendColor();
    this.updateRpSpriteBlendColorToBeReduced();
    this.updateRpReducingEffect();
    this.updateWindowPosition();
};

Window_RpCounter.prototype.updateSlideIn = function() {
    if(this._isSlidingIn) {
        const targetX = Graphics.width - this.width - RSSD.RLG.offsetX;
        this._windowBasicX -= this.slideSpeed();
        if(this._windowBasicX <= targetX) {
            this._windowBasicX = targetX;
            this._isSlidingIn = false;
        }
    }
};

Window_RpCounter.prototype.updateSlideOut = function() {
    if(this._isSlidingOut) {
        const targetX = Graphics.width;
        this._windowBasicX += this.slideSpeed();
        if(this._windowBasicX >= targetX) {
            this._windowBasicX = targetX;
            this._isSlidingOut = false;
        }
    }
};

Window_RpCounter.prototype.updateRpReducingEffect = function() {
    if(this.isRpReducing()) {
        if(this._rpReduceTimes < RSSD.RLG.rpReducingFlashTimes) {
            if(this._rpReduceTimes === 0 && this._rpSepWaitCount === 0) {
                // 开始时运行的代码
                this.prepareForRpReducing();
            }
            if(this._rpSepWaitCount === RSSD.RLG.rpReducingFlashInterval) {
                this._rpSepWaitCount = 0;
                const color = this._isRpReducingColorBlack ? this._rpFlashBlackColor : this._rpFlashInitColorForReducing;
                this._spritesToBeReduced.forEach((sprite)=>{
                    sprite.setBlendColor(color);
                });
                this._isRpReducingColorBlack = !this._isRpReducingColorBlack;
                if(!this._isRpReducingColorBlack) this._rpReduceTimes++;
            }
            this._rpSepWaitCount++;
        } else {
            this.onRpReducing();
        }
    }
};

Window_RpCounter.prototype.prepareForRpReducing = function() {
    this._spritesToBeReduced.forEach((sprite)=>{
        sprite.setBlendColor(this._rpFlashInitColorForReducing);
    });
};

Window_RpCounter.prototype.onRpReducing = function() {
    this.clearRpReducing();
    $gameRpCounter.reduceRp($gameRpCounter.rpToBeReduced());
    $gameRpCounter.setRpToBeReduced(0);
    this._spritesToBeReduced.forEach((sprite)=>{
        const index = this._rpRectContainer.children.indexOf(sprite);
        this.reduceRp(index);
    });
    this.clearRpToBeReduced();
    this.startRpReducingShake();
};

Window_RpCounter.prototype.startRpReducingShake = function() {
    this._rpShakeDuration = RSSD.RLG.rpReducingShakeDuration;
};

Window_RpCounter.prototype.updateRpShake = function() {
    if(this._rpShakeDuration > 0 || this._rpShake !== 0) {
        const delta =
            (this._rpShakePower * this._rpShakeSpeed * this._rpShakeDirection) / 10;
        if (
            this._rpShakeDuration <= 1 &&
            this._rpShake * (this._rpShake + delta) < 0
        ) {
            this._rpShake = 0;
        } else {
            this._rpShake += delta;
        }
        if (this._rpShake > this._rpShakePower * 2) {
            this._rpShakeDirection = -1;
        }
        if (this._rpShake < -this._rpShakePower * 2) {
            this._rpShakeDirection = 1;
        }
        this._rpShakeDuration--;
    }
};

Window_RpCounter.prototype.updateRpSpriteFlashEffect = function() {
    const speed = RSSD.RLG.rpReducingFlashSpeed;
    this._rpFlashColor[3] = 255 * Math.abs(Math.sin(this._animationCount * speed / 1000));
};

Window_RpCounter.prototype.updateRpSpriteBlendColor = function() {
    if(!this.isRpReducing()) {
        this._rpRectContainer.children.forEach((sprite)=>{
            sprite.setBlendColor(this._rpFlashTransparentColor);
        });
    }
};

Window_RpCounter.prototype.updateRpSpriteBlendColorToBeReduced = function() {
    if(this.rpToBeReduced() && !this.isRpReducing()) {
        this._spritesToBeReduced.forEach((sprite)=>{
            sprite.setBlendColor(this._rpFlashColor);
        });
    }
};

Window_RpCounter.prototype.updateWindowPosition = function() {
    this.x = this._windowBasicX;
    this.x += this.rpShake();
};

//=============================================================================
// Window_Message
//=============================================================================

var __AA_RG_WindowMessage_initMembers = Window_Message.prototype.initMembers;
Window_Message.prototype.initMembers = function() {
    __AA_RG_WindowMessage_initMembers.call(this);
    this._rpCounterWindow = null;
};

Window_Message.prototype.setRpCounterWindow = function(window) {
    this._rpCounterWindow = window;
};

var __AA_RG_Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch(code) {
        case 'RPCWI':
            this.processRpCounterWindowStart(this.obtainEscapeParam(textState));
            break;
        case 'RPCWO':
            this.processRpCounterWindowTerminate();
            break;
        case 'RPCWC':
            this.processRpCounterWindowChangeReduceValue(this.obtainEscapeParam(textState));
            break;
        case 'RPCWR':
            this.processRpCounterWindowReducing();
            break;
        default:
            __AA_RG_Window_Message_processEscapeCharacter.call(this, code, textState);
    }
};

Window_Message.prototype.processRpCounterWindowStart = function(num) {
    num = num || 0;
    $gameRpCounter.setRpToBeReduced(num);
    this._rpCounterWindow.start();
};

Window_Message.prototype.processRpCounterWindowTerminate = function() {
    this._rpCounterWindow.terminate();
};

Window_Message.prototype.processRpCounterWindowChangeReduceValue = function(num) {
    $gameRpCounter.setRpToBeReduced(num);
    this._rpCounterWindow.refreshRpToBeReduced();
};

Window_Message.prototype.processRpCounterWindowReducing = function() {
    if($gameRpCounter.rpToBeReduced()) {
        this._rpCounterWindow.startRpReducing();
        const waitCount = (RSSD.RLG.rpReducingFlashTimes * 2 - 1) * RSSD.RLG.rpReducingFlashInterval + RSSD.RLG.rpReducingShakeDuration;
        this.startWait(waitCount);
    }
};

//=============================================================================
// Scene_Map
//=============================================================================

var __AA_RG_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    __AA_RG_Scene_Map_createAllWindows.call(this);
    this.createRpCounterWindow();
};

Scene_Map.prototype.createRpCounterWindow = function() {
    const rect = this.rpCounterWindowRect();
    this._rpCounterWindow = new Window_RpCounter(rect);
    this.addChild(this._rpCounterWindow);
    this._messageWindow.setRpCounterWindow(this._rpCounterWindow);
};

Scene_Map.prototype.rpCounterWindowRect = function() {
    const rect = new Rectangle();
    const padding = RSSD.RLG.windowPadding;
    rect.x = Graphics.width;
    rect.y = RSSD.RLG.windowY;
    rect.width = ($gameRpCounter.maxRp()-2) * $gameRpCounter.oneRpWidth() + 2 * padding;
    rect.height = RSSD.RLG.windowHeight + 2 * padding;
    return rect;
};

//=============================================================================
// PluginManager
//=============================================================================

PluginManager.registerCommand(RSSD.RLG.pluginName, '增加可信度', (args)=>{
    const value = +args['值'];
    $gameRpCounter.addRp(value);
});

PluginManager.registerCommand(RSSD.RLG.pluginName, '减少可信度', (args)=>{
    const value = +args['值'];
    $gameRpCounter.reduceRp(value);
});

PluginManager.registerCommand(RSSD.RLG.pluginName, '回满可信度', (args)=>{
    $gameRpCounter.addRp($gameRpCounter.maxRp());
});

PluginManager.registerCommand(RSSD.RLG.pluginName, '扣除可信度', (args)=>{
    $gameRpCounter.reduceRp($gameRpCounter.maxRp());
});