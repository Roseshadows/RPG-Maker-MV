//=============================================================================
// TMVplugin - リングコマンド
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// 版本: 0.4b (1.0.0)
// 最后更新: 2016/04/13 (2022/02/28)
//=============================================================================
/*:
 * @plugindesc v1.0.0 - 命令轮盘插件 修改版

 * @author tomoaky (由Rose_shadows修改)
 * @help
 * ---------------------------------------------------------------------------
 * == 修改&增加的部分 ==
 *
 * 1、原本固定为向下朝向，现增加了指令朝向的参数（向上/向下）。
 * 2、原本固定绑定在玩家上，现增加了轮盘绑定对象的参数（玩家/屏幕），
 * 可以自定义绑定的位置。
 * 3、原本轮盘内容是固定的，现各个指令可以与开关绑定，可以实现
 * 当特定开关开启时，隐藏某个指令。
 * 4、增加了10个可供自定义的公共事件指令。
 * 5、增加了关于启用/禁用指令图标、名称框和其文本的不透明度，以及
 * 名称框的十六进制颜色的参数。
 * 
 * ---------------------------------------------------------------------------
 * == 介绍 ==
 * 
 * 在地图上，按住Ctrl或Esc键（默认是Ctrl键）就可以呼出命令轮盘。
 * 命令轮盘中不仅可以调用RMMV默认有的界面，还可以调用公共事件。
 * 游戏过程中还可以通过操作开关来控制各个指令的显示与隐藏。
 * 
 * ---------------------------------------------------------------------------
 * == 指引 ==
 * 
 * 本插件即插即用。
 * 默认什么都没有设置的情况下，命令轮盘会绑定在玩家身上，显示
 * RMMV自带的共8个指令（就是参数列表中设置了的几个指令）。
 * 具体的设置请自行去看列表中的参数。
 * 本插件最多可以绑定10个公共事件。
 * 其他相关的插件要放在该插件之上。
 * 
 * ----------------------------------------------------------------------------
 * == !!! 注意事项（必看） !!! ==
 * 
 * <= 关于“指令关闭开关” =>
 * 由于我能力有限，目前有一个问题无法解决：
 * 设置了相关开关后，直到玩家被传送到另一个地图或打开某个界面，
 * 与该开关关联的指令才会做出相应的变动。
 * 目前的解决办法是：
 * 在“开关操作”事件之后加一条脚本：
 *     SceneManager.goto(Scene_Map);
 * 
 * <= 关于参数中的指令设置部分 =>
 * *不要删掉*默认RMMV中自带的8个指令！
 * 如果你不想使用某些指令，可以将那些指令的“指令关闭开关”参数
 * 设为同一个开关，然后在游戏开头时把这个开关打开。
 * 
 * <= 关于JKMail 指令 =>
 * 这个指令说实话没什么意义，因为这个功能可以通过绑定公共事件实现。
 * 但如果你使用了JKMail指令，记得在JK_MailSystem.js插件里加一条
 * 脚本：
 * Imported.JKMail = true;
 * 否则会出错。
 * 
 * == 协议 ==
 * 本插件的发行遵循MIT协议。
 * (此插件的本体是由tomoaky写的, 我(离影玫) 只是调整了插件参数
 * 的结构以适应最新的写法（1.6.x之前的版本应该也可以用）并加了些
 * 比较有用的功能而已。）
 * 
 * 指向本体插件的链接:
 * https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMRingCommand.js
 * 
 * == 修改日志 ==
 *  1.0.0 - 基础修改完成。
 *  1.0.1 - 增加了外观方面的参数。
 * 
 * @param == Basic Settings ==
 * @text == 基础设置 ==
 * 
 * @param Direction
 * @text 朝向
 * @parent == Basic Settings ==
 * @type select
 * @option 向下
 * @value 0
 * @option 向上
 * @value 1
 * @desc 轮盘的朝向。
 * 默认: 0 (向下)
 * @default 0
 * 
 * @param Use Escape
 * @text 是否使用Esc
 * @parent == Basic Settings ==
 * @type boolean
 * @on 用Esc
 * @off 用Ctrl
 * @desc 是否代替Ctrl使用Esc呼出轮盘？
 * @default false
 *
 * @param Use Caption
 * @text 是否使用名称框
 * @parent == Basic Settings ==
 * @type boolean
 * @on 用
 * @off 不用
 * @desc 是否使用名称框？
 * @default true
 *
 * @param Save Last Index
 * @text 是否保存上一个索引
 * @parent == Basic Settings ==
 * @type boolean
 * @on 保存
 * @off 不保存
 * @desc 是否记住上一个选中的指令？
 * 默认:false (若设为true，上次选中的指令就会在初始位置。)  
 * @default false
 *
 * @param Reset Index when Opens
 * @text 再次打开时是否重置索引
 * @parent == Basic Settings ==
 * @type boolean
 * @on 重置
 * @off 不重置
 * @desc 轮盘再次打开时是否重置序列？
 * 默认:false (若设为true，索引会重置)
 * @default false
 *
 * @param Open Gold Window
 * @text 是否显示金钱窗口
 * @parent == Basic Settings ==
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 打开轮盘时是否显示金钱窗口？
 * 默认:true (若设为false，则金钱窗口不会显示。)
 * @default true
 *
 * @param Gold Window X
 * @text 金钱窗口 X
 * @parent == Basic Settings ==
 * @desc 金钱窗口 X 坐标。可以是一段评估代码。
 * 默认: 576
 * @default 576
 *
 * @param Gold Window Y
 * @text 金钱窗口 Y
 * @parent == Basic Settings ==
 * @desc 金钱窗口 Y 坐标。可以是一段评估代码。
 * 默认: 0
 * @default 0
 * 
 * @param Bound To Screen
 * @text 是否绑定至屏幕
 * @parent == Basic Settings ==
 * @type boolean
 * @on 绑定至屏幕
 * @off 绑定至玩家
 * @desc 将轮盘绑定在屏幕上或玩家身上。
 * @default false
 * 
 * @param Screen X
 * @text 屏幕 X
 * @parent == Basic Settings ==
 * @desc 若轮盘被绑定至屏幕，这是轮盘的 X 坐标。可以是一段评估代码。默认：SceneManager._screenWidth/2
 * @default SceneManager._screenWidth/2
 * 
 * @param Screen Y
 * @text 屏幕 Y
 * @parent == Basic Settings ==
 * @desc 若轮盘被绑定至屏幕，这是轮盘的 X 坐标。可以是一段评估代码。默认：0
 * @default 0
 *
 * @param Open Command SE
 * @text 打开音效
 * @parent == Basic Settings ==
 * @type struct<SE>
 * @desc 打开轮盘时播放的音效。
 * @default {"name":"Cancel2","volume":"90","pitch":"100","pan":"0"}
 *
 * @param Close Command SE
 * @text 关闭音效
 * @parent == Basic Settings ==
 * @type struct<SE>
 * @desc 关闭轮盘时播放的音效。
 * @default {"name":"Cancel2","volume":"90","pitch":"100","pan":"0"}
 * 
 * @param == Command Settings ==
 * @text == 指令设置 ==
 * 
 * @param Item Command
 * @text 物品指令
 * @parent == Command Settings ==
 * @type struct<item>
 * @desc 物品指令设置。
 * @default {"Icon Index":"176","Close Switch":"0"}
 * 
 * @param Skill Command
 * @text 技能指令
 * @parent == Command Settings ==
 * @type struct<skill>
 * @desc 技能指令设置。
 * @default {"Icon Index":"76","Close Switch":"0"}
 * 
 * @param Equip Command
 * @text 装备指令
 * @parent == Command Settings ==
 * @type struct<equip>
 * @desc 装备指令设置。
 * @default {"Icon Index":"135","Close Switch":"0"}
 * 
 * @param Status Command
 * @text 状态指令
 * @parent == Command Settings ==
 * @type struct<status>
 * @desc 状态指令设置。
 * @default {"Icon Index":"84","Close Switch":"0"}
 * 
 * @param Formation Command
 * @text 整队指令
 * @parent == Command Settings ==
 * @type struct<formation>
 * @desc 整队指令设置。
 * @default {"Icon Index":"75","Close Switch":"0"}
 * 
 * @param Options Command
 * @text 选项指令
 * @parent == Command Settings ==
 * @type struct<options>
 * @desc 选项指令设置。
 * @default {"Icon Index":"83","Close Switch":"0"}
 * 
 * @param Save Command
 * @text 保存指令
 * @parent == Command Settings ==
 * @type struct<save>
 * @desc 保存指令设置。
 * @default {"Icon Index":"225","Close Switch":"0"}
 * 
 * @param Load Command
 * @text 读档指令
 * @parent == Command Settings ==
 * @type struct<load>
 * @desc 读档指令设置。
 * @default {"Name":"Load","Icon Index":"190","Close Switch":"0"}
 * 
 * @param GameEnd Command
 * @text 游戏结束指令
 * @parent == Command Settings ==
 * @type struct<gameEnd>
 * @desc 游戏结束指令设置。
 * @default {"Icon Index":"82","Close Switch":"0"}
 * 
 * @param GoldLevelUp Command
 * @text 金钱升级指令
 * @parent == Command Settings ==
 * @type struct<goldLevelUp>
 * @desc (需要 TMGoldLevelUp.js) 
 * 金钱升级指令的设置。
 * 
 * @param JK_Mail Command
 * @text JK邮箱指令
 * @parent == Command Settings ==
 * @type struct<mail>
 * @desc (需要 JK_MailSystem.js) 邮箱指令设置。详情去看插件帮助。
 * 
 * @param CommonEvent 1 Command
 * @text 公共事件 1 指令
 * @parent == Command Settings ==
 * @type struct<ce1>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param CommonEvent 2 Command
 * @text 公共事件 2 指令
 * @parent == Command Settings ==
 * @type struct<ce2>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param CommonEvent 3 Command
 * @text 公共事件 3 指令
 * @parent == Command Settings ==
 * @type struct<ce3>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param CommonEvent 4 Command
 * @text 公共事件 4 指令
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param CommonEvent 5 Command
 * @text 公共事件 5 指令
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param CommonEvent 6 Command
 * @text 公共事件 6 指令
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param CommonEvent 7 Command
 * @text 公共事件 7 指令
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param CommonEvent 8 Command
 * @text 公共事件 8 指令
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param CommonEvent 9 Command
 * @text 公共事件 9 指令
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param CommonEvent 10 Command
 * @text 公共事件 10 指令
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs 可以调用特定公共事件的公共事件指令。
 * 
 * @param == Appearance Settings ==
 * @text == 外观设置 ==
 * 
 * @param Enabled Icon Opacity
 * @text 启用图标不透明度
 * @parent == Appearance Settings ==
 * @type number
 * @desc 启用图标的不透明度。
 * 默认: 255
 * @default 255
 * 
 * @param Disabled Icon Opacity
 * @text 禁用图标不透明度
 * @parent == Appearance Settings ==
 * @type number
 * @desc 禁用图标的不透明度。
 * 默认: 160
 * @default 160
 * 
 * @param Rotate Duration
 * @text 旋转时长
 * @parent == Appearance Settings ==
 * @desc 轮盘的旋转时长。
 * 默认: 4 (必须是整数)
 * @default 4
 *
 * @param Icon Dist X
 * @text 图标距离 X
 * @parent == Appearance Settings ==
 * @desc 图标距离 (横向) 。
 * 默认: 16
 * @default 16
 *
 * @param Icon Dist Y
 * @text 图标距离 Y
 * @parent == Appearance Settings ==
 * @desc 图标距离 (纵向) 。
 * 默认: 12
 * @default 12
 *
 * @param Selected Icon Scale
 * @text 选中图标的缩放
 * @parent == Appearance Settings ==
 * @desc 选中图标的缩放补正值。
 * 默认: 1.5
 * @default 1.5
 * 
 * @param Caption Color
 * @text 名称框颜色
 * @parent == Appearance Settings ==
 * @desc 名称框颜色。应该是十六进制颜色。
 * 默认: #000000
 * @default #000000
 * 
 * @param Caption Opacity
 * @text 名称框不透明度
 * @parent == Appearance Settings ==
 * @type number
 * @desc 名称框的不透明度。
 * 默认: 160
 * @default 160
 * 
 * @param Caption Text Opacity
 * @text 名称框文本不透明度
 * @parent == Appearance Settings ==
 * @type number
 * @desc 名称框文本的不透明度。
 * 默认: 255
 * @default 255
 * 
 *
 * @param Caption Width
 * @text 名称框宽度
 * @parent == Appearance Settings ==
 * @desc 名称框的宽度。
 * 默认: 200
 * @default 200
 *
 * @param Caption Height
 * @text 名称框高度
 * @parent == Appearance Settings ==
 * @desc 名称框的高度。
 * 默认: 48
 * @default 48
 *
 * @param Caption Shift X
 * @text 名称框补正 X
 * @parent == Appearance Settings ==
 * @desc 名称框X坐标补正值。
 * 默认: 0
 * @default 0
 *
 * @param Caption Shift Y
 * @text 名称框补正 Y
 * @parent == Appearance Settings ==
 * @desc 名称框Y坐标补正值。
 * 默认: -96
 * @default -96
 */

