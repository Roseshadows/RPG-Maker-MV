// ========================================================
//  RSSD_ScenePhone.js
// ========================================================
/*:
 * @plugindesc ver0.5b - Creates a phone-like scene. The player can get access to menus, trigger common events or run custom codes by clicking APPs.
 * @author 离影玫 || Rose_shadows
 * @help
 * === Introduction ===
 * 
 * This plugin creates a phone-like scene. 
 * Up to 20 APPs can be added to the phone in default.
 * 
 * ! Notes! 
 * This plugin needs SceneDesktop.js. Please install SceneDesktop.js above this 
 * plugin.
 * 
 * 
 * 
 * === File Requirements ===
 * 
 * If you just want to use *Default Windowskin* ，then you have nothing to 
 * prepare.
 * 
 * If you want to use *Custom Windowskin* ：
 *  - Please place the windowskin image into the folder img/system/ ,
 *    then config the corresponding plugin parameters.
 * 
 * If you want to show *some Picture Beneath or Above the Scene* :
 *  - Please create a folder named 'phones' in the folder img/ ,
 *    and place the Background and Mask image files into the folder you just 
 *    created.
 *    Background image will be shown beneath the scene, while Mask image will be 
 *    shown above.
 *    Then, go to plugin parameter list to config the corresponding parameters.
 * 
 * 
 * 
 * === Plugin Command ===
 * 
 *   ::ScenePhone open
 *  - Open the phone scene.
 * 
 * 
 * 
 * === Script Calls ===
 * 
 *    SceneManager.push(Scene_Phone);
 *  - Open the phone scene.
 * 
 * 
 * === Terms of Use ===
 * 
 * Free for both commercial and non-commercial use. 
 * Modification and redistribution is allowed. 
 * Credit to 离影玫 or Rose_shadows is appreciated, but not required.
 * 
 * 
 * 
 * === Version Log ===
 * ver 0.5b - Finish the plugin.
 * 
 * @param Menu
 * @text === Menu Settings ===
 * 
 * @param X坐标
 * @text X Position
 * @parent Menu
 * @desc X position of the menu. Can be an eval.
 * @default 268
 * 
 * @param Y坐标
 * @text Y Position
 * @parent Menu
 * @desc Y position of the menu. Can be an eval.
 * @default 63
 * 
 * @param 宽度
 * @text Width
 * @parent Menu
 * @desc Width of the menu. Can be an eval.
 * @default 287
 * 
 * @param 高度
 * @text Height
 * @parent Menu
 * @desc Height of the menu. Can be an eval.
 * @default 512
 * 
 * @param 列数
 * @text Columns
 * @parent Menu
 * @desc How many columns of APPs does the menu have?
 * @default 4
 * 
 * @param 可见行数
 * @text Rows
 * @parent Menu
 * @desc How many rows of APPs, which can be seen by the player, does the menu have?
 * @default 7
 * 
 * @param 是否显示窗口
 * @text Show Windowskin
 * @parent Menu
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Hide or show the Windowskin？
 * Hide: false  Show: true
 * @default false
 * 
 * @param 窗口皮肤
 * @text Custom Windowskin
 * @parent Menu
 * @type file
 * @require 1
 * @dir img/system/
 * @desc The custom windowskin image. Place the image file into img/system/ .
 * @default Window
 * 
 * @param 实际绘制图标宽度
 * @text Icon Actual Width
 * @parent Menu
 * @type number
 * @min 1
 * @desc The width of the icons drew on the menu. Default: 32 px.
 * @default 32
 * 
 * @param 实际绘制图标高度
 * @text Icon Actual Height
 * @parent Menu
 * @type number
 * @min 1
 * @desc The height of the icons drew on the menu. Default: 32 px.
 * @default 32
 * 
 * @param 字体大小
 * @text Font Size
 * @parent Menu
 * @type number
 * @desc Font size in pixels.
 * @default 16
 * 
 * @param 图标字体间隔
 * @text Icon Text Distance
 * @parent Menu
 * @type number
 * @desc Distance between the icon and the text, in pixels.
 * @default 2
 * 
 * @param
 * @param Back
 * @text === Background Settings ===
 * 
 * @param 背景图片
 * @text Background Image
 * @parent Back
 * @type file
 * @require 1
 * @dir img/phones/
 * @desc Sets the background image to use. Place the image into img/phones/ . Leave it blank if not use.
 * @default 
 * 
 * @param 控制背景显隐的开关
 * @text Background Switch
 * @parent Back
 * @type switch
 * @desc The switch determines whether to show the background. Set to 0 if not use. If set to 0, the background will always show.
 * @default 0
 * 
 * @param 背景X坐标
 * @text Background X Position
 * @parent Back
 * @desc X Position of the image. Can be an eval.
 * @default SceneManager._screenWidth / 2 + 50
 * 
 * @param 背景Y坐标
 * @text Background X Position
 * @parent Back
 * @desc Y Position of the image. Can be an eval.
 * @default SceneManager._screenHeight / 2 + 30
 * 
 * @param 背景不透明度
 * @text Background Opacity
 * @parent Back
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of the background. Can be an eval.
 * @default 255
 * 
 * @param 背景旋转弧度
 * @text Background Rotation
 * @parent Back
 * @desc Rotation(rad) of the background. Can be an eval. PI is Math.PI in JavaScript. 360 (degree) equels to 2*Math.PI (rad)
 * @default 0
 * 
 * @param 背景横向缩放
 * @text Background Scale X
 * @parent Back
 * @desc X Scale of the background. Can be an eval. If is nagative, then the image will be flipped left to right.
 * @default 1
 * 
 * @param 背景纵向缩放
 * @text Background Scale Y
 * @parent Back
 * @desc Y Scale of the background. Can be an eval. If is nagative, then the image will be flipped upside down.
 * @default 1
 * 
 * @param 背景混合模式
 * @text Background Blend Mode
 * @parent Back
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1
 * @option Color Filter
 * @value 2
 * @option Multiply
 * @value 3
 * @desc Blend Mode of the background.
 * @default 0
 * 
 * @param
 * @param Mask
 * @text === Mask Settings ===
 * 
 * @param 遮罩图片
 * @text Mask Image
 * @parent Mask
 * @type file
 * @require 1
 * @dir img/phones/
 * @desc Sets the mask image to use. Place the image into img/phones/ . Leave it blank if not use.
 * @default 
 * 
 * @param 控制遮罩显隐的开关
 * @text Mask Switch
 * @parent Mask
 * @type switch
 * @desc The switch determines whether to show the mask. Set to 0 if not use. If set to 0, the background will always show.
 * @default 0
 * 
 * @param 遮罩X坐标
 * @text Mask X Position
 * @parent Mask
 * @desc X Position of the image. Can be an eval.
 * @default SceneManager._screenWidth / 2 + 50
 * 
 * @param 遮罩Y坐标
 * @text Mask Y Position
 * @parent Mask
 * @desc Y Position of the image. Can be an eval.
 * @default SceneManager._screenHeight / 2 + 30
 * 
 * @param 遮罩不透明度
 * @text Mask Opacity
 * @parent Mask
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of the mask. Can be an eval.
 * @default 255
 * 
 * @param 遮罩旋转弧度
 * @text Mask Rotation
 * @parent Mask
 * @desc Rotation(rad) of the background. Can be an eval. PI is Math.PI in JavaScript. 360 (degree) equels to 2*Math.PI (rad)
 * @default 0
 * 
 * @param 遮罩横向缩放
 * @text Mask Scale X
 * @parent Mask
 * @desc X Scale of the background. Can be an eval. If is nagative, then the image will be flipped left to right.
 * @default 1
 * 
 * @param 遮罩纵向缩放
 * @text Mask Scale Y
 * @parent Mask
 * @desc Y Scale of the background. Can be an eval. If is nagative, then the image will be flipped upside down.
 * @default 1
 * 
 * @param 遮罩混合模式
 * @text Mask Blend Mode
 * @parent Mask
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1
 * @option Color Filter
 * @value 2
 * @option Multiply
 * @value 3
 * @desc Blend Mode of the mask.
 * @default 0
 * 
 * @param
 * @param app
 * @text === APP Settings ===
 * @desc Up to 20 APPs can be registered.
 * 
 * @param APP-1
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-2
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-3
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-4
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-5
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-6
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-7
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.。
 * @default {}
 * 
 * @param APP-8
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-9
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-10
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-11
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-12
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-13
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-14
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-15
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-16
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-17
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-18
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-19
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 * @param APP-20
 * @parent app
 * @type struct<app>
 * @desc Sets the APP's icon and function.
 * @default {}
 * 
 */

