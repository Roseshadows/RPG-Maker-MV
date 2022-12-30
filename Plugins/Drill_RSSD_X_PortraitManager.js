//==================================================================
// Drill_RSSD_X_PortraitManager.js
//==================================================================
/*:
 * @plugindesc [v1.0]        图片 - 立绘管理器[扩展]
 * @author 离影玫 | Rose_shadows
 * @help
 * =============================================================================
 * +++ Drill_RSSD_X_PortraitManager +++
 * 作者：离影玫 | Rose_shadows
 * 基础插件(Drill_PictureShortcut.js)作者：Drill_up
 * 如果你有兴趣，也可以来看看更多Drill_up大佬写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * https://github.com/drillup/drill_plugins
 * =============================================================================
 * 使得你可以在对话框中用窗口字符控制图片的各种基本/高级操作，更轻松地
 * 实现立绘效果。
 * ★★必须基于 图片-快捷操作 插件★★
 *
 * -----------------------------------------------------------------------------
 * ----具体功能一览
 * 使用该插件，你可以在对话框中做到：
 * - 显示/消除图片
 * - 更改图片图像
 * - 初始化图片设置
 * - 更改图片色调
 * - 聚焦图片
 * - 使用插件指令/脚本代码
 * - 移动图片
 * - 更改图片层级 (对话框上方或下方)
 * - 更改图片锚点
 * - 更改图片属性
 * - 使用图片显现效果 (需要 Drill_PictureFadeInEffect.js)
 * - 使用图片消失效果 (需要 Drill_PictureFadeOutEffect.js)
 * - 使用图片持续效果 (需要 Drill_PictureContinuedEffect.js)
 * - 开启图片滤镜效果 (需要 Drill_PictureFilter.js)
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于其他核心插件才能运行，并兼容其它一些图片相关的Drill插件。
 * 基于：
 *   - Drill_PictureShortcut            图片-快捷操作★★v1.4及以上★★
 * 可被扩展：
 *   - YEP_MessageCore.js               核心-消息核心
 *   - Drill_PictureContinuedEffect     图片-图片持续动作效果
 *   - Drill_PictureFadeInEffect        图片-显现动作效果
 *   - Drill_PictureFadeOutEffect       图片-消失动作效果
 *   - Drill_PictureFilter              图片-滤镜效果
 *   ……
 * 目前无法兼容：
 *   - Drill_CoreOfWindowCharacter      窗口字符 - 窗口字符核心
 *     不兼容自动换行，且窗口字符控制图片的流程会在文本显示前一次性全部
 *     执行一遍，是个未知Bug。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于rmmv图片。仅对对话窗口有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 3.该插件的窗口字符较多，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 4.建议先去看看Drill_PictureShortcut.js中的设定注意事项。
 * 
 * 窗口字符参数“图片ID”：
 *   (1.图片ID不仅仅局限于一个。
 *       - 如果你想批量处理图片，就用&将所有图片ID连起来。注意不要加空格。
 *         例如：5&6&10, 代表处理ID分别为5,6和10的三张图片。
 *       - 如果你想处理编号为特定变量值的图片，就在相应变量ID前面添加字母
 *         'v'。
 *         例如：v7, 代表处理ID为变量#7的值的图片。
 *      你也可以将上述两种格式混着写，例如 5&6&v7&10 。
 * 
 * 窗口字符参数“是否等待”：
 *   (1.一些窗口字符中有“是否等待”参数。
 *      在参数位置上填 true 或 false 。默认为 false 。
 *      若为 true ，则表示会等待操作全部执行完毕后才继续处理后面的窗口文
 *      本。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 
 * 窗口字符：\PMS[图片ID,图片名称,原点,x,y,缩放x,缩放y,不透明度,混合模式]
 *             - 图片ID为必填项，其他为选填项。
 * 
 * 1.如果你在使用这个窗口字符前没有预加载相关图片资源，那么必须在该字符
 *   后面手动添加等待字符 \.或\| 以等待图片资源加载完毕。否则如果在未加
 *   载完毕时操作图片，会出现“图片还未创建”的错误。
 *   你也可以在Drill_PictureShortcut.js中设置预加载资源，或使用\PMN字符(下
 *   记)提前预加载资源。这样就不必添加等待字符了。
 * 2.原点：0 - 锚点在左上角；1 - 锚点在正中央。
 * 3.缩放x/y：指相较原图像放大或缩小的百分比。默认为100.
 * 4.不透明度：0 ~ 255 的一个数字。数字越大，越不透明。默认255.
 * 5.混合模式：0 - 正常；1 - 叠加；2 - 正片叠底；3 - 滤色。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 消除图片
 * 
 * 窗口字符：\PME[图片ID]
 * 
 * 1.消除图片实质上是将图片不透明度瞬间设为0的过程。所以你可以用\PMFI字
 *   符(下记)将图片再次显示出来，前提是你已经用\PMS字符或【显示图片】指
 *   令显示过特定ID的图片。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 更改图片图像
 * 
 * 窗口字符：\PMC[图片ID,新图像名称]
 * 
 * 1.如果你在使用这个窗口字符前没有预加载相关图片资源，那么必须在该字符
 *   后面手动添加等待字符 \.或\| 以等待图片资源加载完毕。否则如果在未
 *   加载完毕时操作图片，图像会闪烁一次。
 *   你也可以在Drill_PictureShortcut.js中设置预加载资源，或使用\PMN字符(下
 *   记)载资源。这样就不必添加等待字符了。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 初始化图片设置
 * 
 * 窗口字符：\PMI[图片ID]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 更改图片色调
 * 
 * 窗口字符：\PMT[图片ID,r_g_b_a或色调预设名,时长,是否等待]
 *             - 图片ID是必填项，其他为选填项。
 * 
 * 1.r_g_b_a或色调预设名：对于色调，你既可以设置rgba值，也可以设置预设名。
 *    - 如果你想设置rgba值，请用_连接4个参数值，例如：-68_-68_-68_0。注意，
 *      不要加空格。
 *    - 如果你想设置色调预设名，一共有12种预设名供你使用：
 *      黑暗，茶色，纯白，纯黑，清晨，黄昏，夜晚，白光，雕像，受伤，待机，
 *      正常。
 *   如果不写该参数，默认是正常，即(0,0,0,0)。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 聚焦图片
 * 
 * 窗口字符：\PMF[所有被认定为立绘的图片的ID,聚焦立绘的图片ID,待机r_g_b_a或色调预设名,聚焦r_g_b_a或色调名称,时长,是否等待]
 *             - 所有被认定为立绘的图片的ID和聚焦立绘的图片ID是必填项，
 *               其他为选填项。
 * 
 * 1.在第一次设置所有被认定为立绘的图片的ID之后，如果所有被认定为立绘的
 *   图片的ID并没有改变，你可以用词语“不变”或单词"default"或字母"d"来代替
 *   上一次设置的所有被认定为立绘的图片的ID。
 *   例如：\PMF[1&2&3,1]   - 在图片#1,图片#2,图片#3中聚焦图片#1（将图片#1
 *                          设为正常色调），
 *                          其他两张图片设为默认待机色调。
 *         \PMF[d,2&3]    - 延续上述设定，在图片#1，图片#2，图片#3中聚焦图片，
 *                          但这次聚焦的是图片#2和图片#3，图片#1为默认待机
 *                          色调。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 扩展操作
 * 
 * 窗口字符：\PMPC[插件指令]
 * 窗口字符：\PMEV[代码]
 * 
 * 1.以上两种窗口字符目的是为了兼容来自其他用于图片的插件的功能。
 *   如果你调用其他与图片无关的插件指令或代码，那么有可能会出现Bug。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 图片移动
 * 
 * 窗口字符：\PMM[图片ID,移动类型,x,y,时长,是否等待]
 * 
 * 1.移动类型共有4种：相对增减速(或rsm)、增减速(或sm)、相对弹性(或rem)、
 *   弹性(或em).
 *   若为 相对增减速 或 相对弹性，x、y就写相对偏移量。
 *   若为 增减速 或 弹性，x、y就写目标横纵坐标值。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 更改图片层级
 * 
 * 窗口字符：\PMP[图片ID,层级]
 * 
 * 1.层级：0 - 图片层，1 - 最顶层(对话框上方)。默认为 0 。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 更改图片锚点
 * 
 * 窗口字符：\PMA[图片ID,锚点x,锚点y,是否保持原位]
 * 
 * 1.锚点x/y部分填 0 ~ 1 的一个小数。(0,0)在图片左上角，(0.5,0.5)在图片正中
 *   央。
 * 2.“是否保持原位”参数填 true 或 false 。默认是 false 。
 *   若为 true ，则在改变锚点时不改变图片的位置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 更改图片属性
 * 
 * 窗口字符：\PMN[图片ID,参数类型,参数值,时长,是否等待]
 *             - 图片ID,参数类型,参数值为必填项，其他为选填项。
 * 
 * 1.参数类型共18种：预加载资源(或pl)、混合模式(或bm)；x坐标(或x)、y坐标
 *   (或y)、不透明度(或o)、旋转(或a)、缩放x(或scx)、缩放y(或scy)、斜切x
 *   (或skx)、斜切y(或sky)；相对x坐标(或rx)、相对y坐标(或ry)、相对不透明度
 *   (或ro)、相对旋转(或ra)、相对缩放x(或rscx)、相对缩放y(或rscy)、相对
 *   斜切x(或rskx)、相对斜切y(或rsky)。
 *   若要了解更多信息，请去查阅 Drill_PictureShortcut.js 。
 *   当为预加载资源(或pl)、混合模式(或bm)时，“时长”和“是否等待”参数无效。
 * 2.所有"相对"参数都可以填正数，比如 10 ，也可以填负数，比如 -10。
 *   表示根据当前属性，进行适当的增减变化。
 * 3."缩放"默认为 1.0， 表示 100% 缩放程度。
 *   "斜切"默认为 0.0。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 使用图片显现效果 (需要 Drill_PictureFadeInEffect.js )
 * 
 * 窗口字符：\PMFI[图片ID,淡入类型名称,各,项,参,数,是否等待]
 *             - 图片ID,淡入类型名称,各,项,参,数为必填项，其他为选填项。
 * 
 * 1.淡入类型共12种：直接显现，移动显现，标准落下，标准弹跳，横向冒出，
 *   横向冒出(不透明)，纵向冒出，纵向冒出(不透明)，放大出现，
 *   放大出现(不透明)，弹性放大出现，弹性放大出现(不透明)。
 *   若要了解更多信息，请去查阅 Drill_PictureFadeInEffect.js 。
 * 2.你必须将淡入类型的所有参数按相关插件指令中的顺序全部写上。
 *   例如：
 *     插件指令：>显现动作 : 图片[1] : 标准弹跳 : 时间[60] : 高度[500]
 *   等同于：
 *     窗口字符：\PMFI[1,标准弹跳,60,500]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 立即停止图片显现 (需要 Drill_PictureFadeInEffect.js )
 * 
 * 窗口字符：\PMSFI[图片ID]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 使用图片消失效果 (需要 Drill_PictureFadeOutEffect.js )
 * 
 * 窗口字符：\PMFO[图片ID,淡出类型名称,各,项,参,数,是否等待]
 *             - 图片ID,淡出类型名称,各,项,参,数为必填项，其他为选填项。
 * 
 * 1.淡出类型共14种：直接消失，移动消失，标准升起，标准弹跳，横向挤扁，
 *   横向挤扁(不透明)，纵向挤扁，纵向挤扁(不透明)，缩小消失，
 *   缩小消失(不透明)，弹性缩小消失，弹性缩小消失(不透明)，向左炸飞，
 *   向右炸飞。
 *   若要了解更多信息，请去查阅 Drill_PictureFadeOutEffect.js 。
 * 2.你必须将淡出类型的所有参数按相关插件指令中的顺序全部写上。
 *   例如：
 *     插件指令：>消失动作 : 图片[1] : 标准弹跳 : 时间[60] : 高度[500]
 *   等同于：
 *     窗口字符：\PMFO[1,标准弹跳,60,500]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 立即停止图片消失 (需要 Drill_PictureFadeOutEffect.js )
 * 
 * 窗口字符：\PMSFO[图片ID]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 设置图片持续动作 (需要 Drill_PictureContinuedEffect.js )
 * 
 * 窗口字符：\PMAC[图片ID,持续动作类型,各,项,参,数,是否等待]
 *             - 图片ID,持续动作类型,各,项,参,数为必填项，其他为选填项。
 * 
 * 1.持续动作类型共26种：标准闪烁，渐变闪烁，顺时针旋转，逆时针旋转，
 *   垂直卡片旋转，水平卡片旋转，上下震动(或上下振动)，左右震动(或
 *   左右振动)，左右摇晃，钟摆摇晃，锚点摇晃，呼吸效果，原地小跳，
 *   反复缩放，空中飘浮(或空中漂浮)，旋转状态，缩放状态，
 *   顺时针旋转(渐变)，逆时针旋转(渐变)，垂直卡片旋转(渐变)，
 *   水平卡片旋转(渐变)，上下震动(渐变)(或上下振动(渐变))，
 *   左右震动(渐变)(或左右振动(渐变))，左右摇晃(渐变)，钟摆摇晃(渐变)，
 *   锚点摇晃(渐变)。
 *   若要了解更多信息，请去查阅 Drill_PictureContinuedEffect.js 的
 *   激活条件。
 * 2.你必须将持续动作类型的所有参数按相关插件指令中的顺序全部写上。
 *   例如：
 *     插件指令：>持续动作 : 图片[1] : 标准闪烁 : 持续时间[60] : 周期[30]
 *   等同于：
 *     窗口字符：\PMAC[1,标准闪烁,60,30]
 * 3.和 Drill_PictureContinuedEffect.js 中插件指令的设定一样，
 *   你可以将动作的持续时间设为"无限"或"oo"(两个字母o)，
 *   表示该动作会永远持续下去。
 *   例如：\PMAC[1,标准闪烁,oo,30] 或 \PMAC[1,标准闪烁,无限,30]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 停止持续动作 (需要 Drill_PictureContinuedEffect.js )
 * 
 * 窗口字符：\PMSC[图片ID,持续动作类型]
 *             - 图片ID为必填项，其他为选填项。
 * 
 * 1.持续类型共12种：空中飘浮，旋转状态，缩放状态，顺时针旋转(渐变)，
 *   逆时针旋转(渐变)，垂直卡片旋转(渐变)，水平卡片旋转(渐变)，
 *   上下震动(渐变)，左右震动(渐变)，左右摇晃(渐变)，钟摆摇晃(渐变)，
 *   左右摇晃(渐变)。
 *   若要了解更多信息，请去查阅 Drill_PictureContinuedEffect.js 的
 *   可选设定 - 结束动作。
 * 2.如果只写了图片ID，则会直接终止所有动作，立即复原。
 *   如果同时写了图片ID和持续动作类型，则表示缓冲结束特定的动作。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 开启图片滤镜效果 (需要 Drill_PictureFilter.js )
 * 
 * 窗口字符：\PMAF[图片ID,滤镜类型,滤镜名,各,项,参,数,是否等待]
 *             - 图片ID,滤镜类型,滤镜名,各,项,参,数为必填项，其他为选填项。
 * 
 * 1.滤镜类型共5种：纯色，着色，填充，模糊，噪点。
 *   - 纯色滤镜共7种：纯黑，纯蓝，纯绿，纯红，黄色，紫色，青色。
 *   - 着色滤镜共19种：黑白，反色，鲜艳，漂白，饱和度降低，古铜色，
 *     古墨水画色，宝丽来相机色，红绿蓝翻转，夜色，致幻色，完全反色，
 *     过量橘黄，红色通道，绿色通道，蓝色通道，红色通道反色，
 *     绿色通道反色，蓝色通道反色。
 *   - 填充滤镜共8种：纯黑，纯蓝，纯绿，纯红，黄色，紫色，青色，
 *     白色。你也可以写CSS样式颜色，例如 #dd99ff 。
 *   - 模糊滤镜和噪点滤镜均只有1种。实际写窗口字符时，不要写滤镜名，
 *     直接写滤镜类型即可。
 *   若要了解更多信息，请去查阅 Drill_PictureFilter.js 的激活条件。
 * 2.你必须将滤镜类型和滤镜名的所有参数按相关插件指令中的顺序全部写上。
 *   例如：
 *     插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 纯黑 : 155 : 60
 *     插件指令：>图片滤镜 : 图片[1] : 模糊滤镜 : 255 : 60
 *   分别等同于：
 *     窗口字符：\PMAC[1,纯色滤镜,纯黑,155,60]
 *     窗口字符：\PMAC[1,模糊滤镜,255,60]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 关闭图片滤镜效果 (需要 Drill_PictureFilter.js )
 * 
 * 窗口字符：\PMSF[图片ID,滤镜类型]
 * 
 * 1.滤镜类型共5种：纯色，着色，填充，模糊，噪点。
 * 
 * -----------------------------------------------------------------------------
 * ----使用条款
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
 * -----------------------------------------------------------------------------
 * ----更新历史
 * 
 * ver1.0 - 完成。
 * 
 * 
 * 
 * @param 向右缩进变量ID
 * @type variable
 * @desc 控制对话框文本向右缩进量的变量。你可以在图片位于最顶层时缩进文本。缩进量单位是像素。
 * @default 19
 * 
 * @param 向左缩进变量ID
 * @type variable
 * @desc [需要YEP消息核心]控制对话框文本向左缩进量的变量。你可以在图片位于最顶层时缩进文本。缩进量单位是像素。
 * @default 20
 */

