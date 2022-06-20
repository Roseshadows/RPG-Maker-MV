// ========================================================
//  RSSD_ScenePhone.js
// ========================================================
/*:
 * @plugindesc ver0.5b - 创建一个手机菜单。可以通过点击APP来触发其他菜单、运行公共事件或运行代码。
 * @author 离影玫 || Rose_shadows
 * @help
 * === 介绍 ===
 * 
 * 该插件创建一个手机样式的菜单。玩家点击其中的APP，可以进入界面、触发公共事件、运行自定义代码等。
 * 默认情况下，该插件最多能创建20个APP。
 * 
 * !注意!：
 * 需要 SceneDesktop.js 插件作前置插件。
 * 
 * 
 * 
 * === 文件准备 ===
 * 
 * 如果你只是想使用 *默认的窗口* ，那么什么都不用准备。
 * 
 * 如果你想使用 *自定义的窗口皮肤* ：
 *  - 将窗口皮肤放入img/system/文件夹中，然后在插件参数中设置即可。
 * 
 * 如果你想为手机菜单添加 *背景和遮罩* ：
 * 那么请自备以下两类图像文件各一张，并将其放在img/phones/文件夹中。
 *  - 手机背景
 *  - 手机遮罩
 * 随后在插件参数中配置即可。
 * 
 * 
 * 
 * === 插件指令 ===
 * 
 *   ::手机界面 打开
 *  - 打开手机界面。
 * 
 * 
 * 
 * === 事件脚本 ===
 * 
 *    SceneManager.push(Scene_Phone);
 * - 打开手机界面。
 * 
 * 
 * === 使用条款 ===
 * 
 * 免费用于商业与非商业工程。不强制署名。
 * 
 * @param Menu
 * @text === 菜单设置 ===
 * 
 * @param X坐标
 * @parent Menu
 * @desc 菜单的X坐标。可以使用评估代码。
 * @default 268
 * 
 * @param Y坐标
 * @parent Menu
 * @desc 菜单的Y坐标。可以使用评估代码。
 * @default 63
 * 
 * @param 宽度
 * @parent Menu
 * @desc 菜单的宽度。可以使用评估代码。
 * @default 287
 * 
 * @param 高度
 * @parent Menu
 * @desc 菜单的高度。可以使用评估代码。
 * @default 512
 * 
 * @param 列数
 * @parent Menu
 * @desc 一行有几个APP图标？
 * @default 4
 * 
 * @param 可见行数
 * @parent Menu
 * @desc 一共有几行图标？
 * @default 7
 * 
 * @param 是否显示窗口
 * @parent Menu
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示窗口皮肤？
 * @default false
 * 
 * @param 窗口皮肤
 * @parent Menu
 * @type file
 * @require 1
 * @dir img/system/
 * @desc 所使用的窗口皮肤。图片放在img/system/文件夹下。
 * @default Window
 * 
 * @param 实际绘制图标宽度
 * @parent Menu
 * @type number
 * @min 1
 * @desc 实际绘制的图标的宽度。单位像素。默认是32.
 * @default 32
 * 
 * @param 实际绘制图标高度
 * @parent Menu
 * @type number
 * @min 1
 * @desc 实际绘制的图标的高度。单位像素。默认是32.
 * @default 32
 * 
 * @param 字体大小
 * @parent Menu
 * @type number
 * @desc 字体的大小。单位像素。
 * @default 16
 * 
 * @param 图标字体间隔
 * @parent Menu
 * @type number
 * @desc 图标与字体的间隔。单位像素。
 * @default 2
 * 
 * @param
 * @param Back
 * @text === 背景设置 ===
 * 
 * @param 背景图片
 * @parent Back
 * @type file
 * @require 1
 * @dir img/phones/
 * @desc 设置图片资源。图片放在img/phones/文件夹下。不用的话请设为空。
 * @default 
 * 
 * @param 控制背景显隐的开关
 * @parent Back
 * @type switch
 * @desc 控制该图片显示/隐藏的开关。不用开关的话请设为无。若不设置开关，则一直显示该图片。
 * @default 0
 * 
 * @param 背景X坐标
 * @parent Back
 * @desc 图片的X坐标。可以使用评估代码。
 * @default SceneManager._screenWidth / 2 + 50
 * 
 * @param 背景Y坐标
 * @parent Back
 * @desc 图片的Y坐标。可以使用评估代码。
 * @default SceneManager._screenHeight / 2 + 30
 * 
 * @param 背景不透明度
 * @parent Back
 * @type number
 * @min 0
 * @max 255
 * @desc 图片不透明度。
 * @default 255
 * 
 * @param 背景旋转弧度
 * @parent Back
 * @desc 图片的旋转弧度。兀：Math.PI
 * @default 0
 * 
 * @param 背景横向缩放
 * @parent Back
 * @desc 图片横向的缩放值。若为负数，则左右镜像翻转。默认是1
 * @default 1
 * 
 * @param 背景纵向缩放
 * @parent Back
 * @desc 图片纵向的缩放值。若为负数，则上下镜像翻转。默认是1
 * @default 1
 * 
 * @param 背景混合模式
 * @parent Back
 * @type select
 * @option 正常
 * @value 0
 * @option 叠加
 * @value 1
 * @option 滤色
 * @value 2
 * @option 正片叠底
 * @value 3
 * @desc 图片的混合模式。
 * @default 0
 * 
 * @param
 * @param Mask
 * @text === 遮罩设置 ===
 * 
 * @param 遮罩图片
 * @parent Mask
 * @type file
 * @require 1
 * @dir img/phones/
 * @desc 设置图片资源。图片放在img/phones/文件夹下。不用的话请设为空。
 * @default 
 * 
 * @param 控制遮罩显隐的开关
 * @parent Mask
 * @type switch
 * @desc 控制该图片显示/隐藏的开关。不用开关的话请设为无。若不设置开关，则一直显示该图片。
 * @default 0
 * 
 * @param 遮罩X坐标
 * @parent Mask
 * @desc 图片的X坐标。可以使用评估代码。
 * @default SceneManager._screenWidth / 2 + 50
 * 
 * @param 遮罩Y坐标
 * @parent Mask
 * @desc 图片的Y坐标。可以使用评估代码。
 * @default SceneManager._screenHeight / 2 + 30
 * 
 * @param 遮罩不透明度
 * @parent Mask
 * @type number
 * @min 0
 * @max 255
 * @desc 图片不透明度。可以使用评估代码。
 * @default 255
 * 
 * @param 遮罩旋转弧度
 * @parent Mask
 * @desc 图片的旋转弧度。兀：Math.PI。可以使用评估代码。
 * @default 0
 * 
 * @param 遮罩横向缩放
 * @parent Mask
 * @desc 图片横向的缩放值。若为负数，则左右镜像翻转。可以使用评估代码。默认是1
 * @default 1
 * 
 * @param 遮罩纵向缩放
 * @parent Mask
 * @desc 图片纵向的缩放值。若为负数，则上下镜像翻转。可以使用评估代码。默认是1
 * @default 1
 * 
 * @param 遮罩混合模式
 * @parent Mask
 * @type select
 * @option 正常
 * @value 0
 * @option 叠加
 * @value 1
 * @option 滤色
 * @value 2
 * @option 正片叠底
 * @value 3
 * @desc 图片的混合模式。
 * @default 0
 * 
 * @param
 * @param app
 * @text === APP设置 ===
 * @desc 最多20个APP。
 * 
 * @param APP-1
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-2
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-3
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-4
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-5
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-6
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-7
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-8
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-9
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-10
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-11
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-12
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-13
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-14
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-15
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-16
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-17
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-18
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-19
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 * @param APP-20
 * @parent app
 * @type struct<app>
 * @desc 设置APP的图标及功能。
 * @default {}
 * 
 */

