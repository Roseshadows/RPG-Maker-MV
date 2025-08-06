// ===================================================
// RSSD_HideDestinationSprite.js
// ===================================================
/*:
 * @plugindesc 1.0.0 - 隐藏目的地光标
 * @author 离影玫 | Rose_shadows
 * @help
 * === 介绍 ===
 * 
 * 该插件允许你通过开关控制目的地光标的显示与隐藏。
 * 
 * 
 * === 使用条款 ===
 *
 * MIT 协议
 * 
 * 
 * @param Hide Switch
 * @text 控制显隐的开关
 * @type switch
 * @desc 开关打开时光标隐藏。若为0，则永久隐藏。
 * @default 0
 */

var Imported = Imported || {};
Imported.RSSD_HideDestinationSprite = true;

var RSSD_HDS = RSSD_HDS || {};

RSSD_HDS.parameters = PluginManager.parameters('RSSD_HideDestinationSprite');
RSSD_HDS.hideSwitch = Number(RSSD_HDS.parameters['Hide Switch'] || 0);

var _Sprite_Destination_initialize = Sprite_Destination.prototype.initialize;
Sprite_Destination.prototype.initialize = function() {
    _Sprite_Destination_initialize.call(this);
    this._hide = RSSD_HDS.hideSwitch ? false : true;
}

var _Sprite_Destination_createBitmap = Sprite_Destination.prototype.createBitmap;
Sprite_Destination.prototype.createBitmap = function() {
    _Sprite_Destination_createBitmap.call(this);
    this.bitmap.clear();
    var tileWidth = $gameMap.tileWidth();
    var tileHeight = $gameMap.tileHeight();
    this.bitmap = new Bitmap(tileWidth, tileHeight);
    this.whetherToFillAll();
    // this.bitmap.fillAll('white');
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.blendMode = Graphics.BLEND_ADD;
}

Sprite_Destination.prototype.whetherToFillAll = function() {
    if (this._hide == false) {
        this.bitmap.fillAll('white');
    }
}

Sprite_Destination.prototype.updateVisible = function() {
    this._hide = RSSD_HDS.hideSwitch ? $gameSwitches.value(RSSD_HDS.hideSwitch) : true;
}

Sprite_Destination.prototype.updateRect = function() {
    Sprite_Destination.prototype.createBitmap.call(this);
}

var _Sprite_Destination_update = Sprite_Destination.prototype.update;
Sprite_Destination.prototype.update = function() {
    _Sprite_Destination_update.call(this);
    if ($gameTemp.isDestinationValid) {
        this.updateVisible();
        this.updateRect();
    }
}
