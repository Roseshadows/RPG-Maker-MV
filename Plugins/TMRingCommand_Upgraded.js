//=============================================================================
// TMVplugin - リングコマンド
// Author: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.4b (1.0.0)
// Last Update: 2016/04/13 (2022.02.28)
//=============================================================================
/*:
 * @plugindesc v1.0.1 - Modified TMRingCommand plugin
 * @author tomoaky (Modified by Rose_shadows)
 * @help
 * ---------------------------------------------------------------------------
 * == What's new (Modification & Addition Parts) ==
 *
 * 1. Originally the direction of ring menu is fixed. but now you can set the direction
 * to "up" or "down"(default).
 * 2. Originally the ring menu is bound to the player, but now you can bind it to
 * player or screen, which allows you to customize the ring menu's position.
 * 3. Originally the arrangement of ring menu is fixed, but now you can hide/show
 * commands using specific switches during the game.
 * 4. Up to 10 Common Events are created to be added to the ring menu as commands.
 * 5. Params, including Enabled/Disabled Icon Opacity, Caption Opacity, Caption 
 * Text Opacity and Caption Color, have been added.
 * 
 * ---------------------------------------------------------------------------
 * == Introduction ==
 *
 * Hold Ctrl to push a ring menu from which player s can call Item Scene, Skill 
 * Scene and so on, or even Common Events. You can also hide specific scenes 
 * from the menu using switches during the game.
 * 
 * ---------------------------------------------------------------------------
 * == Instructions ==
 *
 * Despite that you just installed the plugin and have modified nothing, the 
 * plugin can still work.
 * If you want to set more advanced settings, call Common Events or push Scenes
 * provided by other plugins, you can go to the parameter list to modify 
 * corresponding parameters.
 * Up to 10 Common Events can be added to the ring menu.
 * The plugins, which provide scenes to be used, should be placed above 
 * this plugin.
 * 
 * ----------------------------------------------------------------------------
 * == !!!IMPORTANT!!! ==
 * 
 * <= About Close Switches =>
 * You may find that even though the corresponding switch has been turned ON/OFF, 
 * the arrangement of ring menu will not be changed until players go to another 
 * map or a scene is called out. As a beginner, I cannot deal with this issue
 * currently. But you can manually add a script call right after setting the 
 * switch's value:
 *     SceneManager.goto(Scene_Map);
 * 
 * <= About Parameters Commands =>
 * Please DONOT delete the settings of Commands parameters which are RPG Maker
 * MV's default commands including Item, Skills, Equip, Status, Formation, Save, 
 * Load and GameEnd in the parameter list.
 * If you don't want some of them to appear in the ring menu, you can set their
 * "Close Switch" param to the same switch that can be turned on at the start of
 * the game.
 * 
 * <= About JKMail Command =>
 * If you're using JK_MailSystem.js and intending to add Mail Scene to the ring  
 * menu, you must add a line of script in the JK_MailSystem.js:
 *     Imported.JKMail = true;
 * Otherwise you will get error which says Imported.JKMail is undefined even if
 * you have installed the required plugins correctly.
 * 
 * == Terms of Use ==
 * This plugin is released under MIT license.
 * (This plugin belongs to tomoaky, I(Roseshadows) have only adjusted the plugin
 * parameters' structure to make it fit the latest form, with some useful
 * functions added.)
 * 
 * Link to the original plugin:
 * https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMRingCommand.js
 * 
 * == Modification Log ==
 *  1.0.0 - Basic modification have been completed.
 *  1.0.1 - More detailed parameter settings have been added.
 * 
 * @param == Basic Settings ==
 * 
 * @param Direction
 * @parent == Basic Settings ==
 * @type select
 * @option Down
 * @value 0
 * @option Up
 * @value 1
 * @desc The ring menu's direction.
 * Default: 0 (Down)
 * @default 0
 * 
 * @param Use Escape
 * @parent == Basic Settings ==
 * @type boolean
 * @on Use
 * @off Not Use
 * @desc Whether or not to use Esc instead of Ctrl to call the ring menu.
 * @default false
 *
 * @param Use Caption
 * @parent == Basic Settings ==
 * @type boolean
 * @on Use
 * @off Not Use
 * @desc Whether or not to use caption.
 * @default true
 *
 * @param Save Last Index
 * @parent == Basic Settings ==
 * @type boolean
 * @on Save
 * @off Not Save
 * @desc Whether or not to remember the last selected command.
 * Default:false (if set to true, the last command will be at the initial position)  
 * @default false
 *
 * @param Reset Index when Opens
 * @parent == Basic Settings ==
 * @type boolean
 * @on Reset
 * @off Not Reset
 * @desc Whether or not to reset index when ring menu opens again.
 * Default:false (if set to true, the index will be reset)
 * @default false
 *
 * @param Open Gold Window
 * @parent == Basic Settings ==
 * @type boolean
 * @on Open
 * @off Not Open
 * @desc Whether or not to display gold window when ring menu opens.
 * Defualt:true (if set to false, gold window will not be displayed)
 * @default true
 *
 * @param Gold Window X
 * @parent == Basic Settings ==
 * @desc X position of gold window. Can be an eval.
 * Default: 576
 * @default 576
 *
 * @param Gold Window Y
 * @parent == Basic Settings ==
 * @desc Y position of gold window. Can be an eval.
 * Default: 0
 * @default 0
 * 
 * @param Bound To Screen
 * @parent == Basic Settings ==
 * @type boolean
 * @on To Screen
 * @off To Player
 * @desc Bind the ring menu to player or screen.
 * @default false
 * 
 * @param Screen X
 * @parent == Basic Settings ==
 * @desc If the ring menu is bound to screen, this will be the menu's X position.Can be an eval. Default: SceneManager._screenWidth/2
 * @default SceneManager._screenWidth/2
 * 
 * @param Screen Y
 * @parent == Basic Settings ==
 * @desc If the ring menu is bound to screen, this will be the menu's Y position.Can be an eval. Default: 0
 * @default 0
 *
 * @param Open Command SE
 * @parent == Basic Settings ==
 * @type struct<SE>
 * @desc Display this SE when ring menu opens.
 * @default {"name":"Cancel2","volume":"90","pitch":"100","pan":"0"}
 *
 * @param Close Command SE
 * @parent == Basic Settings ==
 * @type struct<SE>
 * @desc Display this SE when ring menu closes.
 * @default {"name":"Cancel2","volume":"90","pitch":"100","pan":"0"}
 * 
 * @param == Command Settings ==
 * 
 * @param Item Command
 * @parent == Command Settings ==
 * @type struct<item>
 * @desc Item command settings.
 * @default {"Icon Index":"176","Close Switch":"0"}
 * 
 * @param Skill Command
 * @parent == Command Settings ==
 * @type struct<skill>
 * @desc Skill command settings.
 * @default {"Icon Index":"76","Close Switch":"0"}
 * 
 * @param Equip Command
 * @parent == Command Settings ==
 * @type struct<equip>
 * @desc Equip command settings.
 * @default {"Icon Index":"135","Close Switch":"0"}
 * 
 * @param Status Command
 * @parent == Command Settings ==
 * @type struct<status>
 * @desc Status command settings.
 * @default {"Icon Index":"84","Close Switch":"0"}
 * 
 * @param Formation Command
 * @parent == Command Settings ==
 * @type struct<formation>
 * @desc Formation command settings.
 * @default {"Icon Index":"75","Close Switch":"0"}
 * 
 * @param Options Command
 * @parent == Command Settings ==
 * @type struct<options>
 * @desc Options command settings.
 * @default {"Icon Index":"83","Close Switch":"0"}
 * 
 * @param Save Command
 * @parent == Command Settings ==
 * @type struct<save>
 * @desc Save command settings.
 * @default {"Icon Index":"225","Close Switch":"0"}
 * 
 * @param Load Command
 * @parent == Command Settings ==
 * @type struct<load>
 * @desc Load command settings.
 * @default {"Name":"Load","Icon Index":"190","Close Switch":"0"}
 * 
 * @param GameEnd Command
 * @parent == Command Settings ==
 * @type struct<gameEnd>
 * @desc GameEnd command settings.
 * @default {"Icon Index":"82","Close Switch":"0"}
 * 
 * @param GoldLevelUp Command
 * @parent == Command Settings ==
 * @type struct<goldLevelUp>
 * @desc (Needs TMGoldLevelUp.js) GoldLevelUp command settings.
 * 
 * @param JK_Mail Command
 * @parent == Command Settings ==
 * @type struct<mail>
 * @desc (Needs JK_MailSystem.js) Mail command settings. Read help file for more info.
 * 
 * @param CommonEvent 1 Command
 * @parent == Command Settings ==
 * @type struct<ce1>
 * @decs CommonEvent Command which can call a specific common event.
 * 
 * @param CommonEvent 2 Command
 * @parent == Command Settings ==
 * @type struct<ce2>
 * @decs CommonEvent Command which can call a specific common event.
 * 
 * @param CommonEvent 3 Command
 * @parent == Command Settings ==
 * @type struct<ce3>
 * @decs CommonEvent Command which can call a specific common event.
 * 
 * @param CommonEvent 4 Command
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs CommonEvent Command which can call a specific common event.
 * 
 * @param CommonEvent 5 Command
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs CommonEvent Command which can call a specific common event.
 * 
 * @param CommonEvent 6 Command
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs CommonEvent Command which can call a specific common event.
 * 
 * @param CommonEvent 7 Command
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs CommonEvent Command which can call a specific common event.
 * 
 * @param CommonEvent 8 Command
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs CommonEvent Command which can call a specific common event.
 * 
 * @param CommonEvent 9 Command
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs CommonEvent Command which can call a specific common event.
 * 
 * @param CommonEvent 10 Command
 * @parent == Command Settings ==
 * @type struct<ce>
 * @decs CommonEvent Command which can call a specific common event.
 * @param == Appearance Settings ==
 * 
 * @param Enabled Icon Opacity
 * @parent == Appearance Settings ==
 * @type number
 * @desc Opacity of enabled icons.
 * Default: 255
 * @default 255
 * 
 * @param Disabled Icon Opacity
 * @parent == Appearance Settings ==
 * @type number
 * @desc Opacity of disabled icons.
 * Default: 160
 * @default 160
 * 
 * @param Rotate Duration
 * @parent == Appearance Settings ==
 * @desc Duration of rotating the ring menu.
 * Default: 4 (Should be an integer)
 * @default 4
 *
 * @param Icon Dist X
 * @parent == Appearance Settings ==
 * @desc Spreading Icons (horizontal)  
 * Default: 16
 * @default 16
 *
 * @param Icon Dist Y
 * @parent == Appearance Settings ==
 * @desc Spreading Icons (vertical) 
 * Default: 12
 * @default 12
 *
 * @param Selected Icon Scale
 * @parent == Appearance Settings ==
 * @desc Modification value of selected icons' zoom scale.
 * Default: 1.5
 * @default 1.5
 * 
 * @param Caption Color
 * @parent == Appearance Settings ==
 * @desc Caption color. Should be a hex color.
 * Default: #000000
 * @default #000000
 * 
 * @param Caption Opacity
 * @parent == Appearance Settings ==
 * @type number
 * @desc Caption opacity.
 * Default: 160
 * @default 160
 * 
 * @param Caption Text Opacity
 * @parent == Appearance Settings ==
 * @type number
 * @desc Opacity of caption text.
 * Default: 255
 * @default 255
 * 
 *
 * @param Caption Width
 * @parent == Appearance Settings ==
 * @desc Width of caption.
 * Default: 200
 * @default 200
 *
 * @param Caption Height
 * @parent == Appearance Settings ==
 * @desc Height of caption.
 * Default: 48
 * @default 48
 *
 * @param Caption Shift X
 * @parent == Appearance Settings ==
 * @desc Modification value of caption's X position.
 * Default: 0
 * @default 0
 *
 * @param Caption Shift Y
 * @parent == Appearance Settings ==
 * @desc Modification value of caption's Y position.
 * Default: -96
 * @default -96
 */