/*~struct~SE:
 * @param name
 * @text 名称
 * @type file
 * @dir audio/se
 * @require 1
 * @desc SE名称。
 * @default cancel2
 * 
 * @param volume
 * @text 音量
 * @type number
 * @max 100
 * @min 0
 * @desc SE音量。
 * @default 90
 * 
 * @param pitch
 * @text 音调
 * @type number
 * @max 150
 * @min 50
 * @desc SE音调。
 * @default 100
 * 
 * @param pan
 * @text 声道
 * @type number 
 * @max 100
 * @min -100
 * @desc SE声道。
 * @default 0
 */
/*~struct~item:
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：176
 * @default 176
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * @default 0
 */

/*~struct~skill:
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：76
 * @default 76
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * @default 0
 */

/*~struct~equip:
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：135
 * @default 135
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * @default 0
 */

/*~struct~status:
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：84
 * @default 84
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * @default 0
 */

/*~struct~formation:
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：75
 * @default 75
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * @default 0
 */

/*~struct~options:
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：83
 * @default 83
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * @default 0
 */

/*~struct~save:
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：225
 * @default 225
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * @default 0
 */

/*~struct~load:
 * @param Name
 * @text 名称
 * @desc 该指令的名称框文本。
 * @default Load
 * 
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：190
 * @default 190
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * @default 0
 */