/**
 * TODO
 * 1.经大量试验，发现很难与Drill_CoreOfWindowCharater.js插件本身兼容（不过和Drill_CoreOfWindowAuxiliary.js兼容）
 *   故暂不考虑兼容性...
 */

/**
 * 动作序列功能(待测)：
 * -----------------------------------------------------------------------------
 * ----可选设定 - 设置图片动作序列 (需要 Drill_PictureActionSequence.js )
 * 
 * 窗口字符：\PMASS[图片ID,动作序列ID]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 关闭图片动作序列 (需要 Drill_PictureActionSequence.js )
 * 
 * 窗口字符：\PMASE[图片ID]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 更改图片动作序列状态元 (需要 Drill_PictureActionSequence.js )
 * 
 * 窗口字符：\PMASCS[图片ID,状态元组,是否立即切换状态元]
 *             - 图片ID,状态元组是必填项，其他为选填项。
 * 
 * 1."是否立即切换状态元"处填 true 或 false ，或什么都不填。
 *   若为 true，则立即切换状态元。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 初始化图片动作序列状态元 (需要 Drill_PictureActionSequence.js )
 * 
 * 窗口字符：\PMASIS[图片ID]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 更改图片动作序列动作元 (需要 Drill_PictureActionSequence.js )
 * 
 * 窗口字符：\PMASCM[图片ID,动作元名称]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 立即停止图片动作序列动作元 (需要 Drill_PictureActionSequence.js )
 * 
 * 窗口字符：\PMASSM[图片ID]
 * 
 */