/*~struct~app:
 * 
 * @param APP名
 * @desc APP的名称。
 * @default 应用
 * 
 * @param 图标索引
 * @desc APP图标的图标索引。
 * @default 0
 * 
 * @param 打开开关
 * @type switch
 * @desc 点击APP时打开的开关。若不打开，则设为0.
 * @default 0
 * 
 * @param 绑定功能类型
 * @type select
 * @option 进入界面
 * @value 0
 * @option 触发公共事件
 * @value 1
 * @option 运行自定义代码
 * @value 2
 * @desc 点击APP时实现的功能。
 * @default 0
 * 
 * @param scene
 * @text == 界面 ==
 * @default ========================
 * 
 * @param 绑定界面
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
 * @desc 若绑定功能类型为进入界面，则会进入此处设置的界面。不仅可绑定默认的界面，还可绑定其他插件提供的界面。
 * @default Scene_Menu
 * 
 * @param commonEvent
 * @text == 公共事件 ==
 * @default ========================
 * 
 * @param 公共事件触发模式
 * @parent commonEvent
 * @type select
 * @option 立即退出手机并执行公共事件
 * @value 0
 * @option 等待玩家自行退出手机后再触发公共事件
 * @value 1
 * @desc 若绑定功能类型为触发公共事件，选择点击APP后触发公共事件的模式。
 * @default 0
 * 
 * @param 绑定公共事件
 * @parent commonEvent
 * @type common_event
 * @desc 若绑定功能类型为触发公共事件，则会触发此处设置的公共事件。
 * @default 1
 * 
 * @param js
 * @text == 自定义代码 ==
 * @default ========================
 * 
 * @param 自定义代码
 * @parent js
 * @type combo
 * @option SceneManager.goto(Scene_Title); //返回标题界面
 * @option SceneManager.goto(Scenn_Gameover); //游戏结束
 * @option SceneManager.goto(Scene_Map);//回到地图
 * @option SceneManager.pop() //退出当前界面
 * @option SceneManager.exit() //关掉游戏
 * @desc 若绑定功能类型为运行自定义代码，则会运行此处设置的代码。可以设置不止一条代码。
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
        alert('RSSD_ScenePhone.js 需要 SceneDesktop.js 插件。看看是不是忘记安装或者插件顺序不对！')
    };
})(RSSD.ScenePhone);