/*~struct~SE:
 * @param name
 * @type file
 * @dir audio/se
 * @require 1
 * @desc Name of SE.
 * @default cancel2
 * 
 * @param volume
 * @type number
 * @max 100
 * @min 0
 * @desc Volume of SE.
 * @default 90
 * 
 * @param pitch
 * @type number
 * @max 150
 * @min 50
 * @desc Pitch of SE.
 * @default 100
 * 
 * @param pan
 * @type number 
 * @max 100
 * @min -100
 * @desc Pan of SE.
 * @default 0
 */
/*~struct~item:
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 176.
 * @default 176
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * @default 0
 */
/*~struct~skill:
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 76.
 * @default 76
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * @default 0
 */
/*~struct~equip:
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 135.
 * @default 135
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * @default 0
 */
/*~struct~status:
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 84.
 * @default 84
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * @default 0
 */
/*~struct~formation:
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 75.
 * @default 75
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * @default 0
 */
/*~struct~options:
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 83.
 * @default 83
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * @default 0
 */

/*~struct~save:
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 225.
 * @default 225
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * @default 0
 */
/*~struct~load:
 * @param Name
 * @desc Caption Text of this command.
 * @default Load
 * 
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 190.
 * @default 190
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * @default 0
 */
/*~struct~mail:
 * @param Name
 * @desc Caption text of this command. 
 * @default Mail
 * 
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. If leave it blank, the icon index will be 192.
 * @default 192
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * 
 * @param Common Event
 * @type common_event
 * @desc This command will run a CE, so you can customize the mailbox to call. CE will be the 4th one if leave the param blank. 
 * @default 4
 */