/*~struct~mail:
 * @param Name
 * @text 名称
 * @desc 该指令的名称框文本。
 * @default Mail
 * 
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：192
 * @default 192
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * 
 * @param Common Event
 * @text 公共事件
 * @type common_event
 * @desc 该指令会运行一个公共事件。你可以自定义打开的邮箱。默认设置公共事件#4。 
 * @default 4
 */

/*~struct~ce1:
 * @param Name
 * @text 名称
 * @desc 该指令的名称框文本。
 * @default
 * 
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：0
 * @default 0
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * 
 * @param Common Event
 * @text 公共事件
 * @type common_event
 * @desc 该指令会运行一个公共事件。默认设置公共事件#1。
 * @default 1
 */

/*~struct~ce2:
 * @param Name
 * @text 名称
 * @desc 该指令的名称框文本。
 * @default
 * 
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：0
 * @default 0
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * 
 * @param Common Event
 * @text 公共事件
 * @type common_event
 * @desc 该指令会运行一个公共事件。默认设置公共事件#2。
 * @default 2
 */

/*~struct~ce3:
 * @text 名称
 * @param Name
 * @desc 该指令的名称框文本。
 * @default
 * 
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：0
 * @default 0
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * 
 * @param Common Event
 * @text 公共事件
 * @type common_event
 * @desc 该指令会运行一个公共事件。默认设置公共事件#3。
 * @default 3
 */