/*~struct~app:
 * 
 * @param APP名
 * @text APP Name
 * @desc The Name of APP.
 * @default APP
 * 
 * @param 图标索引
 * @text Icon Index
 * @desc Icon index of the APP.
 * @default 0
 * 
 * @param 打开开关
 * @text Switch to be Opened
 * @type switch
 * @desc Switch to be turned ON when clicks the APP. Set to 0 if not handle.
 * @default 0
 * 
 * @param 绑定功能类型
 * @text Function Type
 * @type select
 * @option Entering Scene
 * @value 0
 * @option Trigger Common Event
 * @value 1
 * @option Run Custom Codes
 * @value 2
 * @desc The type of the function to implement when clicking the APP.
 * @default 0
 * 
 * @param scene
 * @text == Entering Scene ==
 * @default ========================
 * 
 * @param 绑定界面
 * @text Scene
 * @type combo
 * @parent scene
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Equip
 * @option Scene_Skill
 * @option Scene_Status
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_Options
 * @option Scene_GameEnd
 * @desc If Fuction Type is Entering Scene, then will enter the scen which is set here. You can also add scenes provided by other plugins.
 * @default Scene_Menu
 * 
 * @param commonEvent
 * @text == Trigger Common Event ==
 * @default ========================
 * 
 * @param 公共事件触发模式
 * @text Trigger Mode
 * @parent commonEvent
 * @type select
 * @option Leave the phone instantly
 * @value 0
 * @option Wait for player leaving
 * @value 1
 * @desc If Function Type is Trigger Common Event, sets the Trigger Mode.
 * @default 0
 * 
 * @param 绑定公共事件
 * @text Bound Common Event
 * @parent commonEvent
 * @type common_event
 * @desc If Function Type is Trigger Common Event, then trigger the common event which is set here.
 * @default 1
 * 
 * @param js
 * @text == Run Custom Codes ==
 * @default ========================
 * 
 * @param 自定义代码
 * @text Custom Codes
 * @parent js
 * @type combo
 * @option SceneManager.goto(Scene_Title); //Return to Title Scene
 * @option SceneManager.goto(Scenn_Gameover); //Gameover
 * @option SceneManager.goto(Scene_Map);//Return to Map
 * @option SceneManager.pop() //Leave the current Scene
 * @option SceneManager.exit() //Shut down the game
 * @desc If Function Type is Run Custom Codes, run the codes set here. 
 * @default ""
 * 
 */