/*~struct~ce1:
 * @param Name
 * @desc Caption text of this command. 
 * @default
 * 
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. If leave it blank, the icon index will be 0.
 * @default 0
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * 
 * @param Common Event
 * @type common_event
 * @desc This command will run a CE. CE will be the 1st one if leave the param blank. 
 * @default 1
 */
/*~struct~ce2:
 * @param Name
 * @desc Caption text of this command. 
 * @default
 * 
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. If leave it blank, the icon index will be 0.
 * @default 0
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * 
 * @param Common Event
 * @type common_event
 * @desc This command will run a CE. CE will be the 2nd one if leave the param blank. 
 * @default 2
 */
/*~struct~ce3:
 * @param Name
 * @desc Caption text of this command. 
 * @default
 * 
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. If leave it blank, the icon index will be 0.
 * @default 0
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * 
 * @param Common Event
 * @type common_event
 * @desc This command will run a CE. CE will be the 3rd one if leave the param blank. 
 * @default 3
 */
/*~struct~ce:
 * @param Name
 * @desc Caption text of this command. 
 * @default
 * 
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. If leave it blank, the icon index will be 0.
 * @default 0
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * 
 * @param Common Event
 * @type common_event
 * @desc This command will run a CE.
 * @default 0
 */
/*~struct~goldLevelUp:
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 236.
 * @default 236
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 */
/*~struct~gameEnd:
 * @param Icon Index
 * @type number
 * @min 0
 * @desc Icon index for this command. if leave it blank, the icon index will be 82.
 * @default 82
 * 
 * @param Close Switch
 * @type switch
 * @desc If the switch is ON, this command will be hidden. 0 means the command will always appear.
 * @default 0
 */
