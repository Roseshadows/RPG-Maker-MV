// ========================================================
//  RSSD_ScenePhone.js
// ========================================================
/*:
 * @plugindesc ver2.00 - 创建一个手机菜单。可以通过点击APP来触发其他菜单、运行公共事件或运行代码。
 * @author 离影玫 || Rose_shadows
 * @help
 * === 介绍 ===
 * 
 * 该插件创建一个手机样式的菜单。玩家点击其中的APP，可以进入界面、触发公共事件、运行自定义代码等。
 * 
 * !注意!：
 * 需要 SceneDesktop.js 插件作前置插件。
 * 
 * 
 * === 文件准备 ===
 * 
 * 如果你只是想使用 *默认的窗口* ，那么什么都不用准备。
 * 
 * 如果你想使用 *自定义的窗口皮肤* ：
 *  - 将窗口皮肤放入img/system/文件夹中，然后在插件参数中设置即可。
 * 
 * 如果你想为手机菜单添加 *背景* ：
 * 那么请自备一张手机背景图像文件，并将其放在img/phones/文件夹中。
 * 随后在插件参数中配置即可。
 * 
 * 
 * === 小贴士 ===
 * 
 * 这个插件允许你多次使用，以创造多个手机界面。
 * 用记事本打开插件文件，找到“用户自定义区”，然后跟着注释修改所有参数吧。
 * 注意，这些参数值不能与其他同类型的插件参数值相同。参数值必须是独一无二的。
 * 参数：
 *   $.pluginName = 'RSSD_ScenePhone'; // 当前插件的名称。
 *   $.windowName = 'Window_RSSDPhone'; // 手机窗口标识符
 *   $.sceneName = 'Scene_RSSDPhone'; // 手机界面标识符
 * 
 * 
 * === 插件指令 ===
 * 
 *   ::手机界面 {插件名} 打开
 *   ::ScenePhone {pluginName} open
 *  - 打开手机界面。
 *    {插件名}/{pluginName}是当前插件的名字。
 *  e.g. 若 $.pluginName = 'RSSD_ScenePhone';
 *       则 ::手机界面 RSSD_ScenePhone 打开
 *       或 ::ScenePhone RSSD_ScenePhone open
 * 
 * 
 * === 事件脚本 ===
 * 
 *    SceneManager.push(手机界面标识符);
 * - 打开手机界面。手机界面标识符就是在该插件中设置的$.sceneName的值。
 *  e.g. 若 $.sceneName = 'Scene_RSSDPhone';
 *       则 SceneManager.push(Scene_RSSDPhone);
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
 *  === 更新日志 ===
 * 
 * ver1.00 - 完成。
 * ver2.00 - 现在可以创造多个手机界面了。
 *           详情去看帮助文档的【小贴士】部分。
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
 * @param app
 * @text === APP设置 ===
 * @desc 最多20个APP。
 * 
 * @param APP列表
 * @type struct<app>[]
 * @desc APP列表。这些APP将按列表中的顺序依次排列。
 * @default []
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
 * @desc 点击APP时打开的开关ID。若不打开，则设为0.
 * @default 0
 * 
 * @param 控制显隐的开关
 * @type switch
 * @desc 控制该APP显示/隐藏的开关ID。当开关打开时，该APP将会隐藏。若设为0，则永远都会显示。
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
 * @option SceneManager.goto(Scene_Map); //回到地图
 * @option SceneManager.pop(); //退出当前界面
 * @option SceneManager.exit(); //关掉游戏
 * @desc 若绑定功能类型为运行自定义代码，则会运行此处设置的代码。可以设置不止一条代码。
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.RSSD_ScenePhone = true;

var RSSD = RSSD || {};
RSSD.ScenePhone = {};

var obj = {};

(function($){

    /**前置插件：Scene_Desktop */

    if(Imported.SceneDesktop) {

        //=============================================================================
        // ↓↓↓ 用户自定义区 ↓↓↓
        //=============================================================================
        // 每个参数值相较其他同类型插件都必须是独一无二的，

        $.pluginName = 'RSSD_ScenePhone'; // 插件的名称。
        $.windowName = 'Window_RSSDPhone'; // 手机窗口标识符。
        $.sceneName = 'Scene_RSSDPhone'; // 手机界面标识符。

        //=============================================================================
        // ↑↑↑ 用户自定义区 ↑↑↑
        //=============================================================================

        /**获取插件参数 */

        /**获取基础参数 */

        $.parameters     = PluginManager.parameters($.pluginName);
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

        /**获取遮罩参数 */
        /*
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
        */

        /**获取APP参数 */

        var params_apps = [];
        params_apps = JSON.parse($.parameters['APP列表']);

        params_apps = params_apps.map(function(app){
            return JSON.parse(app);
        });

        $.app = [];
        $.appAmount = params_apps.length;
        
        $.getAppParam = function(index) {
            $._currentApp = params_apps[index];
            if (!$._currentApp || JSON.stringify($._currentApp) == '{}') return;
            $.app[index] = {};
            $.app[index].name           = ''+$._currentApp['APP名'] || "";
            $.app[index].iconIndex      = +$._currentApp['图标索引'] || 0;
            $.app[index].swi            = +$._currentApp['打开开关'] || 0;
            $.app[index].visibleSwi     = +$._currentApp['控制显隐的开关'] || 0;
            $.app[index].bindType       = $._currentApp['绑定功能类型'] !== undefined ? +$._currentApp['绑定功能类型'] : 2;
            $.app[index].menuKey        = ''+$._currentApp['绑定界面'] || "Scene_Menu";
            $.app[index].callCommonMode = $._currentApp['公共事件触发模式'] !== undefined ? +$._currentApp['公共事件触发模式'] : 0;
            $.app[index].commonEvent    = +$._currentApp['绑定公共事件'] || 0;
            $.app[index].code           = ''+$._currentApp['自定义代码'] || "";
        };

        for(var i = 0; i < $.appAmount; i++) {
            $.getAppParam(i);
        };

        /**将可用图标集合到同一个数组中 */

        $.refreshAppIcons = function(){
            $.appIcons = [];
            for (var i = 0; i < $.app.length; i++) {
                var isInvalid = $.app[i].visibleSwi ? $gameSwitches.value($.app[i].visibleSwi) : false;
                if(isInvalid) continue;
                $.appIcons.push($.app[i].iconIndex);
            };
        };

        /**设置插件指令 */

        var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            _Game_Interpreter_pluginCommand.call(this, command, args);
            if((command === '::手机界面' || command == '::ScenePhone') && args[0] == RSSD.ScenePhone[$.pluginName].pluginName) {
                switch(args[1]) {
                    case '打开':
                    case 'open':
                        SceneManager.push(window[$.sceneName]);
                        break;
                }
            }
        };

        /**创建窗口：window[windowName](x, y) */
        
        var windowName = $.windowName;

        window[windowName] = function() {
            this.initialize.apply(this, arguments);
        };

        window[windowName].prototype = Object.create(Window_Desktop.prototype);
        window[windowName].prototype.constructor = window[windowName];

        window[windowName].prototype.initialize = function(x, y) {
            $.refreshAppIcons();
            this._iconList = $.appIcons;
            if (!$.showWindowskin) {
                this._standardBackOpacity = 0;
                this._frameOpacity = 0;
            } else {
                this._standardBackOpacity = 192;
                this._frameOpacity = 255;
            }
            Window_Desktop.prototype.initialize.call(this, x, y);
        };

        window[windowName].prototype.windowWidth = function() {
            return $.windowWidth;
        };

        window[windowName].prototype.windowHeight = function() {
            return $.windowHeight;
        };

        window[windowName].prototype.loadWindowskin = function() {
            this.windowskin = ImageManager.loadSystem($.windowskin)
        };

        window[windowName].prototype.numVisibleRows = function() {
            return $.numVisibleRows;
        };

        window[windowName].prototype.maxCols = function() {
            return $.maxCols;
        };

        window[windowName].prototype.lineHeight = function() {
            return this.iconDrawingHeight() + this.standardFontSize() + this.iconTextDistance() + 18;
        };

        window[windowName].prototype.standardFontSize = function() {
            return $.fontSize;
        };

        window[windowName].prototype.iconDrawingWidth = function() {
            return $.realIconWidth;
        };

        window[windowName].prototype.iconDrawingHeight = function() {
            return $.realIconHeight;
        };

        window[windowName].prototype.iconTextDistance = function() {
            return $.iconTextDis;
        };

        window[windowName].prototype.makeCommandList = function() {
            for(var i = 0; i < $.app.length; i++) {
                this.makeEachCommand(i);
            }
        };

        window[windowName].prototype.makeEachCommand = function(index) {
            var isInvalid = $.app[index].visibleSwi ? $gameSwitches.value($.app[index].visibleSwi) : false;
            if(isInvalid) return;
            this.addCommand($.app[index].name, 'phoneApp'+index, true);
        };


        /**创建界面：window[sceneName]() */

        var sceneName = $.sceneName;

        window[sceneName] = function() {
            this.initialize.apply(this, arguments);
        };
        
        window[sceneName].prototype = Object.create(Scene_Desktop.prototype);
        window[sceneName].prototype.constructor = window[sceneName];
        
        window[sceneName].prototype.initialize = function() {
            this.refreshApps();
            Scene_Desktop.prototype.initialize.call(this);
        };
        
        window[sceneName].prototype.create = function() {
            Scene_Desktop.prototype.create.call(this);
            this.createPhoneWindow();
        };
        
        window[sceneName].prototype.createPhoneWindow = function() {
            this._phoneWindow = new window[windowName]($.windowX, $.windowY);
            for (var i = 0; i < $.app.length; i++) {
                this.setEachAppHandler(i);
            };
            this._phoneWindow.setHandler('cancel',this.popScene.bind(this));
            this.addWindow(this._phoneWindow);
        };

        window[sceneName].prototype.setEachAppHandler = function(index) {
            var isInvalid = $.app[index].visibleSwi ? $gameSwitches.value($.app[index].visibleSwi) : false;
            if(isInvalid) return;
            this._phoneWindow.setHandler('phoneApp'+index, this._appFunction[index].bind(this));
        };

        window[sceneName].prototype.generateApp = function(index) {
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
        };

        window[sceneName].prototype.refreshApps = function() {
            this._appFunction = [];
            for(var i = 0; i < $.app.length; i++) {
                var that = this._appFunction;
                that[i] = new Function('this.generateApp('+i+')');
            }
        };


        /**创建背景 */

        
        window[sceneName].prototype.createBackground = function() {
            Scene_Desktop.prototype.createBackground.call(this);
            if($.back.bitmap){
                var visible = $.back.swi ? $gameSwitches.value($.back.swi) : true;
                this.addExtendedSprite('img/phones/',$.back.bitmap, eval(''+$.back.x), eval(''+$.back.y), eval(''+$.back.opacity), visible, eval(''+$.back.rotation), $.back.blendMode, eval(''+$.back.scaleX), eval(''+$.back.scaleY))
            };
        };


        /**创建遮罩 */

        /*
        var _SceneManager_initialize = SceneManager.initialize;
        SceneManager.initialize = function() {
            _SceneManager_initialize.call(this);
            this._phoneMasks = this._phoneMasks || {};
            this.initPhoneMask();
        };

        SceneManager.initPhoneMask = function() {
            var phoneMask = new Sprite();
            if($.mask.bitmap){
                phoneMask.bitmap   = ImageManager.loadBitmap('img/phones/',$.mask.bitmap,0,true);
                phoneMask.x        = eval(''+$.mask.x);
                phoneMask.y        = eval(''+$.mask.y);
                phoneMask.opacity  = eval(''+$.mask.opacity);
                phoneMask.rotation = eval(''+$.mask.rotation);
                phoneMask.scale.x  = eval(''+$.mask.scaleX);
                phoneMask.scale.y  = eval(''+$.mask.scaleY);
                phoneMask.anchor.x = 0.5;
                phoneMask.anchor.y = 0.5;
                phoneMask.visible  = $.mask.swi ? $gameSwitches.value($.mask.swi) : true;
            }
            this._phoneMasks[$.pluginName] = phoneMask;
        };

        var _SceneManager_onSceneStart = SceneManager.onSceneStart;
        SceneManager.onSceneStart = function() {
            _SceneManager_onSceneStart.call(this);
            this.refreshPhoneMaskZ();
        };

        if(JSON.stringify(RSSD.ScenePhone) === '{}' && SceneManager.refreshPhoneMaskZ == undefined) {
            SceneManager.refreshPhoneMaskZ = function() {
                if (this._scene instanceof window[$.sceneName]) {
                    this._scene.addChild(this._phoneMasks[$.pluginName]);
                }
            };
        };

        var _SceneManager_snapForBackground = SceneManager.snapForBackground;
        SceneManager.snapForBackground = function() {
            this._phoneMasks[$.pluginName].visible = false;
            _SceneManager_snapForBackground.call(this);
            this._phoneMasks[$.pluginName].visible = true;
        };

        var _Scene_Base_createFadeSprite = Scene_Base.prototype.createFadeSprite;
        Scene_Base.prototype.createFadeSprite = function(white) {
            _Scene_Base_createFadeSprite.call(this, white);
            SceneManager.refreshPhoneMaskZ();
        };
        */

    } else {
        alert($.pluginName+'.js 需要 SceneDesktop.js 插件。看看是不是忘记安装或者插件顺序不对！')
    };
})(obj);
RSSD.ScenePhone[obj.pluginName] = obj;