var Imported = Imported || {};
Imported.Drill_RSSD_X_PortraitManager = true;

var RSSD = RSSD || {};
RSSD.Drill_PSc_PM = {};

if(Imported.Drill_PictureShortcut) {

    //==================================================================
    // 检查兼容性
    //==================================================================

    if(Imported.Drill_CoreOfWindowCharacter) {
        var text = '很遗憾，目前 Drill_RSSD_X_PortraitManager.js 无法兼容 Drill_CoreOfWindowCharacter.js 。如要使用自动换行，建议使用YEP_MessageCore.js代替。';
        alert(text);
        console.log(text);
    };

    //==================================================================
    // 获取参数
    //==================================================================
    var parameters = PluginManager.parameters('Drill_RSSD_X_PortraitManager');
    RSSD.Drill_PSc_PM.varLeftPadding = parameters['向右缩进变量ID'] || 19;
    RSSD.Drill_PSc_PM.varRightPadding = parameters['向左缩进变量ID'] || 20;


    //==================================================================
    // Game_Screen
    //==================================================================

    Game_Screen.prototype._drill_PSc_PM_isPictureExist = function(pic_id) {
        if( pic_id == 0 ){ return false; }
        
        var pic = this.picture( pic_id );
        if( pic == undefined ){
            alert( "【Drill_PictureShortcut_PortraitManager.js】\n" +
                    "控制字符错误，id为"+pic_id+"的图片还没被创建。\n" + 
                    "你可能需要将字符放在'\\PMS'控制字符之后或添加权重。");
            return false;
        }
        return true;
    }


    //==================================================================
    // Window_Message
    //==================================================================

    /** 字段向右缩进 - 变量控制 */
    var _Window_Message_newLineX = Window_Message.prototype.newLineX;
    Window_Message.prototype.newLineX = function() {
        if(RSSD.Drill_PSc_PM.varLeftPadding) {
            var padding = $gameVariables.value(RSSD.Drill_PSc_PM.varLeftPadding) || 0;
            // YEP_MessageCore.js 
            if(Imported.YEP_MessageCore && $gameMessage.faceName() !== '') return eval(Yanfly.Param.MSGFaceIndent) + 20 + padding; 
            return $gameMessage.faceName() === '' ? 0 + padding : Window_Base._faceWidth + 20 + padding;
        } else {
            _Window_Message_newLineX.call(this);
        }
    };

    /** 字段向左缩进(用于兼容YEP_MessageCore.js自动换行) - 变量控制 */
    if (Imported.YEP_MessageCore) {
        var _Window_Message_wordWrapWidth = Window_Message.prototype.wordwrapWidth;
        Window_Message.prototype.wordwrapWidth = function(){
            if(RSSD.Drill_PSc_PM.varRightPadding) {
                var paddingR = $gameVariables.value(RSSD.Drill_PSc_PM.varRightPadding) || 0;
                if (Yanfly.Param.MSGTightWrap && $gameMessage.faceName() !== '') {
                    return this.contents.width - this.newLineX() - paddingR;
                }
                return this.contents.width - paddingR;
            } else {
                _Window_Message_wordWrapWidth.call(this);
            }
        };
    };

    /** 立绘编号数组(接收从\PMF传入的开发人员所规定的所有作为立绘的图片编号，第二次使用\PMF时就不用重新写入所有立绘的编号，用d即可代表上一次设置的立绘数组) */
    var __Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        __Window_Message_initMembers.call(this);
        this._drill_PSc_PM_portraits = [];
    };

    /** 控制字符 */
    var _Window_Message_processEscChar = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
            case 'PMS':  // 显示立绘
                this._drill_PSc_PM_showPortrait(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMFI':  // 立绘淡入
                this._drill_PSc_PM_fadeInPortrait(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMFO':  // 立绘淡出
                this._drill_PSc_PM_fadeOutPortrait(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMSFI':  // 立绘淡入
                this._drill_PSc_PM_stopFadeInPortrait(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMSFO':  // 立绘淡出
                this._drill_PSc_PM_stopFadeOutPortrait(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PME':  // 消除立绘
                this._drill_PSc_PM_erasePortrait(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMC':  // 更改立绘
                this._drill_PSc_PM_changeBitmap(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMI':  // 初始化立绘设置
                this._drill_PSc_PM_initPortrait(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMAC':  // 立绘动作
                this._drill_PSc_PM_applyContinuedEffect(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMSC':  // 停止立绘动作
                this._drill_PSc_PM_stopContinuedEffect(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMM':  // 立绘移动
                this._drill_PSc_PM_movePortrait(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMP':  // 立绘优先级
                this._drill_PSc_PM_changePriority(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMT':  // 立绘色调
                this._drill_PSc_PM_tint(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMF':  // 立绘聚焦
                this._drill_PSc_PM_focus(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMAF': // 开启立绘滤镜
                this._drill_PSc_PM_applyFilter(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMSF': // 关闭立绘滤镜
                this._drill_PSc_PM_closeFilter(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMA':  // 立绘锚点
                this._drill_PSc_PM_changeAnchor(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMN': // 更改立绘属性
                this._drill_PSc_PM_changeAttribute(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMPC': // 执行相关插件指令
                this._drill_PSc_PM_pluginCommand(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMEV': // eval代码
                this._drill_PSc_PM_eval(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMASS': // 设置动作序列 (待测)
                // this._drill_PSc_PM_startActSeq(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMASE': // 关闭动画序列
                // this._drill_PSc_PM_eraseActSeq(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMASCS': // 更改状态元
                // this._drill_PSc_PM_changeActSeqStatus(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMASIS': // 初始化状态元
                // this._drill_PSc_PM_initActSeqStatus(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMASCM': // 更改动作元
                // this._drill_PSc_PM_changeActSeqMotion(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            case 'PMASSM': // 立即停止动作元
                // this._drill_PSc_PM_stopActSeqMotion(this._drill_PSc_PM_obtainEscapeString(textState));
                break;
            default:
                _Window_Message_processEscChar.call(this, code, textState);
                break;
        };
    };

    // From Yanfly : 识别并返回控制字符后跟着的[]内的字符串
    Window_Base.prototype._drill_PSc_PM_obtainEscapeString = function(textState) {
        var arr = /^\[(.*?)\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return String(arr[0].slice(1, arr[0].length - 1));
        } else {
            return '';
        }
    };

    // [✔] // \PMS[图片ID(数字或用&分隔的数组),图片名称,原点,x,y,缩放x,缩放y,不透明度,混合模式]
    Window_Message.prototype._drill_PSc_PM_showPortrait = function(str) {
        var params = str.split(/[,，]/);
        params[1] = params[1] || '';                                        params[2] = this._drill_PSc_PM_realParamValue(params[2]) || 0;
        params[3] = this._drill_PSc_PM_realParamValue(params[3]) || 0;      params[4] = this._drill_PSc_PM_realParamValue(params[4]) || 0;
        params[5] = this._drill_PSc_PM_realParamValue(params[5]) || 100;    params[6] = this._drill_PSc_PM_realParamValue(params[6]) || 100;
        params[7] = this._drill_PSc_PM_realParamValue(params[7]) || 255;    params[8] = this._drill_PSc_PM_realParamValue(params[8]) || 0;
        if (params[0] && params[0].indexOf('&') > -1) {
            var picsId = params[0].split('&');
            for(var i = 0; i < picsId.length; i++) {
                var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                $gameScreen.showPicture(picId,params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8]);
            };
        } else if (params[0] && params[0].indexOf('&') == -1){
            var picId = this._drill_PSc_PM_realParamValue(params[0]);
            $gameScreen.showPicture(picId,params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8]);
        }
    };

    // [✔] // \PME[图片ID(数字或用&分隔的数组)]
    Window_Message.prototype._drill_PSc_PM_erasePortrait = function(str) {
        var params = str.split(/[,，]/);
        if (params[0] && params[0].indexOf('&') > -1) {
            var picsId = params[0].split('&');
            for(var i = 0; i < picsId.length; i++) {
                var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    $gameScreen.erasePicture(picId);
                };
            };
        } else if (params[0] && params[0].indexOf('&') == -1){
            var picId = this._drill_PSc_PM_realParamValue(params[0]);
            if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                $gameScreen.erasePicture(picId);
            };
        }
    };

    // [✔] // \PMC[图片ID(数字或用&分隔的数组),新图片名称]
    Window_Message.prototype._drill_PSc_PM_changeBitmap = function(str) {
        var params = str.split(/[,，]/);
        params[1] = params[1] || $gameScreen.picture(params[0])._name;
        if (params[0] && params[0].indexOf('&') > -1) {
            var picsId = params[0].split('&');
            for(var i = 0; i < picsId.length; i++) {
                var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    $gameScreen.picture(picId)._name = params[1];
                };
            };
        } else if (params[0] && params[0].indexOf('&') == -1){
            var picId = this._drill_PSc_PM_realParamValue(params[0]);
            if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                $gameScreen.picture(picId)._name = params[1];
            };
        }
    };

    // [✔] // \PMI[图片ID(数字或用&分隔的数组)]
    Window_Message.prototype._drill_PSc_PM_initPortrait = function(str) {
        var params = str.split(/[,，]/);
        if (params[0] && params[0].indexOf('&') > -1) {
            var picsId = params[0].split('&');
            for(var i = 0; i < picsId.length; i++) {
                var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    $gameScreen.picture(picId).initialize();
                };
            };
        } else if (params[0] && params[0].indexOf('&') == -1){
            var picId = this._drill_PSc_PM_realParamValue(params[0]);
            if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                $gameScreen.picture(picId).initialize();
            };
        }
    };

    // [✔] // \PMP[图片ID(数字或用&分隔的数组),层级]
    Window_Message.prototype._drill_PSc_PM_changePriority = function(str) {
        var params = str.split(/[,，]/);
        params[1] = +params[1] || 0;
        if (params[0] && params[0].indexOf('&') > -1) {
            var picsId = params[0].split('&');
            for(var i = 0; i < picsId.length; i++) {
                var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    if(+params[1]) {
                        $gameScreen.picture(picId)._Drill_PSh_layer = '最顶层';
                    } else {
                        $gameScreen.picture(picId)._Drill_PSh_layer = '图片层';
                    }
                };
            };
        } else if (params[0] && params[0].indexOf('&') == -1){
            var picId = this._drill_PSc_PM_realParamValue(params[0]);
            if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                if(+params[1]) {
                    $gameScreen.picture(picId)._Drill_PSh_layer = '最顶层';
                } else {
                    $gameScreen.picture(picId)._Drill_PSh_layer = '图片层';
                }
            };
        }
    };

    // [✔] // \PMM[图片ID(数字或用&分隔的数组),移动类型,x,y,时长,是否等待]
    Window_Message.prototype._drill_PSc_PM_movePortrait = function(str) {
        var params = str.split(/[,，]/);
        params[2] = this._drill_PSc_PM_realParamValue(params[2]) || 0;
        params[3] = this._drill_PSc_PM_realParamValue(params[3]) || 0;
        params[4] = +params[4] || 1;
        params[5] = (''+params[5]).toLowerCase() == 'true';
        params[1] = this._drill_PSc_PM_convertNameToSymbol(params[1]);
        if (params[0] && params[0].indexOf('&') > -1) {
            var picsId = params[0].split('&');
            for(var i = 0; i < picsId.length; i++) {
                var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    var simX, simY;
                    if(!params[1].includes('relative')) {simX = 'posX'; simY = 'posY'}
                    else {simX = '', simY = ''};
                    var data = {
                        "type":params[1],
                        "valueX":this._drill_PSc_PM_cA_getProperValueFromType(simX,params[2],picture),
                        "valueY":this._drill_PSc_PM_cA_getProperValueFromType(simY,params[3],picture),
                        "time":params[4],
                        "cur_time":0,
                        "cur_speedX":0,
                        "cur_speedY":0,
                    }
                    picture._Drill_PSh_commandTank.push(data);
                };
            };
            if(params[5]) {
                this.startWait(params[4]);
            };
        } else if (params[0] && params[0].indexOf('&') == -1){
            var picId = this._drill_PSc_PM_realParamValue(params[0]);
            if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                var picture = $gameScreen.picture(picId);
                var simX, simY;
                if(!params[1].includes('relative')) {simX = 'posX'; simY = 'posY'}
                else {simX = '', simY = ''};
                var data = {
                    "type":params[1],
                    "valueX":this._drill_PSc_PM_cA_getProperValueFromType(simX,params[2],picture),
                    "valueY":this._drill_PSc_PM_cA_getProperValueFromType(simY,params[3],picture),
                    "time":params[4],
                    "cur_time":0,
                    "cur_speedX":0,
                    "cur_speedY":0,
                }
                picture._Drill_PSh_commandTank.push(data);
            };
            if(params[5]) {
                this.startWait(params[4]);
            };
        }
    };

    // [✔] // \PMAC[图片ID(数字或用&分隔的数组),动作名称或标识符,各,项,参,数,是否等待]
    Window_Message.prototype._drill_PSc_PM_applyContinuedEffect = function(str) {
        if(Imported.Drill_PictureContinuedEffect) {
            var params = str.split(/[,，]/);
            var symbol = this._drill_PSc_PM_convertNameToSymbol(params[1]);   // 将params[1]作为持续效果名称保留，用于后期辨别逆时针旋转和顺时针旋转。
            params[2] = this._drill_PSc_PM_realDuration(params[2]);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                        var picture = $gameScreen.picture(picId);
                        picture.drill_PCE_stopEffect();
                        this._drill_PSc_PM_aF_setContinuedEffect(picture,symbol,params[1],params[2],params[3],params[4],params[5],params[6]);
                    };
                };
                if((''+params[params.length-1]).toLowerCase() == 'true' && params[params.length-1]) {
                    this.startWait(params[2]);
                }
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    var picture = $gameScreen.picture(picId);
                    picture.drill_PCE_stopEffect();
                    this._drill_PSc_PM_aF_setContinuedEffect(picture,symbol,params[1],params[2],params[3],params[4],params[5],params[6]);
                };
                if((''+params[params.length-1]).toLowerCase() == 'true' && params[params.length-1]) {
                    this.startWait(params[2]);
                }
            }
        };
    };

    // [✔] // \PMSC[图片ID(数字或用&分隔的数组),动作名称或标识符(选填项)]
    Window_Message.prototype._drill_PSc_PM_stopContinuedEffect = function(str) {
        if(Imported.Drill_PictureContinuedEffect) {
            var params = str.split(/[,，]/);
            var symbol = this._drill_PSc_PM_convertNameToSymbol(params[1],true);   // 将params[1]作为持续效果名称保留，用于后期辨别逆时针旋转和顺时针旋转。
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                        var picture = $gameScreen.picture(picId);
                        if(symbol && params[1]) {
                            picture[symbol]();
                        } else {
                            picture.drill_PCE_stopEffect();
                        }
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    var picture = $gameScreen.picture(picId);
                    if(symbol && params[1]) {
                        picture[symbol]();
                    } else {
                        picture.drill_PCE_stopEffect();
                    }
                };
            }
        };
    };

    // [✔] // \PMFI[图片ID(数字或用&分隔的数组),淡入类型名称或标识符,淡,入,参,数]
    Window_Message.prototype._drill_PSc_PM_fadeInPortrait = function(str) {
        if(Imported.Drill_PictureFadeInEffect) {
            var params = str.split(/[,，]/);
            var symbol = this._drill_PSc_PM_convertNameToSymbol(params[1]);   // 将params[1]作为淡入/淡出名称保留，用于后期辨别是否(不透明)。
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                        var picture = $gameScreen.picture(picId);
                        this._drill_PSc_PM_fIfO_setFadeEffect(picture,symbol,params[1],params[2],params[3],params[4],params[5]);
                    };
                };
                if((''+params[params.length-1]).toLowerCase() == 'true' && params[params.length-1]) {
                    this.startWait(params[2]);
                }
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    var picture = $gameScreen.picture(picId);
                    this._drill_PSc_PM_fIfO_setFadeEffect(picture,symbol,params[1],params[2],params[3],params[4],params[5]);
                };
                if((''+params[params.length-1]).toLowerCase() == 'true' && params[params.length-1]) {
                    this.startWait(params[2]);
                }
            }
        };
    };

    // [✔] // \PMFO[图片ID(数字或用&分隔的数组),淡出类型名称或标识符,淡,出,参,数]
    Window_Message.prototype._drill_PSc_PM_fadeOutPortrait = function(str) {
        if(Imported.Drill_PictureFadeOutEffect) {
            var params = str.split(/[,，]/);
            var symbol = this._drill_PSc_PM_convertNameToSymbol(params[1],false,true);   // 将params[1]作为淡入/淡出名称保留，用于后期辨别是否(不透明)。
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                        var picture = $gameScreen.picture(picId);
                        this._drill_PSc_PM_fIfO_setFadeEffect(picture,symbol,params[1],params[2],params[3],params[4],params[5]);
                    };
                };
                if((''+params[params.length-1]).toLowerCase() == 'true' && params[params.length-1]) {
                    this.startWait(params[2]);
                }
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    var picture = $gameScreen.picture(picId);
                    this._drill_PSc_PM_fIfO_setFadeEffect(picture,symbol,params[1],params[2],params[3],params[4],params[5]);
                };
                if((''+params[params.length-1]).toLowerCase() == 'true' && params[params.length-1]) {
                    this.startWait(params[2]);
                }
            }
        };
    };

    // [✔] // \PMSFI[图片ID(数字或用&分隔的数组)]
    Window_Message.prototype._drill_PSc_PM_stopFadeInPortrait = function(str) {
        if(Imported.Drill_PictureFadeOutEffect) {
            var params = str.split(/[,，]/);
            var name = '立即终止动作';
            var symbol = this._drill_PSc_PM_convertNameToSymbol(name);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                        var picture = $gameScreen.picture(picId);
                        this._drill_PSc_PM_fIfO_setFadeEffect(picture,symbol,name,params[2],params[3],params[4],params[5]);
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    var picture = $gameScreen.picture(picId);
                    this._drill_PSc_PM_fIfO_setFadeEffect(picture,symbol,name,params[2],params[3],params[4],params[5]);
                };
            }
        };
    };

    // [✔] // \PMSFO[图片ID(数字或用&分隔的数组)]
    Window_Message.prototype._drill_PSc_PM_stopFadeOutPortrait = function(str) {
        if(Imported.Drill_PictureFadeOutEffect) {
            var params = str.split(/[,，]/);
            var name = '立即终止动作';
            var symbol = this._drill_PSc_PM_convertNameToSymbol(name,false,true);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                        var picture = $gameScreen.picture(picId);
                        this._drill_PSc_PM_fIfO_setFadeEffect(picture,symbol,name,params[2],params[3],params[4],params[5]);
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    var picture = $gameScreen.picture(picId);
                    this._drill_PSc_PM_fIfO_setFadeEffect(picture,symbol,name,params[2],params[3],params[4],params[5]);
                };
            }
        };
    };

    // [✔] // \PMF[相关立绘图片ID(数字或用&分隔的数组),聚焦者图片ID(数字或用&分隔的数组),待机r_g_b_a,聚焦r_g_b_a,时长,是否等待]
    Window_Message.prototype._drill_PSc_PM_focus = function(str) {
        var params = str.split(/[,，]/);
        params[2] = params[2].indexOf('_') != -1 ? params[2].split('_').map(Number) : params[2];
        params[3] = params[3].indexOf('_') != -1 ? params[3].split('_').map(Number) : params[3];
        params[4] = +params[4] || 1;   params[5] = (''+params[5]).toLowerCase() == 'true';
        if(params[0] == 'default' || params[0] == 'd' || params[0] == '不变') {
            var all_portraits = this._drill_PSc_PM_portraits;
            if(params[1] && params[1].indexOf('&') > -1) {
                var focused_portraits = params[1].split('&');
            } else if (params[1] && params[1].indexOf('&') == -1) {
                var focused_portraits = [ params[1] ];
            };
        } else {
            if(params[0] && params[0].indexOf('&') > -1) {
                var all_portraits = params[0].split('&');
            } else if (params[0] && params[0].indexOf('&') == -1) {
                var all_portraits = [ params[0] ];
            };
            if(params[1] && params[1].indexOf('&') > -1) {
                var focused_portraits = params[1].split('&');
            } else if (params[1] && params[1].indexOf('&') == -1) {
                var focused_portraits = [ params[1] ];
            };
            this._drill_PSc_PM_portraits = all_portraits;
        };
        for(var i = 0; i < all_portraits.length; i++) {
            if(!all_portraits) break;
            var ori_picId = all_portraits[i];
            var real_picId = this._drill_PSc_PM_realParamValue(ori_picId);
            if($gameScreen._drill_PSc_PM_isPictureExist(real_picId)) {
                if(!focused_portraits) break;
                var picture = $gameScreen.picture(real_picId);
                if(focused_portraits.contains(ori_picId)) {
                    var tone = this._drill_PSc_PM_tintPreset(params[3]);
                    var duration = params[4];
                    $gameScreen.tintPicture(real_picId,tone,duration);
                } else {
                    var tone = this._drill_PSc_PM_tintPreset(params[2]);
                    var duration = params[4];
                    $gameScreen.tintPicture(real_picId,tone,duration);
                }
            };
        };
        if(params[5]) {
            this.startWait(params[4]);
        };
    };

    // [✔] // \PMT[图片ID(数字或用&分隔的数组),r_g_b_a或色调名称,时长,是否等待]
    Window_Message.prototype._drill_PSc_PM_tint = function(str) {
        var params = str.split(/[,，]/);
        params[1] = params[1].indexOf('_') !== -1 ? params[1].split('_') : params[1];
        params[2] = +params[2] || 1;     params[3] = !!params[3] || false;
        if (params[0] && params[0].indexOf('&') > -1) {
            var picsId = params[0].split('&');
            for(var i = 0; i < picsId.length; i++) {
                var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    var tone = this._drill_PSc_PM_tintPreset(params[1]);
                    $gameScreen.tintPicture(picId,tone,params[2]);
                };
            };
            if(params[3]) {
                this.startWait(params[2]);
            };
        } else if (params[0] && params[0].indexOf('&') == -1){
            var picId = this._drill_PSc_PM_realParamValue(params[0]);
            if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                var tone = this._drill_PSc_PM_tintPreset(params[1]);
                $gameScreen.tintPicture(picId,tone,params[2]);
            };
            if(params[3]) {
                this.startWait(params[2]);
            };
        }
    };

    // [✔] // \PMAF[图片ID(数字或用&分隔的数组),滤镜类型,滤镜名或颜色,滤镜强度(0-255),变化时长,是否等待]
    Window_Message.prototype._drill_PSc_PM_applyFilter = function(str) {
        if(Imported.Drill_PictureFilter) {
            var params = str.split(/[,，]/);
            params[2] = params[2] || '';    params[3] = +params[3] || 0;
            params[4] = +params[4] || 1;    params[5] = (''+params[5]).toLowerCase() == 'true';
            params[1] = this._drill_PSc_PM_convertNameToSymbol(params[1]);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                        var picture = $gameScreen.picture(picId);
                        var symbol = params[1];
                        picture._drill_PFi.openFilter = true;
                        picture._drill_PFi[symbol] = this._drill_PSc_PM_aF_setFilter(symbol,params[2],params[3],params[4]);
                    };
                };
                if(params[5]) {
                    this.startWait(params[4]);
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    var symbol = params[1];
                    picture._drill_PFi.openFilter = true;
                    picture._drill_PFi[symbol] = this._drill_PSc_PM_aF_setFilter(symbol,params[2],params[3],params[4]);
                };
                if(params[5]) {
                    this.startWait(params[4]);
                };
            }
        };
    };

    // [✔] // \PMSF[图片ID(数字或用&分隔的数组),滤镜类型]
    Window_Message.prototype._drill_PSc_PM_closeFilter = function(str) {
        if(Imported.Drill_PictureFilter) {
            var params = str.split(/[,，]/);
            params[1] = this._drill_PSc_PM_convertNameToSymbol(params[1]);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                        var picture = $gameScreen.picture(picId);
                        var symbol = params[1];
                        picture._drill_PFi[symbol] = this._drill_PSc_PM_cF_initFilter(symbol);
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    var symbol = params[1];
                    picture._drill_PFi[symbol] = this._drill_PSc_PM_cF_initFilter(symbol);
                };
            }
        };
    };

    // [✔] // \PMA[图片ID(数字或用&分隔的数组),锚点x,锚点y,是否保持原位]
    Window_Message.prototype._drill_PSc_PM_changeAnchor = function(str) {
        var params = str.split(/[,，]/);
        params[1] = this._drill_PSc_PM_realParamValue(params[1]) || 0;
        params[2] = this._drill_PSc_PM_realParamValue(params[2]) || 0;
        params[3] = (''+params[3]).toLowerCase() == 'true' || false;
        if (params[0] && params[0].indexOf('&') > -1) {
            var picsId = params[0].split('&');
            for(var i = 0; i < picsId.length; i++) {
                var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                    var picture = $gameScreen.picture(picId);
                    if(params[3]) {
                        var point = $gameTemp.drill_PSh_getFixPointInAnchor( picture._anchorX, picture._anchorY, params[1], params[2], 
                            picture._drill_width, picture._drill_height, picture._angle / 180 * Math.PI, 
                            picture._scaleX*0.01 , picture._scaleY*0.01 );
                        picture._origin = 100;
                        picture._anchorX = Number(params[1]);
                        picture._anchorY = Number(params[2]);
                        picture._x -= point.x;
                        picture._y -= point.y;
                    } else {
                        picture._origin = 100;
                        picture._anchorX = Number(params[1]);
                        picture._anchorY = Number(params[2]);
                    };
                };
            };
        } else if (params[0] && params[0].indexOf('&') == -1){
            var picId = this._drill_PSc_PM_realParamValue(params[0]);
            if($gameScreen._drill_PSc_PM_isPictureExist(picId)) {
                var picture = $gameScreen.picture(picId);
                if(params[3]) {
                    var point = $gameTemp.drill_PSh_getFixPointInAnchor( picture._anchorX, picture._anchorY, params[1], params[2], 
                        picture._drill_width, picture._drill_height, picture._angle / 180 * Math.PI, 
                        picture._scaleX*0.01 , picture._scaleY*0.01 );
                    picture._origin = 100;
                    picture._anchorX = Number(params[1]);
                    picture._anchorY = Number(params[2]);
                    picture._x -= point.x;
                    picture._y -= point.y;
                } else {
                    picture._origin = 100;
                    picture._anchorX = Number(params[1]);
                    picture._anchorY = Number(params[2]);
                };
            };
        }
    };

    // [✔] // \PMN[图片ID(数字或用&分隔的数组),属性名或属性标识符,参数值,时长,是否等待]
    Window_Message.prototype._drill_PSc_PM_changeAttribute = function(str) {
        var params = str.split(/[,，]/);
        params[1] = params[1] || '';   params[3] = +params[3] || 1;
        params[4] = (''+params[4]).toLowerCase() == 'true' || false;
        params[1] = this._drill_PSc_PM_convertNameToSymbol(params[1]);
        params[2] = this._drill_PSc_PM_realParamValue(params[2]);
        if (params[0] && params[0].indexOf('&') > -1) {
            var picsId = params[0].split('&');
            for(var i = 0; i < picsId.length; i++) {
                var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    var data = {
                        "type":params[1],
                        "value":params[1] == 'preload' ? this._drill_PSc_PM_cA_getProperValueFromType(params[1],params[2],picture) - 1 : this._drill_PSc_PM_cA_getProperValueFromType(params[1],params[2],picture),
                        "time":params[1] == 'blendMode' || params[1] == 'preload' ? 1 : Number(params[3]),
                        "cur_time":0,
                    }
                    picture._Drill_PSh_commandTank.push(data);
                };
            };
            if(params[4]) {
                this.startWait(params[3]);
            };
        } else if (params[0] && params[0].indexOf('&') == -1){
            var picId = this._drill_PSc_PM_realParamValue(params[0]);
            if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                var picture = $gameScreen.picture(picId);
                var data = {
                    "type":params[1],
                    "value":params[1] == 'preload' ? this._drill_PSc_PM_cA_getProperValueFromType(params[1],params[2],picture) - 1 : this._drill_PSc_PM_cA_getProperValueFromType(params[1],params[2],picture),
                    "time":params[1] == 'blendMode' || params[1] == 'preload' ? 1 : Number(params[3]),
                    "cur_time":0,
                }
                picture._Drill_PSh_commandTank.push(data);
            };
            if(params[4]) {
                this.startWait(params[3]);
            };
        }
    };

    // [ ] // \PMPC[插 件 指 令]
    Window_Message.prototype._drill_PSc_PM_pluginCommand = function(str) {
        var params = str.split(' ');
        var args = [];
        for (var i = 1; i < params.length; i++) {
            args.push(params[i]);
        };
        Game_Interpreter.prototype.pluginCommand(params[0], args);
    };

    // [ ] // \PMEV[代码]
    Window_Message.prototype._drill_PSc_PM_eval = function(str) {
        eval(str);
    };

    // [ ] // \PMASS[图片ID(数字或用&分隔的数组),动画序列号]
    Window_Message.prototype._drill_PSc_PM_startActSeq = function(str) {
        if(Imported.Drill_PictureActionSequence) {
            var params = str.split(/[,，]/);
            params[1] = this._drill_PSc_PM_realParamValue(params[1]);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                        var picture = $gameScreen.picture(picId);
                        picture.drill_PASe_setActionSequence( Number(params[1])-1 );
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    picture.drill_PASe_setActionSequence( Number(params[1])-1 );
                };
            }
        }
    };

    // [ ] // \PMASE[图片ID(数字或用&分隔的数组)]
    Window_Message.prototype._drill_PSc_PM_eraseActSeq = function(str) {
        if(Imported.Drill_PictureActionSequence) {
            var params = str.split(/[,，]/);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                        var picture = $gameScreen.picture(picId);
                        picture.drill_PASe_removeActionSequence();
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    picture.drill_PASe_removeActionSequence();
                };
            }
        }
    };

    // [ ] // \PMASCS[图片ID(数字或用&分隔的数组),状态元组(字符串用&分隔的数组),是否立即切换状态元]
    Window_Message.prototype._drill_PSc_PM_changeActSeqStatus = function(str) {
        if(Imported.Drill_PictureActionSequence) {
            var params = str.split(/[,，]/);
            params[1] = params[1] || '';   params[2] = (''+params[2]).toLowerCase() == 'true';
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                        var picture = $gameScreen.picture(picId);
                        if(params[2]) {
                            picture.drill_PASe_setSequenceImmediate( params[1].split("&") );
                        } else {
                            picture.drill_PASe_setSequence( params[1].split("&") );
                        };
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    if(params[2]) {
                        picture.drill_PASe_setSequenceImmediate( params[1].split("&") );
                    } else {
                        picture.drill_PASe_setSequence( params[1].split("&") );
                    };
                };
            }
        }
    };
    
    // [ ] // \PMASIS[图片ID(数字或用&分隔的数组)]
    Window_Message.prototype._drill_PSc_PM_initActSeqStatus = function(str) {
        if(Imported.Drill_PictureActionSequence) {
            var params = str.split(/[,，]/);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                        var picture = $gameScreen.picture(picId);
						picture.drill_PASe_setSequenceDefault();
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    picture.drill_PASe_setSequenceDefault();
                };
            }
        }
    };

    // [ ] // \PMASCM[图片ID(数字或用&分隔的数组),动作元名称]
    Window_Message.prototype._drill_PSc_PM_changeActSeqMotion = function(str) {
        if(Imported.Drill_PictureActionSequence) {
            var params = str.split(/[,，]/);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                        var picture = $gameScreen.picture(picId);
						picture.drill_PASe_setAct( String(params[1]) );
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    picture.drill_PASe_setAct( String(params[1]) );
                };
            }
        }
    };

    // [ ] // \PMASSM[图片ID(数字或用&分隔的数组)]
    Window_Message.prototype._drill_PSc_PM_stopActSeqMotion = function(str) {
        if(Imported.Drill_PictureActionSequence) {
            var params = str.split(/[,，]/);
            if (params[0] && params[0].indexOf('&') > -1) {
                var picsId = params[0].split('&');
                for(var i = 0; i < picsId.length; i++) {
                    var picId = this._drill_PSc_PM_realParamValue(picsId[i]);
                    if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                        var picture = $gameScreen.picture(picId);
						picture.drill_PASe_stopAct();
                    };
                };
            } else if (params[0] && params[0].indexOf('&') == -1){
                var picId = this._drill_PSc_PM_realParamValue(params[0]);
                if($gameScreen._drill_PSc_PM_isPictureExist(picId) && params[1]) {
                    var picture = $gameScreen.picture(picId);
                    picture.drill_PASe_stopAct();
                };
            }
        }
    };

    /** -------------------------------- 私有方法 ----------------------------------- */

    // (弃用) 私有：兼容自动换行，去掉参数中的\n
    Window_Message.prototype._drill_PSc_PM_removeNewLineSign = function(arr) {
        for(var j = 0; j < arr.length; j++) {
            if(!arr[j]) continue;
            var temp = String(arr[j]).split('\n');
            arr[j] = temp.join("");
        };
        return arr;
    };

    // 私有：辨识v前缀，获取真正的值
    Window_Message.prototype._drill_PSc_PM_realParamValue = function(str) {
        if(!str) return '';
        if(str.indexOf('v') > -1 || str.indexOf('V') > -1) {
            var arr = str.split(/v/gi);
            return $gameVariables.value(+arr[1]);
        } else {
            return +str;
        };
    };

    // 私有：辨识'无限'或'oo'或'OO'，获取真正的时间
    Window_Message.prototype._drill_PSc_PM_realDuration = function(durationStr) {
        switch(durationStr) {
            case '无限':
                return 518400000;
        };
        switch(durationStr.toLowerCase()) {
            case 'oo':
                return 518400000;
        };
        return +durationStr;
    };

    // 私有：立绘光效预设名
    Window_Message.prototype._drill_PSc_PM_tintPreset = function(tintName) {
        if(typeof tintName == 'object') return tintName;
        switch(tintName) {
            case '黑暗':
                return [-68,-68,-68,0];
            case '茶色':
                return [34,-34,-68,170];
            case '纯白':
                return [255,255,255,255];
            case '纯黑':
                return [-255,-255,-255,0];
            case '清晨':
                return [17,0,-90,0];
            case '黄昏':
                return [68,-34,-34,0];
            case '夜晚':
                return [-68,-68,0,68];
            case '白光':
                return [34,34,34,0];
            case '雕像':
                return [-34,-34,-34,255];
            case '受伤':
                return [85,-51,-51,0];
            case '待机':
                return [-68,-68,-68,17];
            case '正常':
                return [0,0,0,0];
            default:
                return [0,0,0,0];
        }
    };

    // 私有：将滤镜设为初始值（关闭滤镜）时根据滤镜类型判断初始值
    Window_Message.prototype._drill_PSc_PM_cF_initFilter = function(symbol) {
        switch(symbol) {
            case 'dataPureLinear':
            case 'dataFillLinear':
            case 'dataPureWave':
            case 'dataFillWave':
                return [ "纯黑", 0, 1 ];
            case 'dataColorLinear':
            case 'dataColorWave':
                return [ "黑白", 0, 1 ];
            case 'dataBlurLinear': 
            case 'dataNoiseLinear': 
            case 'dataBlurWave': 
            case 'dataNoiseWave': 
                return [ 0, 1 ];
        }
        return '';
    };

    // 私有：根据类型设置滤镜值
    Window_Message.prototype._drill_PSc_PM_aF_setFilter = function(symbol,param1,param2,param3) {
        switch(symbol) {
            case 'dataBlurLinear': case 'dataNoiseLinear': 
            case 'dataBlurWave':   case 'dataNoiseWave': 
                return [+param1,+param2];
            default:
                return [param1,+param2,+param3];
        }
    };

    // 私有：根据类型设置淡入淡出效果，并直接执行函数 (需要name参数是因为要区分开加(不透明)的指令不加之间的差别)
    Window_Message.prototype._drill_PSc_PM_fIfO_setFadeEffect = function(picObj,symbol,name,param1,param2,param3,param4) {
        if(!symbol) return;
        switch(symbol) {
            case 'drill_PFIE_stopEffect':
            case 'drill_PFOE_stopEffect':
                picObj[symbol]();
            case 'drill_PFIE_playShowingAppear':
            case 'drill_PFOE_playHidingDisappear':
                picObj[symbol](+param1); break;
            case 'drill_PFIE_playShowingJump':
            case 'drill_PFOE_playHidingJump':
            case 'drill_PFOE_playHidingBlowOutLeft':
            case 'drill_PFOE_playHidingBlowOutRight':
                picObj[symbol](+param1,+param2); break;
            case 'drill_PFIE_playShowingMoveAppear':
            case 'drill_PFOE_playHidingMoveDisappear':
                picObj[symbol](+param1,+param2,+param3); break;
            case 'drill_PFIE_playShowingFall':
            case 'drill_PFOE_playHidingSpring':
                picObj[symbol](+param1,+param3,+param2); break;
            case 'drill_PFOE_playHidingShrink':
                if(!name.includes('不透明')) picObj[symbol](+param1,false); else picObj[symbol](+param1,true); break;
            case 'drill_PFIE_playShowingHorizonFlat':
            case 'drill_PFIE_playShowingVerticalFlat':
            case 'drill_PFIE_playShowingEnlarge':
            case 'drill_PFOE_playHidingHorizonFlat':
            case 'drill_PFOE_playHidingVerticalFlat':
                if(!name.includes('不透明')) picObj[symbol](+param1,+param2,false); else picObj[symbol](+param1,+param2,true); break;
            case 'drill_PFIE_playShowingEnlargeSpring':
            case 'drill_PFOE_playHidingShrinkSpring':
                if(!name.includes('不透明')) picObj[symbol](+param1,+param2,+param3,+param4,false); else picObj[symbol](+param1,+param2,+param3,+param4,true); break;
            
        }
    };

    // 私有：根据类型设置持续动作，并直接执行函数 (需要name参数是因为要区分顺时针旋转和逆时针旋转,这两种效果共享同一个symbol)
    Window_Message.prototype._drill_PSc_PM_aF_setContinuedEffect = function(picObj,symbol,name,param1,param2,param3,param4,param5) {
        if(!symbol) return;
        switch(symbol) {
            case 'drill_PCE_playSustainingFlicker':
            case 'drill_PCE_playSustainingFlickerCos':
            case 'drill_PCE_playSustainingRotateVer':
            case 'drill_PCE_playSustainingRotateHor':
                picObj[symbol](+param1,+param2); break;
            case 'drill_PCE_playSustainingShakeUD':
            case 'drill_PCE_playSustainingShakeLR':
            case 'drill_PCE_playSustainingShakeRotate':
            case 'drill_PCE_playSustainingPendulumRotate':
            case 'drill_PCE_playSustainingAnchorRotate':
            case 'drill_PCE_playSustainingBreathing':
            case 'drill_PCE_playSustainingJumping':
            case 'drill_PCE_playSustainingRotateState':
            case 'drill_PCE_playSustainingResizeState':
                picObj[symbol](+param1,+param2,+param3); break;
            case 'drill_PCE_playSustainingZooming':
            case 'drill_PCE_playSustainingRotateVer_Gradual':
            case 'drill_PCE_playSustainingRotateHor_Gradual':
                picObj[symbol](+param1,+param2,+param3,+param4); break;
            case 'drill_PCE_playSustainingFloating':
            case 'drill_PCE_playSustainingShakeUD_Gradual':
            case 'drill_PCE_playSustainingShakeLR_Gradual':
            case 'drill_PCE_playSustainingShakeRotate_Gradual':
            case 'drill_PCE_playSustainingPendulumRotate_Gradual':
            case 'drill_PCE_playSustainingAnchorRotate_Gradual':
                picObj[symbol](+param1,+param2,+param3,+param4,param5); break;
            case 'drill_PCE_playSustainingRotate':
                if(name == '顺时针旋转') picObj[symbol](+param1,+param2,1); else if(name == '逆时针旋转') picObj[symbol](+param1,+param2,-1); break;
            case 'drill_PCE_playSustainingRotate_Gradual':
                if(name == '顺时针旋转(渐变)') picObj[symbol](+param1,+param2,-1,+param3,+param4); else if(name == '逆时针旋转(渐变)') picObj[symbol](+param1,+param2,1,+param3,+param4); break;
        }
    }

    // 私有：将名称转换为标识符 (只在_drill_PSc_PM_stopContinuedEffect函数中将isSCFunc设为true; 只在_drill_PSc_PM_fadeOutPortrait中将isFadeOut设为true)
    Window_Message.prototype._drill_PSc_PM_convertNameToSymbol = function(name,isSCFunc,isFadeOut) {
        switch(name) {
            /** 移动 */
            case '相对增减速移动到': case '相对增减速':
                return 'relativeSmoothMove';
            case '增减速移动到': case '增减速': 
                return 'smoothMove';
            case '相对弹性移动到': case '相对弹性':
                return 'relativeElasticMove';
            case '弹性移动到': case '弹性':
                return 'elasticMove';
            /** 修改属性 */
            case '混合模式':
                return 'opacity';
            case '资源预加载': case '预加载': case '预加载资源':
                return 'preload';
            case '相对横坐标': case '相对x': case '相对X': case '相对x坐标': case '相对X坐标':
                return 'relativePosX';
            case '相对纵坐标': case '相对y': case '相对Y': case '相对y坐标': case '相对Y坐标':
                return 'relativePoxY';
            case '横坐标': case 'x坐标': case 'X坐标':
                return 'posX';
            case '纵坐标': case 'y坐标': case 'Y坐标':
                return 'posY';
            case '相对不透明度': case '相对不透明':
                return 'relativeOpacity';
            case '不透明度': case '不透明':
                return 'opacity';
            case '相对角度': case '相对角':
                return 'relativeAngle';
            case '角度':
                return 'angle';
            case '相对缩放x': case '相对横向缩放': case '相对缩放X':
                return 'relativeScaleX';
            case '相对缩放y': case '相对纵向缩放': case '相对缩放Y':
                return 'relativeScaleY';
            case '缩放x': case '横向缩放': case '缩放X':
                return 'scaleX';
            case '缩放y': case '纵向缩放': case '缩放Y':
                return 'scaleY';
            case '相对斜切x': case '相对横向斜切': case '相对斜切X':
                return 'relativeSkewX';
            case '相对斜切y': case '相对纵向斜切': case '相对斜切Y':
                return 'relativeSkewY';
            case '斜切x': case '横向斜切': case '斜切X':
                return 'skewX';
            case '斜切y': case '纵向斜切': case '斜切Y':
                return 'skewY';
            /** 特殊用途 - 滤镜类型对应函数名 (用于获取所需调用的函数名) */
            case '纯色滤镜': case '纯色':        return 'dataPureLinear';
            case '着色滤镜': case '着色':        return 'dataColorLinear';
            case '填充滤镜': case '填充':        return 'dataFillLinear';
            case '模糊滤镜': case '模糊':        return 'dataBlurLinear';
            case '噪点滤镜': case '噪点':        return 'dataNoiseLinear';
            case '波动纯色滤镜': case '波动纯色': return 'dataPureWave';
            case '波动着色滤镜': case '波动着色': return 'dataColorWave';
            case '波动填充滤镜': case '波动填充': return 'dataFillWave';
            case '波动模糊滤镜': case '波动模糊': return 'dataBlurWave';
            case '波动噪点滤镜': case '波动噪点': return 'dataNoiseWave';
            /** 特殊用途 - 持续效果类型对应函数名 (用于获取所需调用的函数名)  */
            case '标准闪烁':                                return 'drill_PCE_playSustainingFlicker';
            case '渐变闪烁':                                return 'drill_PCE_playSustainingFlickerCos';
            case '顺时针旋转': case '逆时针旋转':            return 'drill_PCE_playSustainingRotate';
            case '垂直卡片旋转':                            return 'drill_PCE_playSustainingRotateVer';
            case '水平卡片旋转':                            return 'drill_PCE_playSustainingRotateHor';
            case '上下震动': case '上下振动':                return 'drill_PCE_playSustainingShakeUD';
            case '左右震动': case '左右振动':                return 'drill_PCE_playSustainingShakeLR';
            case '左右摇晃':                                return 'drill_PCE_playSustainingShakeRotate';
            case '钟摆摇晃':                                return 'drill_PCE_playSustainingPendulumRotate';
            case '锚点摇晃':                                return 'drill_PCE_playSustainingAnchorRotate';
            case '呼吸效果':                                return 'drill_PCE_playSustainingBreathing';
            case '原地小跳':                                return 'drill_PCE_playSustainingJumping';
            case '旋转状态':                                if(isSCFunc) return 'drill_PCE_playSustainingRotateState'; else return 'drill_PCE_endSustainingRotateState';
            case '缩放状态':                                if(isSCFunc) return 'drill_PCE_playSustainingResizeState'; else return 'drill_PCE_endSustainingResizeState';
            case '反复缩放':                                return 'drill_PCE_playSustainingZooming';
            case '顺时针旋转(渐变)': case '逆时针旋转(渐变)': if(isSCFunc) return 'drill_PCE_playSustainingRotate_Gradual'; else return 'drill_PCE_endSustainingRotate_Gradual';
            case '垂直卡片旋转(渐变)':                       if(isSCFunc) return 'drill_PCE_playSustainingRotateVer_Gradual'; else return 'drill_PCE_endSustainingRotateVer_Gradual';
            case '水平卡片旋转(渐变)':                       if(isSCFunc) return 'drill_PCE_playSustainingRotateHor_Gradual'; else return 'drill_PCE_endSustainingRotateHor_Gradual';
            case '空中飘浮': case '空中漂浮':                if(isSCFunc) return 'drill_PCE_playSustainingFloating'; else return 'drill_PCE_endSustainingFloating';
            case '上下震动(渐变)': case '上下振动(渐变)':     if(isSCFunc) return 'drill_PCE_playSustainingShakeUD_Gradual'; else return 'drill_PCE_endSustainingShakeUD_Gradual';
            case '左右震动(渐变)': case '左右振动(渐变)':     if(isSCFunc) return 'drill_PCE_playSustainingShakeLR_Gradual'; else return 'drill_PCE_endSustainingShakeLR_Gradual';
            case '左右摇晃(渐变)':                           if(isSCFunc) return 'drill_PCE_playSustainingShakeRotate_Gradual'; else return 'drill_PCE_endSustainingShakeRotate_Gradual';
            case '钟摆摇晃(渐变)':                           if(isSCFunc) return 'drill_PCE_playSustainingPendulumRotate_Gradual'; else return 'drill_PCE_endSustainingPendulumRotate_Gradual';
            case '锚点摇晃(渐变)':                           if(isSCFunc) return 'drill_PCE_playSustainingAnchorRotate_Gradual'; else return 'drill_PCE_endSustainingAnchorRotate_Gradual';
            /** 特殊用途 - 淡入/淡出类型对应函数名 (用于获取所需调用的函数名)  */
            case '标准弹跳': if(isFadeOut) return 'drill_PFOE_playHidingJump'; else return 'drill_PFIE_playShowingJump';
            case '立即终止动作': case '立即中止动作': if(isFadeOut) return 'drill_PFOE_stopEffect'; else return 'drill_PFIE_stopEffect';
            /** ---- 淡入类型函数 */
            case '直接显现': return 'drill_PFIE_playShowingAppear';
            case '移动显现': return 'drill_PFIE_playShowingMoveAppear';
            case '标准落下': return 'drill_PFIE_playShowingFall';
            case '弹性放大出现': case '弹性放大出现(不透明)': case '弹性放大出现（不透明）': return 'drill_PFIE_playShowingEnlargeSpring';
            case '横向冒出': case '横向冒出(不透明)': case '横向冒出（不透明）': return 'drill_PFIE_playShowingHorizonFlat';
            case '纵向冒出': case '纵向冒出(不透明)': case '纵向冒出（不透明）': return 'drill_PFIE_playShowingVerticalFlat';
            case '放大出现': case '放大出现(不透明)': case '放大出现（不透明）': return 'drill_PFIE_playShowingEnlarge';
            /** ---- 淡出类型函数 */
            case '直接消失': return 'drill_PFOE_playHidingDisappear';
            case '移动消失': return 'drill_PFOE_playHidingMoveDisappear';
            case '标准升起': return 'drill_PFOE_playHidingSpring';
            case '弹性缩小消失': case '弹性缩小消失(不透明)': case '弹性缩小消失（不透明）': return 'drill_PFOE_playHidingShrinkSpring';
            case '缩小消失': case '缩小消失(不透明)': case '缩小消失（不透明）': return 'drill_PFOE_playHidingShrink';
            case '纵向挤扁': case '纵向挤扁(不透明)': case '纵向挤扁（不透明）': return 'drill_PFOE_playHidingVerticalFlat';
            case '横向挤扁': case '横向挤扁(不透明)': case '横向挤扁（不透明）': return 'drill_PFOE_playHidingHorizonFlat';
            case '向左炸飞': return 'drill_PFOE_playHidingBlowOutLeft';
            case '向右炸飞': return 'drill_PFOE_playHidingBlowOutRight';
        };
        switch(name.toLowerCase()) {
            /** 移动 */
            case 'rsm': case 'relativesmoothmove': case 'relative-smooth-move':
                return 'relativeSmoothMove';
            case 'sm': case 'smoothmove': case 'smooth-move':
                return 'smoothMove';
            case 'rem': case 'relativeelasticmove': case 'relative-elastic-move':
                return 'relativeElasticMove';
            case 'em': case 'elasticmove': case 'elastic-move':
                return 'elasticMove';
            /** 修改属性 */
            case 'bm': case 'blendmode': case 'blend-mode':
                return 'blendMode';
            case 'pl': case 'preload':
                return 'preload';
            case 'rx': case "relativex": case 'relative-x':
                return 'relativePosX';
            case 'ry': case "relativey": case 'relative-y':
                return 'relativePosY';
            case 'x':
                return 'posX';
            case 'y':
                return 'posY';
            case 'ro': case 'relativeopacity': case 'relative-opacity':
                return 'relativeOpacity';
            case 'o': case 'opacity':
                return 'opacity';
            case 'ra': case 'relativeangle': case 'relative-angle':
                return 'relativeAngle';
            case 'a': case 'angle': case 'rotation':
                return 'angle';
            case 'rscx': case 'relativescalex': case 'relative-scalex': case 'relative-scale-x':
                return 'relativeScaleX';
            case 'rscy': case 'relativescaley': case 'relative-scaley': case 'relative-scale-y':
                return 'relativeScaleY';
            case 'scx': case 'scalex': case 'scale-x':
                return 'scaleX';
            case 'scy': case 'scaley': case 'scale-y':
                return 'scaleY';
            case 'rskx': case 'relativeskewx': case 'relative-skewx': case 'relative-skew-x':
                return 'relativeSkewX';
            case 'rsky': case 'relativeskewy': case 'relative-skewy': case 'relative-skew-y':
                return 'relativeSkewY';
            case 'skx': case 'skewx': case 'skew-x':
                return 'skewX';
            case 'sky': case 'skewy': case 'skew-y':
                return 'skewY';
            /** 特殊用途 - 滤镜类型对应函数名 (用于获取所需调用的函数名) */
            case 'purelinear':  case 'pure-linear':  return 'dataPureLinear';
            case 'colorlinear': case 'color-linear': return 'dataColorLinear';
            case 'filllinear':  case 'fill-linear':  return 'dataFillLinear';
            case 'blurlinear':  case 'blur-linear':  return 'dataBlurLinear';
            case 'noiselinear': case 'noise-linear': return 'dataNoiseLinear';
            case 'purewave':    case 'pure-wave':    return 'dataPureWave';
            case 'colorwave':   case 'color-wave':   return 'dataColorWave';
            case 'fillwave':    case 'fill-wave':    return 'dataFillWave';
            case 'blurwave':    case 'blur-wave':    return 'dataBlurWave';
            case 'noisewave':   case 'noise-wave':   return 'dataNoiseWave';
        };
        return '';
    };

    // 私有：根据类型转换成真正的参数值
    Window_Message.prototype._drill_PSc_PM_cA_getProperValueFromType = function(type,valueToBeConverted,picObj) {
        switch(type) {
            case 'posX':    return valueToBeConverted - picObj._x;
            case 'posY':    return valueToBeConverted - picObj._y;
            case 'opacity': return valueToBeConverted - picObj._opacity;
            case 'angle':   return valueToBeConverted - picObj._angle;
            case 'scaleX':  return valueToBeConverted - picObj._scaleX;
            case 'scaleY':  return valueToBeConverted - picObj._scaleY;
            case 'skewX':   return valueToBeConverted - picObj._skewX;
            case 'skewY':   return valueToBeConverted - picObj._skewY;
            default:        return valueToBeConverted;
        }
    };
} else {
    var text = 'Drill_PictureShortcut_PortraitManager.js 依赖 Drill_PictureShortcut.js 运行。看看是不是忘记开启插件或顺序没放对！'
    console.log(text);
    alert(text);
};