var Imported = Imported || {};
Imported.RSSD_ScenePhone = true;

var RSSD = RSSD || {};
RSSD.ScenePhone = {};

(function($){

    /**前置插件：Scene_Desktop */

    if(Imported.SceneDesktop) {

        /**获取插件参数 */

        /**获取基础参数 */

        $.parameters     = PluginManager.parameters('RSSD_ScenePhone');
        $.windowX        = isNaN(Number($.parameters['X坐标'])) ? String($.parameters['X坐标']) : Number($.parameters['X坐标']) || 0;
        $.windowY        = isNaN(Number($.parameters['Y坐标'])) ? String($.parameters['Y坐标']) : Number($.parameters['Y坐标']) || 0;
        $.windowWidth    = isNaN(Number($.parameters['宽度'])) ? String($.parameters['宽度']) : Number($.parameters['宽度']) || 287;
        $.windowHeight   = isNaN(Number($.parameters['高度'])) ? String($.parameters['高度']) : Number($.parameters['高度']) || 512;
        $.windowskin     = String($.parameters['窗口皮肤']) || 'Window';
        $.showWindowskin = String($.parameters['是否显示窗口']) == 'true' || false;
        $.realIconWidth  = Number($.parameters['实际绘制图标宽度']) || 32;
        $.realIconHeight = Number($.parameters['实际绘制图标高度']) || 32;
        $.maxCols        = Number($.parameters['列数']) || 4;
        $.numVisibleRows = Number($.parameters['可见行数']) || 7;
        $.fontSize       = Number($.parameters['字体大小']) || 16;
        $.iconTextDis    = Number($.parameters['图标字体间隔']) || 2;

        /**获取背景参数 */

        $.back = {};
        $.back.bitmap    = $.parameters['背景图片'];
        $.back.opacity   = $.parameters['背景不透明度'] || 255;
        $.back.rotation  = $.parameters['背景旋转弧度'] || 0;
        $.back.blendMode = $.parameters['背景混合模式'] || 0;
        $.back.scaleX    = parseFloat($.parameters['背景横向缩放']) || 1;
        $.back.scaleY    = parseFloat($.parameters['背景纵向缩放']) || 1;
        $.back.swi       = Number($.parameters['控制背景显隐的开关']) || 0;
        $.back.x         = isNaN(Number($.parameters['背景X坐标'])) ? String($.parameters['背景X坐标']) : Number($.parameters['背景X坐标']);
        $.back.y         = isNaN(Number($.parameters['背景Y坐标'])) ? String($.parameters['背景Y坐标']) : Number($.parameters['背景Y坐标']);
/*
        $.getBackParam = function(index){
            $.back[index] = {};
            $.back[index].bitmap    = JSON.parse($.backArray[index])['图片'];
            $.back[index].opacity   = JSON.parse($.backArray[index])['不透明度'] || 255;
            $.back[index].rotation  = JSON.parse($.backArray[index])['旋转弧度'] || 0;
            $.back[index].blendMode = JSON.parse($.backArray[index])['混合模式'] || 0;
            $.back[index].scaleX    = parseFloat(JSON.parse($.backArray[index])['横向缩放']) || 1;
            $.back[index].scaleY    = parseFloat(JSON.parse($.backArray[index])['纵向缩放']) || 1;
            $.back[index].swi       = Number(JSON.parse($.backArray[index])['控制显隐的开关']) || 0;
            $.back[index].x         = isNaN(JSON.parse($.backArray[index])['X坐标']) ? String(JSON.parse($.backArray[index])['X坐标']) : Number(JSON.parse($.backArray[index])['X坐标']) || 0;
            $.back[index].y         = isNaN(JSON.parse($.backArray[index])['Y坐标']) ? String(JSON.parse($.backArray[index])['Y坐标']) : Number(JSON.parse($.backArray[index])['Y坐标']) || 0;
        } */

        /**获取遮罩参数 */

        $.mask = {};
        $.mask.bitmap    = $.parameters['遮罩图片'];
        $.mask.opacity   = $.parameters['遮罩不透明度'] || 255;
        $.mask.rotation  = $.parameters['遮罩旋转弧度'] || 0;
        $.mask.blendMode = $.parameters['遮罩混合模式'] || 0;
        $.mask.scaleX    = parseFloat($.parameters['遮罩横向缩放']) || 1;
        $.mask.scaleY    = parseFloat($.parameters['遮罩纵向缩放']) || 1;
        $.mask.swi       = Number($.parameters['控制遮罩显隐的开关']) || 0;
        $.mask.x         = isNaN($.parameters['遮罩X坐标']) ? String($.parameters['遮罩X坐标']) : Number($.parameters['遮罩X坐标']) || 0;
        $.mask.y         = isNaN($.parameters['遮罩Y坐标']) ? String($.parameters['遮罩Y坐标']) : Number($.parameters['遮罩Y坐标']) || 0;
/*
        $.getMaskParam = function(index) {
        $.mask[index] = {};
        $.mask[index].bitmap    = JSON.parse($.maskArray[index])['图片'];
        $.mask[index].opacity   = JSON.parse($.maskArray[index])['不透明度'] || 255;
        $.mask[index].rotation  = JSON.parse($.maskArray[index])['旋转弧度'] || 0;
        $.mask[index].blendMode = JSON.parse($.maskArray[index])['混合模式'] || 0;
        $.mask[index].scaleX    = parseFloat(JSON.parse($.maskArray[index])['横向缩放']) || 1;
        $.mask[index].scaleY    = parseFloat(JSON.parse($.maskArray[index])['纵向缩放']) || 1;
        $.mask[index].swi       = Number(JSON.parse($.maskArray[index])['控制显隐的开关']) || 0;
        $.mask[index].x         = isNaN(JSON.parse($.maskArray[index])['X坐标']) ? String(JSON.parse($.maskArray[index])['X坐标']) : Number(JSON.parse($.maskArray[index])['X坐标']) || 0;
        $.mask[index].y         = isNaN(JSON.parse($.maskArray[index])['Y坐标']) ? String(JSON.parse($.maskArray[index])['Y坐标']) : Number(JSON.parse($.maskArray[index])['Y坐标']) || 0;
        } */

        /**获取APP参数 */

        $.app = [];
        $.appAmount = 20;

        $.getAppParam = function(index) {
            var indexM = index + 1;
            $._currentApp = JSON.parse($.parameters['APP-'+indexM]);
            if (!JSON.parse($.parameters['APP-'+indexM]) || JSON.stringify($._currentApp) == '{}') return;
            $.app[index] = {};
            $.app[index].name           = String($._currentApp['APP名']) || "";
            $.app[index].iconIndex      = Number($._currentApp['图标索引']) || 0;
            $.app[index].swi            = Number($._currentApp['打开开关']) || 0;
            $.app[index].bindType       = $._currentApp['绑定功能类型'] !== undefined ? Number($._currentApp['绑定功能类型']) : 2;
            $.app[index].menuKey        = String($._currentApp['绑定界面']) || "Scene_Menu";
            $.app[index].callCommonMode = $._currentApp['公共事件触发模式'] !== undefined ? Number($._currentApp['公共事件触发模式']) :                                                   0;
            $.app[index].commonEvent    = Number($._currentApp['绑定公共事件']) || 0;
            $.app[index].code           = String($._currentApp['自定义代码']) || "";
            
        };

        for(var i = 0; i < $.appAmount; i++) {
            $.getAppParam(i);
        };

        /**集合可用指令 */
        $.validApp = [];
        $.validAppOriginalIndex = [];  // 追踪可用指令在插件参数中的序列。$.validApp[index] 在插件参数的序列就是 $.validAppOriginalIndex[index] 。
        for (var i = 0; i < $.appAmount; i++) {
            if($.app[i]) {
                var lastIndex = $.validApp.length || 0;
                $.validApp[lastIndex] = {};
                $.validApp[lastIndex] = $.app[i];
                $.validAppOriginalIndex.push(i);
            } else {
                continue;
            }
        }

        /**将可用图标集合到同一个数组中。 */

        $.refreshAppIcons = function(){
            $.validAppIcons = [];
            for (var i = 0; i < $.validAppOriginalIndex.length; i++) {
                var index = $.validAppOriginalIndex[i];
                $.validAppIcons[i] = $.app[index].iconIndex;
            };
        };

        /**设置插件指令 */

        var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            _Game_Interpreter_pluginCommand.call(this, command, args);
            if(command === '::手机界面' || command == '::ScenePhone') {
                switch(args[0]) {
                    case '打开':
                    case 'open':
                        SceneManager.push(Scene_Phone);
                        break;
                }
            }
        };

        /**创建窗口：Window_RSSDPhone(x, y) */

        function Window_RSSDPhone() {
            this.initialize.apply(this, arguments);
        }

        Window_RSSDPhone.prototype = Object.create(Window_Desktop.prototype);
        Window_RSSDPhone.prototype.constructor = Window_RSSDPhone;

        Window_RSSDPhone.prototype.initialize = function(x, y) {
            $.refreshAppIcons();
            this._iconList = $.validAppIcons;
            if (!$.showWindowskin) {
                this._standardBackOpacity = 0;
                this._frameOpacity = 0;
            } else {
                this._standardBackOpacity = 192;
                this._frameOpacity = 255;
            }
            Window_Desktop.prototype.initialize.call(this, x, y);
        }
        Window_RSSDPhone.prototype.windowWidth = function() {
            return $.windowWidth;
        }

        Window_RSSDPhone.prototype.windowHeight = function() {
            return $.windowHeight;
        }

        Window_RSSDPhone.prototype.loadWindowskin = function() {
            this.windowskin = ImageManager.loadSystem($.windowskin)
        }

        Window_RSSDPhone.prototype.numVisibleRows = function() {
            return $.numVisibleRows;
        }

        Window_RSSDPhone.prototype.maxCols = function() {
            return $.maxCols;
        }

        Window_RSSDPhone.prototype.lineHeight = function() {
            return this.iconDrawingHeight() + this.standardFontSize() + this.iconTextDistance() + 18;
        }

        Window_RSSDPhone.prototype.standardFontSize = function() {
            return $.fontSize;
        }

        Window_RSSDPhone.prototype.iconDrawingWidth = function() {
            return $.realIconWidth;
        }

        Window_RSSDPhone.prototype.iconDrawingHeight = function() {
            return $.realIconHeight;
        }

        Window_RSSDPhone.prototype.iconTextDistance = function() {
            return $.iconTextDis;
        }

        Window_RSSDPhone.prototype.makeCommandList = function() {
            for(var i = 0; i < $.validApp.length; i++) {
                this.makeEachCommand(i);
                
            }
        }

        Window_RSSDPhone.prototype.makeEachCommand = function(index) {
            var ori = $.validAppOriginalIndex[index];
            this.addCommand($.validApp[index].name, 'phoneApp'+ori, true);
        }


        /**创建界面：Scene_Phone() */


        function Scene_Phone() {
            this.initialize.apply(this, arguments);
        }
        
        Scene_Phone.prototype = Object.create(Scene_Desktop.prototype);
        Scene_Phone.prototype.constructor = Scene_Phone;
        
        Scene_Phone.prototype.initialize = function() {
            Scene_Desktop.prototype.initialize.call(this);
        }
        
        Scene_Phone.prototype.create = function() {
            Scene_Desktop.prototype.create.call(this);
            this.createPhoneWindow();
        }
        
        Scene_Phone.prototype.createPhoneWindow = function() {
            this._phoneWindow = new Window_RSSDPhone($.windowX, $.windowY);
            for (var i = 0; i < $.validApp.length; i++) {
                this.setEachAppHandler(i);
            };
            this._phoneWindow.setHandler('cancel',this.popScene.bind(this));
            this.addWindow(this._phoneWindow);
        };

        Scene_Phone.prototype.setEachAppHandler = function(index) {
            var ori = $.validAppOriginalIndex[index];
            this._phoneWindow.setHandler('phoneApp'+ori, eval('this.app'+ori).bind(this));
        };

        Scene_Phone.prototype.generateApp = function(index) {
            var id = index;
            if(!$.app[id]) return;
            switch($.app[id].bindType) {
                case 0: // 菜单
                    SceneManager.push(eval($.app[id].menuKey));
                    break;
                case 1: // 公共事件
                    if($.app[id].commonEvent){
                        if($.app[id].callCommonMode) {
                            // 等待玩家自行退出
                            this._phoneWindow.activate();
                            $gameSystem.reserveCommonEvent($.app[id].commonEvent);
                        } else {
                            // 立即退出并执行
                            SceneManager.goto(Scene_Map);
                            $gameSystem.reserveCommonEvent($.app[id].commonEvent);
                        }
                    }
                    break;
                case 2: // 自定义代码
                    eval($.app[id].code);
                    break;
            };
            // 打开开关
            if($.app[id].swi) {
                $gameSwitches.setValue($.app[id].swi, true);
            };
        }
        
        // 指令相关的方法:
        
        Scene_Phone.prototype.app0 = function() {
            this.generateApp(0);
        };

        Scene_Phone.prototype.app1 = function() {
            this.generateApp(1);
        };
        
        Scene_Phone.prototype.app2 = function() {
            this.generateApp(2);
        };
        
        Scene_Phone.prototype.app3 = function() {
            this.generateApp(3);
        };
        
        Scene_Phone.prototype.app4 = function() {
            this.generateApp(4);
        };
        
        Scene_Phone.prototype.app5 = function() {
            this.generateApp(5);
        };
        
        Scene_Phone.prototype.app6 = function() {
            this.generateApp(6);
        };
        
        Scene_Phone.prototype.app7 = function() {
            this.generateApp(7);
        };
        
        Scene_Phone.prototype.app8 = function() {
            this.generateApp(8);
        };
        
        Scene_Phone.prototype.app9 = function() {
            this.generateApp(9);
        };
        
        Scene_Phone.prototype.app10 = function() {
            this.generateApp(10);
        };
        
        Scene_Phone.prototype.app11 = function() {
            this.generateApp(11);
        };
        
        Scene_Phone.prototype.app12 = function() {
            this.generateApp(12);
        };
        
        Scene_Phone.prototype.app13 = function() {
            this.generateApp(13);
        };
        
        Scene_Phone.prototype.app14 = function() {
            this.generateApp(14);
        };
        
        Scene_Phone.prototype.app15 = function() {
            this.generateApp(15);
        };
        
        Scene_Phone.prototype.app16 = function() {
            this.generateApp(16);
        };
        
        Scene_Phone.prototype.app17 = function() {
            this.generateApp(17);
        };
        
        Scene_Phone.prototype.app18 = function() {
            this.generateApp(18);
        };
        
        Scene_Phone.prototype.app19 = function() {
            this.generateApp(19);
        };


        /**创建背景 */

        
        Scene_Phone.prototype.createBackground = function() {
            Scene_Desktop.prototype.createBackground.call(this);
            if($.back.bitmap){
                var visible = $.back.swi ? $gameSwitches.value($.back.swi) : true;
                this.addExtendedSprite('img/phones/',$.back.bitmap, eval(''+$.back.x), eval(''+$.back.y), eval(''+$.back.opacity), visible, eval(''+$.back.rotation), $.back.blendMode, eval(''+$.back.scaleX), eval(''+$.back.scaleY))
            };
        };
/*
        Scene_Phone.prototype.drawEachPhoneBack = function(index) {
            if(index === 0 && $.back[index].bitmap) return; // 没有背景则跳过

            if($.back.bitmap){
                this._phoneBackList[index] = new Sprite();
                this._phoneBackList[index].bitmap   = ImageManager.loadBitmap('img/phones/',$.back[index].bitmap,0,true);
                this._phoneBackList[index].x        = $.back[index].x;
                this._phoneBackList[index].y        = $.back[index].y;
                this._phoneBackList[index].opacity  = $.back[index].opacity;
                this._phoneBackList[index].rotation = $.back[index].rotation;
                this._phoneBackList[index].scale.x  = $.back[index].scaleX;
                this._phoneBackList[index].scale.y  = $.back[index].scaleY;
                this._phoneBackList[index].anchor.x = 0.5;
                this._phoneBackList[index].anchor.y = 0.5;
                this._phoneBackList[index].visible  = $.back[index].swi ? $gameSwitches.value($.back[index].swi) : true;

                this._phoneBack.addChild(this._phoneBackList[index]);
            }
        } */


        /**创建遮罩 */


        var _SceneManager_initialize = SceneManager.initialize;
        SceneManager.initialize = function() {
            _SceneManager_initialize.call(this);
            this.initPhoneMask();
        }

        SceneManager.initPhoneMask = function() {
            this._phoneMask = new Sprite();
            if($.mask.bitmap){
                this._phoneMask.bitmap   = ImageManager.loadBitmap('img/phones/',$.mask.bitmap,0,true);
                this._phoneMask.x        = eval(''+$.mask.x);
                this._phoneMask.y        = eval(''+$.mask.y);
                this._phoneMask.opacity  = eval(''+$.mask.opacity);
                this._phoneMask.rotation = eval(''+$.mask.rotation);
                this._phoneMask.scale.x  = eval(''+$.mask.scaleX);
                this._phoneMask.scale.y  = eval(''+$.mask.scaleY);
                this._phoneMask.anchor.x = 0.5;
                this._phoneMask.anchor.y = 0.5;
                this._phoneMask.visible  = $.mask.swi ? $gameSwitches.value($.mask.swi) : true;
            }
        }
/*
        SceneManager.prototype.drawEachPhoneMask = function(index) {
            if(index === 0 && !$.mask[index].bitmap) return; // 没有遮罩则跳过

            if($.mask[index].bitmap){    
                this._phoneMaskList[index]          = new Sprite();
                this._phoneMaskList[index].bitmap   = ImageManager.loadBitmap('img/phones/',$.mask[index].bitmap,0,true);
                this._phoneMaskList[index].x        = $.mask[index].x;
                this._phoneMaskList[index].y        = $.mask[index].y;
                this._phoneMaskList[index].opacity  = $.mask[index].opacity;
                this._phoneMaskList[index].rotation = $.mask[index].rotation;
                this._phoneMaskList[index].scale.x  = $.mask[index].scaleX;
                this._phoneMaskList[index].scale.y  = $.mask[index].scaleY;
                this._phoneMaskList[index].anchor.x = 0.5;
                this._phoneMaskList[index].anchor.y = 0.5;
                this._phoneMaskList[index].visible  = $.mask[index].swi ? $gameSwitches.value($.mask[index].swi) : true;
            }
        } */

        var _SceneManager_onSceneStart = SceneManager.onSceneStart;
        SceneManager.onSceneStart = function() {
            _SceneManager_onSceneStart.call(this);
            this.refreshPhoneMaskZ();
        };

        SceneManager.refreshPhoneMaskZ = function() {
            if (this._scene instanceof Scene_Phone) {
                this._scene.addChild(this._phoneMask);
            }
        }
/*
        SceneManager.prototype.drawEachPhoneMask = function(index) {
            if(this._phoneMaskList[index]){
                this._scene.addChild(this._phoneMaskList[index]);
            }
        } */

        var _SceneManager_snapForBackground = SceneManager.snapForBackground;
        SceneManager.snapForBackground = function() {
            this._phoneMask.visible = false;
            _SceneManager_snapForBackground.call(this);
            this._phoneMask.visible = true;
        };

        var _Scene_Base_createFadeSprite = Scene_Base.prototype.createFadeSprite;
        Scene_Base.prototype.createFadeSprite = function(white) {
            _Scene_Base_createFadeSprite.call(this, white);
            SceneManager.refreshPhoneMaskZ();
        };

        // var _Scene_Base_createFadeSprite = Scene_Base.prototype.createFadeSprite;
        // Scene_Base.prototype.createFadeSprite = function(white) {
        //   _Scene_Base_createFadeSprite.call(this, white);
        //   SceneManager.refreshPhoneMaskZ();
        // };

    } else {
        alert('RSSD_ScenePhone.js needs plugin SceneDesktop.js . Maybe you forget to install the latter plugin or put it in wrong position!');
        console.log('RSSD_ScenePhone.js needs plugin SceneDesktop.js . Maybe you forget to install the latter plugin or put it in wrong position!');
    };
})(RSSD.ScenePhone);
