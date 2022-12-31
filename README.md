- [目录](#目录)
- [Contents](#Contents)
* * *
# 目录
### :notebook:文件列表：（JSON/HTML/其他文件备份）
- （暂无）
### :notebook:插件列表：
|插件名|插件功能|
|:----:|:-----|
|**[RSSD_HideDestinationSprite.js](./Plugins/RSSD_HideDestinationSprite.js)**|用一个开关来控制目的地光标的显示与隐藏。开关打开，光标隐藏。熟悉了一下update的用法。|
|**[SceneDesktop.js](./Plugins/SceneDesktop.js)**|为手机样式菜单提供父类，能够让开发者更便捷地创建手机样式的菜单。|
|**[RSSD_ScenePhone.js](./Plugins/RSSD_ScenePhone.js)**|创造一个智能手机样式的菜单。玩家可以点击APP以进入界面、触发公共事件或运行自定义代码。根据插件的帮助文档，你可以创建多个手机界面。需要[SceneDesktop.js](./Plugins/SceneDesktop.js)作为前置插件。|
|**[TMRingCommand_Upgraded.js](./Plugins/TMRingCommand_Upgraded.js)**|在tomoaky的TMRingCommand.js插件的基础上修改的新一版的插件。原来的插件具有局限性，指令是固定的。但在修改版的插件中，可以用开关来控制各个指令的显示与隐藏；可以添加最多十个公共事件到轮盘中；轮盘不仅仅只能绑定到玩家身上，还可以绑定在屏幕上；在外观设置这一栏里添加了一些更细节的设置，等等。[原插件链接](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMRingCommand.js)|
### :notebook:代码列表：
|代码名|代码功能|
|:----:|:-----|
|**ComputerScene.js**|简单创建一个电脑桌面样式的界面。它不是个插件，因为所有的参数都得在脚本内部自行修改。界面关键字是Scene_Test。如果想测试，不用做任何调整，将此代码作为插件直接在一个新工程中安装好，随后在游戏中调用脚本SceneManager.push(Scene_Test);即可。相关插件已经发布了！去看看 SceneDesktop.js 和 RSSD_ScenePhone.js 吧。|
### :notebook:使用条款：
- 以插件帮助文档内写的的使用条款为准。少部分插件遵循MIT协议，大多数插件则遵循以下条款：
> 免费用于商业与非商业工程。允许二次转发及修改。
>
> 不强制署名，但不要声明该插件是除 Rose_shadows | 离影玫 | OrchidBones | 兰骨 以外的人所写的。
* * *
# Contents
### :notebook:Files List: (used for tracing JSON/HTML/other files on their usage)
- (None so far)

### :notebook:Plugin List: (used for tracing plugins on their functions)
|Name|Functions|
|:----:|:-----|
|**[RSSD_HideDestinationSprite.js](./Plugins/RSSD_HideDestinationSprite.js)**|Use a switch to control when to show or hide the destination sprite. When the specific switch is ON, the sprite will be hidden.|
|**[SceneDesktop.js](./Plugins/SceneDesktop.js)**|Provides super class for phone-like scenes，allowing developers to create custom phone-like scenes more conveniently.|
|**[RSSD_ScenePhone.js](./Plugins/RSSD_ScenePhone.js)**|This plugin allows you to create a phone-like scene. The player can enter scenes, trigger common events and run custom codes by clicking APPs. You can create multiple phone scenes following the instructions written in the help file. Needs the plugin [SceneDesktop.js](./Plugins/SceneDesktop.js).|
|**[TMRingCommand_Upgraded.js](./Plugins/TMRingCommand_Upgraded.js)**|I modified tomoaky's TMRingCommand.js, which was released under MIT license, to make it meet my needs. In this upgraded plugin, not only can you use switches to control when to hide / show commands respectively, but up to 10 common events can also be added to the ring menu as commands. Besides you are now able to customize the object (player/screen) which the ring menu is bound to. More settings are added to the param list as well. [Link to original plugin](https://github.com/munokura/tomoaky-MV-plugins/blob/master/TMRingCommand.js)|

### :notebook:Codes List: (used for tracing codes on their functions)
|Name|Functions|
|:----:|:-----|
|**ComputerScene.js**|Creates a scene which looks like computer's desktop. This is not a plugin. You need to modify the script yourself following the instructions inside. However, you can test the script as a plugin in a new project without any adjustment. To test it, you can just make a script call: SceneManager.push(Scene_Test); The corresponding plugins have been released! Check the plugins SceneDesktop.js and RSSD_ScenePhone.js above.)|
### :notebook:Terms of Use
- Most of plugins are released under following license:
> Free to be used in both commercial and non-commercial projects.
>
> You can also modify or redistribute this plugin, as long as you do not claim this plugin belongs to anyone except me, Rose_shadows | 离影玫 | OrchidBones | 兰骨. 
>
> Credits are appreciated, but not required.
<br>
Other plugins are released under MIT License.
For exact ToU, please check the plugin's help file.

<!---
Roseshadows/Roseshadows is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->