/*:zh
 * @plugindesc v1.0.1 - 命令轮盘插件 修改版
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
    
    var mailCEId = Number(mail['Common Event']);
    var ce1CEId  = Number(ce1['Common Event']);
    var ce2CEId  = Number(ce2['Common Event']);
    var ce3CEId  = Number(ce3['Common Event']);
    var ce4CEId  = Number(ce4['Common Event']);
    var ce5CEId  = Number(ce5['Common Event']);
    var ce6CEId  = Number(ce6['Common Event']);
    var ce7CEId  = Number(ce7['Common Event']);
    var ce8CEId  = Number(ce8['Common Event']);
    var ce9CEId  = Number(ce9['Common Event']);
    var ce10CEId = Number(ce10['Common Event']);
    var loadName = String(JSON.parse(parameters['Load Command'])['Name']);
    var mailName = String(mail['Name']);
    var ce1Name  = String(ce1['Name']);
    var ce2Name  = String(ce2['Name']);
    var ce3Name  = String(ce3['Name']);
    var ce4Name  = String(ce4['Name']);
    var ce5Name  = String(ce5['Name']);
    var ce6Name  = String(ce6['Name']);
    var ce7Name  = String(ce7['Name']);
    var ce8Name  = String(ce8['Name']);
    var ce9Name  = String(ce9['Name']);
    var ce10Name = String(ce10['Name']);
    
    var iconOpacity          = Number(parameters['Enabled Icon Opacity']);
    var iconOpacityD         = Number(parameters['Disabled Icon Opacity']);
    var rotateDuration       = Number(parameters['Rotate Duration']);
    var iconDistX            = Number(parameters['Icon Dist X']);
    var iconDistY            = Number(parameters['Icon Dist Y']);
    var iconSelectScale      = Number(parameters['Selected Icon Scale']);
    var captionColor         = String(parameters['Caption Color']);
    var captionOpacity       = Number(parameters['Caption Opacity']);
    var captionTextOpacity   = Number(parameters['Caption Text Opacity']);
    var captionWidth         = Number(parameters['Caption Width']);
    var captionHeight        = Number(parameters['Caption Height']);
    var captionShiftX        = Number(parameters['Caption Shift X']);
    var captionShiftY        = Number(parameters['Caption Shift Y']);
    var radiusMax            = 4;  // 如果这不是定值的话貌似会有问题
    function checkSwi(s) {
        if (s) {
            return !$gameSwitches.value(s);
        } else {
            return true;
        }
    }

    // Modified Script (belongs to tomoaky)

  //-----------------------------------------------------------------------------
  // Game_Temp
  //
  
  Game_Temp.prototype.isRingCommandVisible = function() {
    if (this._ringCommandVisible === undefined) {
      this._ringCommandVisible = false;
    }
    return this._ringCommandVisible;
  };
  
  Game_Temp.prototype.setRingCommandVisible = function(flag) {
    this._ringCommandVisible = flag;
  };
  
  Game_Temp.prototype.ringCommandLastIndex = function() {
    if (this._ringCommandLastIndex === undefined) {
      this._ringCommandLastIndex = 0;
    }
    return this._ringCommandLastIndex;
  };
  
  Game_Temp.prototype.setRingCommandLastIndex = function(index) {
    this._ringCommandLastIndex = index;
  };
  
  Game_Temp.prototype.calledByRingCommand = function() {
    if (this._calledByRingCommand === undefined) {
      this._calledByRingCommand = false;
    }
    return this._calledByRingCommand;
  };
  
  Game_Temp.prototype.setCalledByRingCommand = function(flag) {
    this._calledByRingCommand = flag;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Player
  //
  
  var _Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    if ($gameTemp.isRingCommandVisible()) {
      return false;
    }
    return _Game_Player_canMove.call(this);
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_TMRingCommandIcon
  //
  
  function Sprite_TMRingCommandIcon() {
    this.initialize.apply(this, arguments);
  }

  Sprite_TMRingCommandIcon.prototype = Object.create(Sprite.prototype);
  Sprite_TMRingCommandIcon.prototype.constructor = Sprite_TMRingCommandIcon;

  Sprite_TMRingCommandIcon.prototype.initialize = function(name) {
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._commandName = name;
    this.bitmap = ImageManager.loadSystem('IconSet');
    var bx = commandIcon[name] % 16 * Window_Base._iconWidth;
    var by = Math.floor(commandIcon[name] / 16) * Window_Base._iconHeight;
    this.setFrame(bx, by, Window_Base._iconWidth, Window_Base._iconHeight);
    this._targetPosAngle = 0;
    this._posAngle = 0;
  };
  
  Sprite_TMRingCommandIcon.prototype.setIndex = function(index) {
    if (direction == 1) {
      var modi = Math.PI;
    } else if (direction == 2) {   //right(not used)
      var modi = Math.PI/2*3;
    } else if (direction == 3) {   //left(not used)
      var modi = Math.PI/2;
    } else {
      var modi = 0;
    }
    this._targetPosAngle = Math.PI * 2 / this.parent._commandSprites.length * index + modi;
    var r = this._targetPosAngle - this._posAngle;
    r -= Math.floor(r / (Math.PI * 2)) * (Math.PI * 2);
    if (r > Math.PI) {
      r -= Math.PI * 2;
    }
    this._rotationCount = rotateDuration;
    this._va = r / this._rotationCount;
  };

  Sprite_TMRingCommandIcon.prototype.name = function() {
    return this._commandName;
  };
  
  Sprite_TMRingCommandIcon.prototype.isEnabled = function() {
    switch (this._commandName) {
    case 'save':
      return this.isSaveEnabled();
    case 'options':
      return this.isOptionsEnabled();
    case 'load':   // 添加了这里，用于判断是否启用
      return this.isLoadEnabled();
    case 'mail':
      return this.isMailEnabled();  // 增加了JK_MailSystem.js
    case 'gameEnd':
      return this.isGameEndEnabled();
    default:
      return this.areMainCommandsEnabled();
    }
  };
  
  Sprite_TMRingCommandIcon.prototype.areMainCommandsEnabled = function() {
    return $gameParty.exists();
  };

  Sprite_TMRingCommandIcon.prototype.isFormationEnabled = function() {
    return $gameParty.size() >= 2 && $gameSystem.isFormationEnabled();
  };

  Sprite_TMRingCommandIcon.prototype.isOptionsEnabled = function() {
    return true;
  };

  Sprite_TMRingCommandIcon.prototype.isLoadEnabled = function() {   // 这里也要添加（虽然还未参透此处为何只需填写true即可）
    return true;
  };

  Sprite_TMRingCommandIcon.prototype.isMailEnabled = function() {
    return true;   // 增加了JK_MailSystem.js
  }

  Sprite_TMRingCommandIcon.prototype.isSaveEnabled = function() {
    return !DataManager.isEventTest() && $gameSystem.isSaveEnabled();
  };

  Sprite_TMRingCommandIcon.prototype.isGameEndEnabled = function() {
    return true;
  };

  Sprite_TMRingCommandIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._rotationCount > 0) {
      this._posAngle += this._va;
      this._rotationCount--;
      if (this._rotationCount === 0) {
        this._posAngle = this._targetPosAngle;
      }
    }
    var r = this._posAngle + Math.PI / 2;
    this.x = Math.cos(r) * this.parent._commandRadius * iconDistX;
    this.y = Math.sin(r) * this.parent._commandRadius * iconDistY - 24;
    if (direction == 1) {
      var modi = -((this.y + 56) / 256) + 0.75;
    } else if (direction == 2) {
      var modi = (this.y + 56) / 256 + 0.75;
    } else if (direction == 3) {
      var modi = -((this.y) / 256) + 0.75;
    } else {
      var modi = (this.y + 56) / 256 + 0.75;
    }
    var scale = modi;
    if (this.parent.currentCommandName() === this.name()) {
      scale *= iconSelectScale;
    }
    this.scale.set(scale, scale);
    this.opacity = this.isEnabled() ? iconOpacity : iconOpacityD
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_TMRingCommandCaption
  //
  
  function Sprite_TMRingCommandCaption() {
    this.initialize.apply(this, arguments);
  }

  Sprite_TMRingCommandCaption.prototype = Object.create(Sprite.prototype);
  Sprite_TMRingCommandCaption.prototype.constructor = Sprite_TMRingCommandCaption;

  Sprite_TMRingCommandCaption.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.x = captionShiftX;
    this.y = captionShiftY;
    this._commandName = '';
    this.bitmap = new Bitmap(captionWidth, captionHeight);
  };
  
  Sprite_TMRingCommandCaption.prototype.update = function() {
    if (this._commandName !== this.parent.currentCommandName()) {
      this._commandName = this.parent.currentCommandName();
      this.refresh();
    }
  };

  Sprite_TMRingCommandCaption.prototype.refresh = function() {
    this.bitmap.clear();
    this.bitmap.paintOpacity = captionOpacity;
    this.bitmap.fillRect(0, 0, 240, 48, captionColor);
    this.bitmap.paintOpacity = captionTextOpacity;
    if (this._commandName == 'load') {   // 在这里添加了load，可以照猫画虎多写几个else if
      this.bitmap.drawText(loadName, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'mail' && Imported.JKMail && mailON) {
      this.bitmap.drawText(mailName, 0, 0, captionWidth, captionHeight, 'center');   // 增加了JK_MailSystem.js
    }
    if (this._commandName == 'ce1' && ce1ON) {
      this.bitmap.drawText(ce1Name, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'ce2' && ce2ON) {
      this.bitmap.drawText(ce2Name, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'ce3' && ce3ON) {
      this.bitmap.drawText(ce3Name, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'ce4' && ce4ON) {
      this.bitmap.drawText(ce4Name, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'ce5' && ce5ON) {
      this.bitmap.drawText(ce5Name, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'ce6' && ce6ON) {
      this.bitmap.drawText(ce6Name, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'ce7' && ce7ON) {
      this.bitmap.drawText(ce7Name, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'ce8' && ce8ON) {
      this.bitmap.drawText(ce8Name, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'ce9' && ce9ON) {
      this.bitmap.drawText(ce9Name, 0, 0, captionWidth, captionHeight, 'center');
    }
    if (this._commandName == 'ce10' && ce10ON) {
      this.bitmap.drawText(ce10Name, 0, 0, captionWidth, captionHeight, 'center');
    }
      this.bitmap.drawText(TextManager[this._commandName], 0, 0, captionWidth, captionHeight, 'center');
  };

    //-----------------------------------------------------------------------------
  // Sprite_TMRingCommand
  //
  
  function Sprite_TMRingCommand() {
    this.initialize.apply(this, arguments);
  }

  Sprite_TMRingCommand.prototype = Object.create(Sprite.prototype);
  Sprite_TMRingCommand.prototype.constructor = Sprite_TMRingCommand;

  Sprite_TMRingCommand.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._commandIndex = saveLastIndex ? $gameTemp.ringCommandLastIndex() : 0;
    this._commandRadius = 0;
    this.makeCommandList();
    this.makeCaption();
    this.refresh();
  };

  Sprite_TMRingCommand.prototype.makeCommandList = function() {
    this._commandSprites = []
    this.addMainCommands();
    this.addFormationCommand();
    this.addOptionsCommand();
    this.addOriginalCommand();   // 增加了JK_MailSystem.js
    this.addCECommand();   // 自定义公共事件指令
    this.addSaveCommand();
    this.addLoadCommand();   // 注意要添加load方法
    this.addGameEndCommand();
  };
  
  Sprite_TMRingCommand.prototype.currentCommandName = function() {
    return this._commandSprites[this._commandIndex].name();
  };

  Sprite_TMRingCommand.prototype.addMainCommands = function() {
    if (this.needsCommand('item') && checkSwi(itemSwi)) {
      var sprite = new Sprite_TMRingCommandIcon('item');
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
    if (this.needsCommand('skill') && checkSwi(skillSwi)) {
      var sprite = new Sprite_TMRingCommandIcon('skill');
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
    if (this.needsCommand('equip') && checkSwi(equipSwi)) {
      var sprite = new Sprite_TMRingCommandIcon('equip');
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
    if (this.needsCommand('status') && checkSwi(statusSwi)) {
      var sprite = new Sprite_TMRingCommandIcon('status');
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
  };
  
  Sprite_TMRingCommand.prototype.addFormationCommand = function() {
    if (this.needsCommand('formation') && checkSwi(formationSwi)) {
      var sprite = new Sprite_TMRingCommandIcon('formation');
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
  };

  Sprite_TMRingCommand.prototype.addOriginalCommand = function() {
    if (Imported.TMGoldLevelUp && TextManager.goldLevelUp && checkSwi(goldLevelUpSwi) && goldLevelUpON) {
      var sprite = new Sprite_TMRingCommandIcon('goldLevelUp');
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
    if (Imported.JKMail && checkSwi(mailSwi) && mailON) {
      var sprite = new Sprite_TMRingCommandIcon('mail');   // 增加了JK_MailSystem.js
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
  };
  Sprite_TMRingCommand.prototype.addCECommand = function () {
      if (ce1ON && checkSwi(ce1Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce1');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
      if (ce2ON && checkSwi(ce2Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce2');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
      if (ce3ON && checkSwi(ce3Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce3');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
      if (ce4ON && checkSwi(ce4Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce4');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
      if (ce5ON && checkSwi(ce5Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce5');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
      if (ce6ON && checkSwi(ce6Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce6');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
      if (ce7ON && checkSwi(ce7Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce7');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
      if (ce8ON && checkSwi(ce8Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce8');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
      if (ce9ON && checkSwi(ce9Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce9');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
      if (ce10ON && checkSwi(ce10Swi)) {
        var sprite = new Sprite_TMRingCommandIcon('ce10');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
  }
  
  Sprite_TMRingCommand.prototype.addOptionsCommand = function() {
    if (checkSwi(optionsSwi)) {
      var sprite = new Sprite_TMRingCommandIcon('options');
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
  };

  Sprite_TMRingCommand.prototype.addSaveCommand = function() {
    if (this.needsCommand('save') && checkSwi(saveSwi)) {
      var sprite = new Sprite_TMRingCommandIcon('save');
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
  };

// 在这里把load方法写上（照猫画虎就行）
  Sprite_TMRingCommand.prototype.addLoadCommand = function() {
      if (checkSwi(loadSwi)) {
        var sprite = new Sprite_TMRingCommandIcon('load');
        this._commandSprites.push(sprite);
        this.addChild(sprite);
      }
  };

  Sprite_TMRingCommand.prototype.addGameEndCommand = function() {
    if (checkSwi(gameEndSwi)) {
      var sprite = new Sprite_TMRingCommandIcon('gameEnd');
      this._commandSprites.push(sprite);
      this.addChild(sprite);
    }
  };

  Sprite_TMRingCommand.prototype.needsCommand = function(name) {
    var flags = $dataSystem.menuCommands;
    if (flags) {
      switch (name) {
      case 'item':
        return flags[0];
      case 'skill':
        return flags[1];
      case 'equip':
        return flags[2];
      case 'status':
        return flags[3];
      case 'formation':
        return flags[4];
      case 'save':
        return flags[5];
      }
    }
    return true;
  };
  
  Sprite_TMRingCommand.prototype.makeCaption = function() {
    if (useCaption) {
      this._captionSprite = new Sprite_TMRingCommandCaption();
      this.addChild(this._captionSprite);
    }
  };

Sprite_TMRingCommand.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateVisible();
    if ($gameTemp.isRingCommandVisible()) {
      if (this._commandRadius < radiusMax) {    // 把radius相关的数字4改为了6。修改后，图标与玩家的距离将会改变（即轮盘半径会变大）。在之后增加新的指令时建议这样修改。下面（包括这里）一共要修改三处地方。在需要改的那一行会有相关注释。这个重新写的版本用参数radiusMax代替了要修改的数字。
        if (this._commandRadius === 0) {
          if (openResetIndex) {
            this._commandIndex = saveLastIndex ? $gameTemp.ringCommandLastIndex() : 0;
            this.refresh();
          }
          AudioManager.playSe(seOpenCommand);
        }
        if (openGoldWindow && this.parent.parent) {
          var goldWindow = this.parent.parent._messageWindow._goldWindow;
          goldWindow.x = goldWindowX;
          goldWindow.y = goldWindowY;
          goldWindow.open();
        }
        this._commandRadius++;
      }
      this.updateInput();
      if (boundToScreen) {
        this.x = screenX;
        this.y = screenY;        
      } else {
        this.x = $gamePlayer.screenX();
        this.y = $gamePlayer.screenY();
      }
    } else {
      if (this._commandRadius > 0) {
        if (this._commandRadius === radiusMax) {   // 这里radius也要修改成上面设的数字（假如上面写的是<6,这里就要写等于6）。与radius相关的数字除0以外都要统一修改。这个重新写的版本用参数radiusMax代替了要修改的数字。
          if (openGoldWindow) {
            this.parent.parent._messageWindow._goldWindow.close();
          }
          AudioManager.playSe(seCloseCommand);
        }
        this._commandRadius--;
      }
    }
  };
  Sprite_TMRingCommand.prototype.updateVisible = function() {
    if (SceneManager._scene.isBusy() || $gameMap.isEventRunning() ||
        !$gameSystem.isMenuEnabled()) {
      $gameTemp.setRingCommandVisible(false);
    } else if (useEscape) {
    } else {
      $gameTemp.setRingCommandVisible(Input.isPressed('control'));
    }
    this.visible = this._commandRadius > 0;
  };
  
  Sprite_TMRingCommand.prototype.updateInput = function() {
    if (Input.isRepeated('left') || (TouchInput.isRepeated() &&
        TouchInput.x < $gamePlayer.screenX() - 24)) {
      this._commandIndex--
      if (this._commandIndex < 0) {
        this._commandIndex = this._commandSprites.length - 1;
      }
      this.refresh();
      SoundManager.playCursor();
    }
    if (Input.isRepeated('right') || (TouchInput.isRepeated() &&
        TouchInput.x > $gamePlayer.screenX() + 24)) {
      this._commandIndex++;
      if (this._commandIndex >= this._commandSprites.length) {
        this._commandIndex = 0;
      }
      this.refresh();
      SoundManager.playCursor();
    }
    if (Input.isTriggered('ok') || (TouchInput.isTriggered() &&
        TouchInput.x >= $gamePlayer.screenX() - 24 &&
        TouchInput.x <= $gamePlayer.screenX() + 24)) {
      var sprite = this._commandSprites[this._commandIndex];
      if (sprite.isEnabled()) {
        switch (sprite.name()) {
        case 'item':
          $gameTemp.setCalledByRingCommand(true);
          SceneManager.push(Scene_Item);
          break;
        case 'skill':
          $gameTemp.setCalledByRingCommand(true);
          SceneManager.push(Scene_Skill);
          break;
        case 'equip':
          SceneManager.push(Scene_Equip);
          break;
        case 'status':
          $gameTemp.setCalledByRingCommand(true);
          SceneManager.push(Scene_Status);
          break;
        case 'formation':
          SceneManager.push(Scene_RCFormation);
          break;
        case 'options':
          SceneManager.push(Scene_Options);
          break;
        case 'save':
          SceneManager.push(Scene_Save);
          break;
        case 'load':   // 在这里实现最终的呼出界面功能
          SceneManager.push(Scene_Load);
          break;
        case 'mail':   // 增加了JK_MailSystem.js
          $gameTemp.reserveCommonEvent(mailCEId);
          break;
        case 'gameEnd':
          SceneManager.push(Scene_GameEnd);
          break;
        case 'goldLevelUp':
          SceneManager.push(TMParam.Scene_GoldLevelUp);
          break;
        case 'ce1':
          $gameTemp.reserveCommonEvent(ce1CEId);
          break;
        case 'ce2':
          $gameTemp.reserveCommonEvent(ce2CEId);
          break;
        case 'ce3':
          $gameTemp.reserveCommonEvent(ce3CEId);
          break;
        case 'ce4':
          $gameTemp.reserveCommonEvent(ce4CEId);
          break;
        case 'ce5':
          $gameTemp.reserveCommonEvent(ce5CEId);
          break;
        case 'ce6':
          $gameTemp.reserveCommonEvent(ce6CEId);
          break;
        case 'ce7':
          $gameTemp.reserveCommonEvent(ce7CEId);
          break;
        case 'ce8':
          $gameTemp.reserveCommonEvent(ce8CEId);
          break;
        case 'ce9':
          $gameTemp.reserveCommonEvent(ce9CEId);
          break;
        case 'ce10':
          $gameTemp.reserveCommonEvent(ce10CEId);
          break;
        }
        this._commandRadius = 0;
        if (openGoldWindow) {
          this.parent.parent._messageWindow._goldWindow.hide();
        }
        $gameTemp.setRingCommandLastIndex(this._commandIndex);
        $gameTemp.setRingCommandVisible(false);
        SoundManager.playOk();
      } else {
        SoundManager.playBuzzer();
      }
    }
    if (useEscape && this._commandRadius === radiusMax &&
        (Input.isTriggered('menu') || TouchInput.isCancelled())) {   // 这里也要修改，让数字与上方设的相关非零数字一样。这个重新写的版本用参数radiusMax代替了要修改的数字。
      $gameTemp.setRingCommandVisible(false);
    }
  };
  Sprite_TMRingCommand.prototype.refresh = function() {
    for (var i = 0; i < this._commandSprites.length; i++) {
      var sprite = this._commandSprites[i];
      var index = (this._commandIndex - i) % this._commandSprites.length;
      sprite.setIndex(index);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //
  
  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
    this.createRingCommand();
  };

  Spriteset_Map.prototype.createRingCommand = function() {
    this._ringCommand = new Sprite_TMRingCommand();
    this.addChild(this._ringCommand);
  };
  
  //-----------------------------------------------------------------------------
  // Window_MenuActor
  //
  
  var _Window_MenuActor_refresh = Window_MenuActor.prototype.refresh;
  Window_MenuActor.prototype.refresh = function() {
    if (!$gameTemp.calledByRingCommand()) {
      _Window_MenuActor_refresh.call(this);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_SkillStatus
  //
  
  var _Window_SkillStatus_refresh = Window_SkillStatus.prototype.refresh;
  Window_SkillStatus.prototype.refresh = function() {
    if (!$gameTemp.calledByRingCommand()) {
      _Window_SkillStatus_refresh.call(this);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_Status
  //
  
  var _Window_Status_refresh = Window_Status.prototype.refresh;
  Window_Status.prototype.refresh = function() {
    if (!$gameTemp.calledByRingCommand()) {
      _Window_Status_refresh.call(this);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_Message
  //
  
  var _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
  Window_Message.prototype.updatePlacement = function() {
    _Window_Message_updatePlacement.call(this);
    this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //
  
  var _Scene_Item_start = Scene_Item.prototype.start;
  Scene_Item.prototype.start = function() {
    _Scene_Item_start.call(this);
    if ($gameTemp.calledByRingCommand()) {
      $gameTemp.setCalledByRingCommand(false);
      this._actorWindow.refresh();
    }
  }
  
  //-----------------------------------------------------------------------------
  // Scene_Skill
  //
  
  var _Scene_Skill_start = Scene_Skill.prototype.start;
  Scene_Skill.prototype.start = function() {
    _Scene_Skill_start.call(this);
    if ($gameTemp.calledByRingCommand()) {
      $gameTemp.setCalledByRingCommand(false);
      this._actorWindow.refresh();
      this._statusWindow.refresh();
    }
  }
  
  //-----------------------------------------------------------------------------
  // Scene_Status
  //
  
  var _Scene_Status_start = Scene_Status.prototype.start;
  Scene_Status.prototype.start = function() {
    _Scene_Status_start.call(this);
    if ($gameTemp.calledByRingCommand()) {
      $gameTemp.setCalledByRingCommand(false);
      this._statusWindow.refresh();
    }
  }
  
  //-----------------------------------------------------------------------------
  // Scene_Map
  //
  
  var _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
  Scene_Map.prototype.callMenu = function() {
    if (useEscape) {
      $gameTemp.setRingCommandVisible(true);
      this.menuCalling = false;
    } else {
      _Scene_Map_callMenu.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_RCFormation
  //

  function Scene_RCFormation() {
    this.initialize.apply(this, arguments);
  }

  Scene_RCFormation.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_RCFormation.prototype.constructor = Scene_RCFormation;

  Scene_RCFormation.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_RCFormation.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createStatusWindow();
  };

  Scene_RCFormation.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._statusWindow.refresh();
    this._statusWindow.setFormationMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onFormationOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onFormationCancel.bind(this));
  };

  Scene_RCFormation.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_MenuStatus(0, 0);
    this._statusWindow.x = (Graphics.boxWidth - this._statusWindow.width) / 2;
    this.addWindow(this._statusWindow);
  };

  Scene_RCFormation.prototype.onFormationOk = function() {
    var index = this._statusWindow.index();
    var actor = $gameParty.members()[index];
    var pendingIndex = this._statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
      $gameParty.swapOrder(index, pendingIndex);
      this._statusWindow.setPendingIndex(-1);
      this._statusWindow.redrawItem(index);
    } else {
      this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
  };

  Scene_RCFormation.prototype.onFormationCancel = function() {
    if (this._statusWindow.pendingIndex() >= 0) {
      this._statusWindow.setPendingIndex(-1);
      this._statusWindow.activate();
    } else {
      this.popScene();
    }
  };
})();
