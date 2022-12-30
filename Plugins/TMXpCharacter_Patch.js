// ==================================================
//  TMXpCharacter_Patch.js
// ==================================================
/*:
 * @plugindesc TMXpCharacter.js 插件补丁
 * @author 离影玫 | Rose_shadows
 * @help 
 * === 介绍 ===
 * 
 * 在MV 1.6版本修复了以下问题：
 *  1. XP行走图初始帧显示了错误的图像；
 *  2. 在窗口中不正确绘制了XP行走图。
 * 
 * 现在，XP行走图初始帧将显示从左向右第一帧的图像(而非第二帧);
 * 在窗口中使用drawCharacter也可以正常绘制XP行走图图像。
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT协议
 */

if(Imported.TMXpCharacter){


    /** Game_CharacterBase */

    var _Game_CharacterBase_straighten = Game_CharacterBase.prototype.straighten;
    Game_CharacterBase.prototype.straighten = function() {
        _Game_CharacterBase_straighten.call(this);
        if (this._isXpCharacter && (this.hasWalkAnime() || this.hasStepAnime())) {
            this._pattern = 0;
        }
    };

    var _Game_CharacterBase_isOriginalPattern = Game_CharacterBase.prototype.isOriginalPattern;
    Game_CharacterBase.prototype.isOriginalPattern = function() {
        if(this._isXpCharacter) return this.pattern() === 0 || this.pattern() === 2;
        _Game_CharacterBase_isOriginalPattern.call(this);
    };

    var _Game_CharacterBase_resetPattern = Game_CharacterBase.prototype.resetPattern;
    Game_CharacterBase.prototype.resetPattern = function() {
        if(this._isXpCharacter) {
            this.setPattern(0);
        } else {
            _Game_CharacterBase_resetPattern.call(this);
        }
    };


    /** Sprite_Character */

    var _Sprite_Character_characterBlockX = Sprite_Character.prototype.characterBlockX;
    Sprite_Character.prototype.characterBlockX = function() {
        if(this._isXpCharacter) {
            if(this._isBigCharacter) {
                return 0;
            } else {
                var index = this._character.characterIndex();
                return index % 4 * 4;
            };
        } else {
            return _Sprite_Character_characterBlockX.call(this);
        }
    };


    /** Window_Base.drawCharacter */

    var _Window_Base_drawCharacter = Window_Base.prototype.drawCharacter;
    Window_Base.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
        var isXpCharacter = ImageManager.isXpCharacter(characterName);
        if(isXpCharacter) {
            var bitmap = ImageManager.loadCharacter(characterName);
            var big = ImageManager.isBigCharacter(characterName);
            var pw = bitmap.width / (big ? 4 : 16);
            var ph = bitmap.height / (big ? 4 : 8);
            var n = characterIndex;
            var sx = (n % 4 * 4) * pw;
            var sy = (Math.floor(n / 4) * 4) * ph;
            this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
        } else {
            _Window_Base_drawCharacter.call(this, characterName, characterIndex, x, y);
        }
    };
};