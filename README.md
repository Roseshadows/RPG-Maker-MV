我的所有用于 RPG Maker MV 的插件。
<br>
This repository contains all the plugins I made for RPG Maker MV.
<br>
* * *
# 目录
### :notebook:插件列表：
|插件名|插件功能|
|:----:|:-----|
|**[Drill_RSSD_X_PortraitManager.js](./Plugins/Drill_RSSD_X_PortraitManager.js)**|Drill图片类插件的扩展插件。可以用控制字符控制图片的各种行为。需要[Drill_PictureShortcut.js](https://github.com/DrillUp/drill_plugins/blob/main/plugins/Drill_PictureShortcut.js)作前置插件，也可兼容其他一些Drill图片类插件。具体可以去看插件帮助文档。|
|**[FormationSystem_Core.js](./Plugins/FormationSystem_Core.js)**|战斗阵列系统的核心插件。插件引入了前后排的概念，前排会优先于后排受到技能效果的影响，即插即用。详情可看插件帮助。前后排同样影响敌人敌群，可以通过在数据库书写标签来设置。技能默认作用于前排，不过允许将技能设为仅作用于后排或作用于前后排全体的范围。|
|**[RSSD_AutoMessageName.js](./Plugins/RSSD_AutoMessageName.js)**|通过在插件参数中预先设置脸图，可以在显示脸图时绘制脸图与相关联的人物名称。|
|**[RSSD_CEFindIdByName.js](./Plugins/RSSD_CEFindIdByName.js)**|使用脚本调用公共事件时可以输入公共事件名称。|
|**[RSSD_DisableMapAndMessageInput.js](./Plugins/RSSD_DisableMapAndMessageInput.js)**|特定开关打开时，禁用地图玩家移动/消息处理。主要用于图片事件菜单。注意，一定要慎用，否则游戏可能会卡住。|
|**[RSSD_HiddenParams.js](./Plugins/RSSD_HiddenParams.js)**|通过标签为角色/敌人自定义额外的隐藏属性。也可用于RMMZ。属性可绑定在角色、敌人、职业、武器、防具、物品、技能、状态共8种数据库类型，MV工程通过YEP_StatusMenuCore.js还可以将隐藏属性显示出来。|
|**[RSSD_HP_Addon_ParamGrowth.js](./Plugins/RSSD_HP_Addon_ParamGrowth.js)**|[RSSD_HiddenParams.js](./Plugins/RSSD_HiddenParams.js) 的扩展插件。允许开发者设置成长类型，将隐藏属性设为可成长的属性。|
|**[RSSD_HideDestinationSprite.js](./Plugins/RSSD_HideDestinationSprite.js)**|用一个开关来控制目的地光标的显示与隐藏。开关打开，光标隐藏。熟悉了一下update的用法。|
|**[RSSD_MessageWindowSound.js](./Plugins/RSSD_MessageWindowSound.js)**|切换对话时播放一次指定的音效。也可用于MZ。|
|**[SceneDesktop.js](./Plugins/SceneDesktop.js)**|为手机样式菜单提供父类，能够让开发者更便捷地创建手机样式的菜单。|
|**[RSSD_ScenePhone.js](./Plugins/RSSD_ScenePhone.js)**|创造一个智能手机样式的菜单。玩家可以点击APP以进入界面、触发公共事件或运行自定义代码。根据插件的帮助文档，你可以创建多个手机界面。需要 [SceneDesktop.js](./Plugins/SceneDesktop.js) 作为前置插件。|
|**[RSSD_MobilePhone.js](./Plugins/RSSD_MobilePhone.js)**|上一个插件的另一版。在上一个插件的基础上添加了新的功能（手机遮罩），但只能设置一部手机。没有前置插件。|
|**[RSSD_SimplePageableBook.js](./Plugins/RSSD_SimplePageableBook.js)**|创建一个可翻页的书籍界面。也可用于RMMZ。不仅可以提供了纯文本和代码两种方式书写内容，设置翻页音效，也能从多方面控制书籍的样式。安装 SRD_SwiptInput.js 作为前置插件后，还可以用鼠标/手指滑动翻页。|
|**[RSSD_SimpleScrollableInfoBoard.js](./Plugins/RSSD_SimpleScrollableInfoBoard.js)**|事件指令【显示滚动文本】的扩展插件。也可以用于RMMZ。特定开关打开后，滚动文本窗口可用作一个显示长文章的可滚动的信息板。你可以使用鼠标滚轮或上下键来滚动信息，用常规方法关闭信息板。插件还允许你通过设置文本滚动速度来决定信息板背景类型是窗口还是透明。|
|**[RSSD_SSIB_Addon_TouchScroll.js](./Plugins/RSSD_SSIB_Addon_TouchScroll.js)**|[RSSD_SimpleScrollableInfoBoard.js](./Plugins/RSSD_SimpleScrollableInfoBoard.js) 的扩展插件。也可以用于RMMZ。安装后，长信息板可以通过手指或鼠标滑动来滚动。|
|**[RSSD_SwapTitleBackground.js](./Plugins/RSSD_SwapTitleBackground.js)**|允许你在标题界面中动态切换多个背景图片。|
|**[RSSD_VXFacesets.js](./Plugins/RSSD_VXFacesets.js)**|允许你调整脸图的大小和在窗口中的偏移位置。|
|**[RSSD_VarSwiFindIdByName.js](./Plugins/RSSD_VarSwiFindIdByName.js)**|使用脚本获取或控制开关/变量时可以输入开关/变量名称。|
|**[StopScrollTextProcess.js](./Plugins/StopScrollTextProcess.js)**|按住向下键时可以停止滚动文本。如果你在使用 [RSSD_SimpleScrollableInfoBoard.js](./Plugins/RSSD_SimpleScrollableInfoBoard.js) ，则将该插件放到靠上的位置。|
|**[TAA_BookMenu_UnreadBookTitle.js](./Plugins/TAA_BookMenu_UnreadBookTitle.js)**|[TAA_BookMenu.js](https://taaspider.itch.io) 的扩展插件。在未习得书籍时，书籍菜单列表中待阅书籍的名字和内容会隐藏。可以自定义书籍未习得时显示的名称和内容文本。|
|**[TMRingCommand_Upgraded.js](./Plugins/TMRingCommand_Upgraded.js)**|在tomoaky的 [TMRingCommand.js](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMRingCommand.js) 插件的基础上修改的新一版的插件。原来的插件具有局限性，指令是固定的。但在修改版的插件中，可以用开关来控制各个指令的显示与隐藏；可以添加最多十个公共事件到轮盘中；轮盘不仅能绑定到玩家身上，还可以绑定在屏幕上；在外观设置这一栏里添加了一些更细节的设置，等等。|
|**[TMXpCharacter_Patch.js](./Plugins/TMXpCharacter_Patch.js)**|[TMXpCharacter.js](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMXpCharacter.js) 的补丁插件。修复了以下问题：1. XP行走图初始帧显示了错误的图像；2. 在窗口中不正确绘制了XP行走图。|
|**[UditaUI.js](./Plugins/UditaUI.js)**|允许你在 RMMV 中使用 Wolf RPG Editor 格式的窗口皮肤、对话暂停光标和选择光标。对于示例图，去看 [img/UditaUI](./Plugins/img/UditaUI/) 。|
### :notebook:使用条款：
- MIT 协议
