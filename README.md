我的所有用于 RPG Maker MV 的插件。
<br>
This repository contains all the plugins I made for RPG Maker MV.
<br>
- [目录](#目录)
- [Contents](#Contents)
* * *
# 目录
### :notebook:插件列表：
|插件名|插件功能|
|:----:|:-----|
|**[Drill_RSSD_X_PortraitManager.js](./Plugins/Drill_RSSD_X_PortraitManager.js)**|Drill图片类插件的扩展插件。可以用控制字符控制图片的各种行为。需要[Drill_PictureShortcut.js](https://github.com/DrillUp/drill_plugins/blob/main/plugins/Drill_PictureShortcut.js)作前置插件，也可兼容其他一些Drill图片类插件。具体可以去看插件帮助文档。|
|**[RSSD_CEFindIdByName.js](./Plugins/RSSD_CEFindIdByName.js)**|使用脚本调用公共事件时可以输入公共事件名称。|
|**[RSSD_DisableMapAndMessageInput.js](./Plugins/RSSD_DisableMapAndMessageInput.js)**|特定开关打开时，禁用地图玩家移动/消息处理。主要用于图片事件菜单。注意，一定要慎用，否则游戏可能会卡住。|
|**[RSSD_HiddenParams.js](./Plugins/RSSD_HiddenParams.js)**|通过标签为角色/敌人自定义额外的隐藏属性。属性可绑定在角色、敌人、职业、武器、防具、物品、技能、状态共8种数据库类型，MV工程通过YEP_StatusMenuCore.js还可以将隐藏属性显示出来。|
|**[RSSD_HideDestinationSprite.js](./Plugins/RSSD_HideDestinationSprite.js)**|用一个开关来控制目的地光标的显示与隐藏。开关打开，光标隐藏。熟悉了一下update的用法。|
|**[RSSD_MessageWindowSound.js](./Plugins/RSSD_MessageWindowSound.js)**|切换对话时播放一次指定的音效。也可用于MZ。|
|**[SceneDesktop.js](./Plugins/SceneDesktop.js)**|为手机样式菜单提供父类，能够让开发者更便捷地创建手机样式的菜单。|
|**[ScenePhonesAndComputers.js](./Plugins/ScenePhonesAndComputers.js)**|SceneDesktop.js 的一个使用实例。|
|**[RSSD_ScenePhone.js](./Plugins/RSSD_ScenePhone.js)**|创造一个智能手机样式的菜单。玩家可以点击APP以进入界面、触发公共事件或运行自定义代码。根据插件的帮助文档，你可以创建多个手机界面。需要 [SceneDesktop.js](./Plugins/SceneDesktop.js) 作为前置插件。|
|**[RSSD_SimpleScrollableInfoBoard.js](./Plugins/RSSD_SimpleScrollableInfoBoard.js)**|事件指令【显示滚动文本】的扩展插件。也可以用于RMMZ。特定开关打开后，滚动文本窗口可用作一个显示长文章的可滚动的信息板。你可以使用鼠标滚轮或上下键来滚动信息，用常规方法关闭信息板。插件还允许你通过设置文本滚动速度来决定信息板背景类型是窗口还是透明。|
|**[RSSD_SSIB_Addon_TouchScroll.js](./Plugins/RSSD_SSIB_Addon_TouchScroll.js)**|[RSSD_SimpleScrollableInfoBoard.js](./Plugins/RSSD_SimpleScrollableInfoBoard.js) 的扩展插件。也可以用于RMMZ。安装后，长信息板可以通过手指或鼠标滑动来滚动。|
|**[RSSD_SwapTitleBackground.js](./Plugins/RSSD_SwapTitleBackground.js)**|允许你在标题界面中动态切换多个背景图片。|
|**[RSSD_VXFacesets.js](./Plugins/RSSD_VXFacesets.js)**|允许你调整脸图的大小和在窗口中的偏移位置。|
|**[RSSD_VarSwiFindIdByName.js](./Plugins/RSSD_VarSwiFindIdByName.js)**|使用脚本获取或控制开关/变量时可以输入开关/变量名称。|
|**[SimpleSplashScreen.js](./Plugins/SimpleSplashScreen.js)**|功能和 MadeWithMV.js 相似。是练手作。|
|**[StopScrollTextProcess.js](./Plugins/StopScrollTextProcess.js)**|按住向下键时可以停止滚动文本。如果你在使用 [RSSD_SimpleScrollableInfoBoard.js](./Plugins/RSSD_SimpleScrollableInfoBoard.js) ，则将该插件放到靠上的位置。|
|**[TAA_BookMenu_UnreadBookTitle.js](./Plugins/TAA_BookMenu_UnreadBookTitle.js)**|[TAA_BookMenu.js](https://taaspider.itch.io) 的扩展插件。在未习得书籍时，书籍菜单列表中待阅书籍的名字和内容会隐藏。|
|**[TMRingCommand_Upgraded.js](./Plugins/TMRingCommand_Upgraded.js)**|在tomoaky的 [TMRingCommand.js](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMRingCommand.js) 插件的基础上修改的新一版的插件。原来的插件具有局限性，指令是固定的。但在修改版的插件中，可以用开关来控制各个指令的显示与隐藏；可以添加最多十个公共事件到轮盘中；轮盘不仅仅只能绑定到玩家身上，还可以绑定在屏幕上；在外观设置这一栏里添加了一些更细节的设置，等等。|
|**[TMXpCharacter_Patch.js](./Plugins/TMXpCharacter_Patch.js)**|[TMXpCharacter.js](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMXpCharacter.js) 的补丁插件。修复了以下问题：1. XP行走图初始帧显示了错误的图像；2. 在窗口中不正确绘制了XP行走图。|
|**[UditaUI.js](./Plugins/UditaUI.js)**|允许你在 RMMV 中使用 Wolf RPG Editor 格式的窗口皮肤、对话暂停光标和选择光标。对于示例图，去看 [img/UditaUI](./Plugins/img/UditaUI/) 。|
### :notebook:使用条款：
- MIT 协议
* * *
# Contents
### :notebook:Plugin List: (used for tracing plugins on their functions)
Note that currently most of these plugins are in Chinese.
|Name|Functions|
|:----:|:-----|
|**[Drill_RSSD_X_PortraitManager.js](./Plugins/Drill_RSSD_X_PortraitManager.js)**|Allows you to use escape codes to control picutres. Needs [Drill_PictureShortcut.js](https://github.com/DrillUp/drill_plugins/blob/main/plugins/Drill_PictureShortcut.js). It's also compatible with other drill plugins in picture series. With this plugin, you can conveniently show/hide pictures, focus on certain pictures, change pictures' tones, priorities, anchors, positions, etc. Along with other compatible plugins, you can even set pictures' fade-in/fade-out/continued effects, or apply filters to pictures.|
|**[RSSD_CEFindIdByName.js](./Plugins/RSSD_CEFindIdByName.js)**|When calling common events via scripts, you can use common event name instead of id. It's invalid for corresponding event command.|
|**[RSSD_DisbaleMapAndMessageInput.js](./Plugins/RSSD_DisableMapAndMessageInput.js)**|When the specific switches is ON, invalidate the input for player's movement and message process. Used for menu created with events and pictures. Warning: This may freeze the game process, so the functions must be used carefully.|
|**[RSSD_HiddenParams.js](./Plugins/RSSD_HiddenParams.js)**|Allows you to customize extra parameters for actors/enemies using notetags. Parameters can be set in note boxs of various types of database objects, including Actor, Enemy, Class, Weapon, Armor, Item, Skill and State. If you are using MV, you can also display the custom params by YEP_StatusMenuCore.js.|
|**[RSSD_HideDestinationSprite.js](./Plugins/RSSD_HideDestinationSprite.js)**|Use a switch to control when to show or hide the destination sprite. When the specific switch is ON, the sprite will be hidden.|
|**[RSSD_MessageWindowSound.js](./Plugins/RSSD_MessageWindowSound.js)**|Plays a specific SE the moment the message goes to a new page. Can also be used in MZ.|
|**[SceneDesktop.js](./Plugins/SceneDesktop.js)**|Provides super class for phone-like scenes，allowing developers to create custom phone-like scenes more conveniently.|
|**[ScenePhonesAndComputers.js](./Plugins/ScenePhonesAndComputers.js)**|An instance of SceneDesktop.js.|
|**[RSSD_ScenePhone.js](./Plugins/RSSD_ScenePhone.js)**|This plugin allows you to create a phone-like scene. The player can enter scenes, trigger common events and run custom codes by clicking APPs. You can create multiple phone scenes following the instructions written in the help file. Needs the plugin [SceneDesktop.js](./Plugins/SceneDesktop.js).|
|**[RSSD_SimpleScrollableInfoBoard.js](./Plugins/RSSD_SimpleScrollableInfoBoard.js)**|This plugin extends the function of the event command 'Show Scroll Text'. When the specific switch is ON, the scroll text window can be used as a scrollable board to show long text. You can use mouse wheel or press up/down key to apply scroll effect, and exit board in the normal way. You can also config background type to window or transparent by setting message scroll speed. The plugin can also be used in RMMZ.|
|**[RSSD_SSIB_Addon_TouchScroll.js](./Plugins/RSSD_SSIB_Addon_TouchScroll.js)**|An addon for [RSSD_SimpleScrollableInfoBoard.js](./Plugins/RSSD_SimpleScrollableInfoBoard.js). Can also be used in MZ. Allows you to scroll the info board by swipe.|
|**[RSSD_SwapTitleBackground.js](./Plugins/RSSD_SwapTitleBackground.js)**|Allows you to switch multiple title backgrounds dynamically in the title scene.|
|**[RSSD_VXFacesets.js](./Plugins/RSSD_VXFacesets.js)**|Allows you to adjust facesets' sizes and offsets. Mainly used for using vx-sized facesets in mv.|
|**[RSSD_VarSwiFindIdByName.js](./Plugins/RSSD_VarSwiFindIdByName.js)**|When getting or setting switches'/variables' values via scripts, you can use switches' / variables' names instead of ids. It's invalid for corresponding event commands.|
|**[SimpleSplashScreen.js](./Plugins/SimpleSplashScreen.js)**|The function is similar to MadeWithMV.js. Just a practice.|
|**[StopScrollTextProcess.js](./Plugins/StopScrollTextProcess.js)**|Holding down key can stop scrolling text. If you are using [RSSD_SimpleScrollableInfoBoard.js](./Plugins/RSSD_SimpleScrollableInfoBoard.js) , place it below this plugin.|
|**[TAA_BookMenu_UnreadBookTitle.js](./Plugins/TAA_BookMenu_UnreadBookTitle.js)**|An addon for [TAA_BookMenu.js](https://taaspider.itch.io). If the book remains unlearned, the book's name and contents in book menu list will be hidden.|
|**[TMRingCommand_Upgraded.js](./Plugins/TMRingCommand_Upgraded.js)**|I modified tomoaky's [TMRingCommand.js](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMRingCommand.js), which was released under MIT license, to make it meet my needs. In this upgraded plugin, not only can you use switches to control when to hide / show commands respectively, but up to 10 common events can also be added to the ring menu as commands. Besides you are now able to customize the object (player/screen) which the ring menu is bound to. More settings are added to the param list as well. |
|**[TMXpCharacter_Patch.js](./Plugins/TMXpCharacter_Patch.js)**|A patch for [TMXpCharacter.js](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMXpCharacter.js). Fix the bug that character pattern is initially 1 (which should be 0) and other minor bugs.|
|**[UditaUI.js](./Plugins/UditaUI.js)**|Allows you to use Wolf RPG Editor formatted windowskin, pause sign and cursor in RMMV. See [img/UditaUI](./Plugins/img/UditaUI/) for example images.|
### :notebook:Terms of Use
- All the plugins are released under MIT License.

Other plugins are released under the MIT License.
For exact Terms of Use, please check the plugin's help file.

<!---
Roseshadows/Roseshadows is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->
