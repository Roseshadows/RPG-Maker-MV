// ===================================================
// RSSD_HideDestinationSprite.js
// ===================================================
/*:
 * @plugindesc ver1.00 - 隐藏目的地光标
 * @author 离影玫 | Rose_shadows
 * @help
 * === Introduction ===
 * 
 * If you have basic coding knowledge and simply want to hide the destination 
 * sprite forever in the game, you just need to open rpg_sprites.js file, find
 * the function Sprite_Destination.prototype.createBitmap(), and then delete 
 * the line of script as follows:
 *   this.bitmap.fillAll('white');  // Delete this line
 * After that the destination sprite will never appear in the game.
 * 
 * However, you cannot directly add a conditional branch to show/hide the 
 * sprite by checking certain switch/variable's value.
 *
 * This plugin gives you ability to hide destination sprite when the specific
 * switch is turned ON.
 * 
 * --------------------------------------------------------------
 * === Terms of Use ===
 * 
 * Free to use for both commercial and non-commercial projects. You can alse 
 * modify or redistribute this plugin, as long as you do not claim this plugin
 * belongs to anyone except me, Rose_shadows | 离影玫 | OrchidBones | 兰骨. 
 * Credits are appreciated, but not required.
 * 
 * 
 * @param Hide Switch
 * @type switch
 * @desc When this switch is ON, the destination sprite will be hidden. If is 0, then the sprite will be never shown.
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