/*~struct~ce:
 * @param Name
 * @text 名称
 * @desc 该指令的名称框文本。
 * @default
 * 
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：0
 * @default 0
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * 
 * @param Common Event
 * @text 公共事件
 * @type common_event
 * @desc 该指令会运行一个公共事件。
 * @default 0
 */

/*~struct~goldLevelUp:
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：236
 * @default 236
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 */

/*~struct~gameEnd:
 * @param Icon Index
 * @text 图标索引
 * @type number
 * @min 0
 * @desc 该指令的图标索引。
 * 默认：82
 * @default 82
 * 
 * @param Close Switch
 * @text 指令关闭开关
 * @type switch
 * @desc 若该开关为ON，该指令就会隐藏。0或空意思是该指令会永远显示。
 * @default 0
 */
/**
 * Modification Note:
 *   None.
 */

var Imported = Imported || {};
Imported.TMRingCommand = true;

(function(){

    // parameters

    var parameters = PluginManager.parameters('TMRingCommand_Upgraded');
    var direction      = Number(parameters['Direction']);
    var useEscape      = String(parameters['Use Escape']) === 'true';
    var useCaption     = String(parameters['Use Caption']) === 'true';
    var boundToScreen  = String(parameters['Bound To Screen']) === 'true';
    var screenX        = isNaN(Number(parameters['Screen X'])) ? eval(parameters['Screen X']) : Number(parameters['Screen X']);
    var screenY        = isNaN(Number(parameters['Screen Y'])) ? eval(parameters['Screen Y']) : Number(parameters['Screen Y']);
    var saveLastIndex  = String(parameters['Save Last Index']) === 'true';
    var openResetIndex = String(parameters['Reset Index when Opens']) === 'true';
    var openGoldWindow = String(parameters['Open Gold Window']) === 'true';
    var goldWindowX    = isNaN(Number(parameters['Gold Window X'])) ? eval(parameters['Gold Window X']) : Number(parameters['Gold Window X']);
    var goldWindowY    = isNaN(Number(parameters['Gold Window Y'])) ? eval(parameters['Gold Window Y']) : Number(parameters['Gold Window Y']);
    var seOpenCommand  = {
        name :   String(JSON.parse(parameters['Open Command SE'])['name']),
        volume : Number(JSON.parse(parameters['Open Command SE'])['volume']),
        pitch :  Number(JSON.parse(parameters['Open Command SE'])['pitch']),
        pan :    Number(JSON.parse(parameters['Open Command SE'])['pan'])
    };
    var seCloseCommand = {
        name :   String(JSON.parse(parameters['Close Command SE'])['name']),
        volume : Number(JSON.parse(parameters['Close Command SE'])['volume']),
        pitch :  Number(JSON.parse(parameters['Close Command SE'])['pitch']),
        pan :    Number(JSON.parse(parameters['Close Command SE'])['pan'])
    };
    
    var ce1ON,ce2ON,ce3ON,ce4ON,ce5ON,ce6ON,ce7ON,ce8ON,ce9ON,ce10ON,mailON,goldLevelUpON;
    var ce1 = parameters['CommonEvent 1 Command'] ? (function(){ce1ON = true; return JSON.parse(parameters['CommonEvent 1 Command'])})() : {};
    var ce2 = parameters['CommonEvent 2 Command'] ? (function(){ce2ON = true; return JSON.parse(parameters['CommonEvent 2 Command'])})() : {};
    var ce3 = parameters['CommonEvent 3 Command'] ? (function(){ce3ON = true; return JSON.parse(parameters['CommonEvent 3 Command'])})() : {};
    var ce4 = parameters['CommonEvent 4 Command'] ? (function(){ce4ON = true; return JSON.parse(parameters['CommonEvent 4 Command'])})() : {};
    var ce5 = parameters['CommonEvent 5 Command'] ? (function(){ce5ON = true; return JSON.parse(parameters['CommonEvent 5 Command'])})() : {};
    var ce6 = parameters['CommonEvent 6 Command'] ? (function(){ce6ON = true; return JSON.parse(parameters['CommonEvent 6 Command'])})() : {};
    var ce7 = parameters['CommonEvent 7 Command'] ? (function(){ce7ON = true; return JSON.parse(parameters['CommonEvent 7 Command'])})() : {};
    var ce8 = parameters['CommonEvent 8 Command'] ? (function(){ce8ON = true; return JSON.parse(parameters['CommonEvent 8 Command'])})() : {};
    var ce9 = parameters['CommonEvent 9 Command'] ? (function(){ce9ON = true; return JSON.parse(parameters['CommonEvent 9 Command'])})() : {};
    var ce10 = parameters['CommonEvent 10 Command'] ? (function(){ce10ON = true; return JSON.parse(parameters['CommonEvent 10 Command'])})() : {};
    var mail = parameters['JK_Mail Command'] ? (function(){mailON = true; return JSON.parse(parameters['JK_Mail Command'])})() : {};
    var goldLevelUp = parameters['GoldLevelUp Command'] ? (function(){goldLevelUpON = true; return JSON.parse(parameters['GoldLevelUp Command'])})() : {};

    var commandIcon = {};
    commandIcon['item']        = Number(JSON.parse(parameters['Item Command'])['Icon Index']);
    commandIcon['skill']       = Number(JSON.parse(parameters['Skill Command'])['Icon Index']);
    commandIcon['equip']       = Number(JSON.parse(parameters['Equip Command'])['Icon Index']);
    commandIcon['status']      = Number(JSON.parse(parameters['Status Command'])['Icon Index']);
    commandIcon['formation']   = Number(JSON.parse(parameters['Formation Command'])['Icon Index']);
    commandIcon['options']     = Number(JSON.parse(parameters['Options Command'])['Icon Index']);
    commandIcon['save']        = Number(JSON.parse(parameters['Save Command'])['Icon Index']);
    commandIcon['load']        = Number(JSON.parse(parameters['Load Command'])['Icon Index']);   // 增加了这里的参数
    commandIcon['gameEnd']     = Number(JSON.parse(parameters['GameEnd Command'])['Icon Index']);
    commandIcon['goldLevelUp'] = Number(goldLevelUp['Icon Index']);
    commandIcon['mail']        = Number(mail['Icon Index']);   // 增加了JK_MailSystem.js
    commandIcon['ce1']         = Number(ce1['Icon Index']);
    commandIcon['ce2']         = Number(ce2['Icon Index']);
    commandIcon['ce3']         = Number(ce3['Icon Index']);
    commandIcon['ce4']         = Number(ce4['Icon Index']);
    commandIcon['ce5']         = Number(ce5['Icon Index']);
    commandIcon['ce6']         = Number(ce6['Icon Index']);
    commandIcon['ce7']         = Number(ce7['Icon Index']);
    commandIcon['ce8']         = Number(ce8['Icon Index']);
    commandIcon['ce9']         = Number(ce9['Icon Index']);
    commandIcon['ce10']        = Number(ce10['Icon Index']);

    var itemSwi        = JSON.parse(parameters['Item Command'])['Close Switch'] ? JSON.parse(parameters['Item Command'])['Close Switch'] : 0;
    var skillSwi       = JSON.parse(parameters['Skill Command'])['Close Switch'] ? JSON.parse(parameters['Skill Command'])['Close Switch'] : 0;
    var equipSwi       = JSON.parse(parameters['Equip Command'])['Close Switch'] ? JSON.parse(parameters['Equip Command'])['Close Switch'] : 0;
    var statusSwi      = JSON.parse(parameters['Status Command'])['Close Switch'] ? JSON.parse(parameters['Status Command'])['Close Switch'] : 0;
    var formationSwi   = JSON.parse(parameters['Formation Command'])['Close Switch'] ? JSON.parse(parameters['Formation Command'])['Close Switch'] : 0;
    var optionsSwi     = JSON.parse(parameters['Options Command'])['Close Switch'] ? JSON.parse(parameters['Options Command'])['Close Switch'] : 0;
    var saveSwi        = JSON.parse(parameters['Save Command'])['Close Switch'] ? JSON.parse(parameters['Save Command'])['Close Switch'] : 0;
    var loadSwi        = JSON.parse(parameters['Load Command'])['Close Switch'] ? JSON.parse(parameters['Load Command'])['Close Switch'] : 0;
    var gameEndSwi     = JSON.parse(parameters['GameEnd Command'])['Close Switch'] ? JSON.parse(parameters['GameEnd Command'])['Close Switch'] : 0;
    var goldLevelUpSwi = goldLevelUp['Close Switch'] ? goldLevelUp['Close Switch'] : 0;
    var mailSwi        = mail['Close Switch'] ? mail['Close Switch'] : 0;
    var ce1Swi         = ce1['Close Switch'] ? ce1['Close Switch'] : 0;
    var ce2Swi         = ce2['Close Switch'] ? ce2['Close Switch'] : 0;
    var ce3Swi         = ce3['Close Switch'] ? ce3['Close Switch'] : 0;
    var ce4Swi         = ce4['Close Switch'] ? ce4['Close Switch'] : 0; 
    var ce5Swi         = ce5['Close Switch'] ? ce5['Close Switch'] : 0; 
    var ce6Swi         = ce6['Close Switch'] ? ce6['Close Switch'] : 0; 
    var ce7Swi         = ce7['Close Switch'] ? ce7['Close Switch'] : 0; 
    var ce8Swi         = ce8['Close Switch'] ? ce8['Close Switch'] : 0; 
    var ce9Swi         = ce9['Close Switch'] ? ce9['Close Switch'] : 0; 
    var ce10Swi        = ce10['Close Switch'] ? ce10['Close Switch'] : 0; 
