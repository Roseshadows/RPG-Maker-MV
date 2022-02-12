//RSSD_RandomItems.js
//随机物品：随机获取物品/武器/防具或学习技能。
/*:
* @plugindesc v0.0.1 - 随机物品
* 随机获取物品/武器/防具或学习技能。也可随机获取多个不同种类的物品。
* @author Rose_shadows
* @help 
* v0.0.1 - semi finished.
* Currently there is only Chinese version. I may make English varsion some day.
* 目前可完整使用的部分：仅物品/仅武器/仅防具的随机抽取、自定义数量、自定义金钱、自定义概率。
* 仅技能/混合部分代码不完整，用时会出错。
*
* ==插件功能简介==
*
* 这个插件不仅可以随机获取物品/武器/防具，甚至可以随机学习技能。可以通过插件命令和事件脚本自行定义物品/武器/防具/技能的获取列表、获取总数、所需金钱以及获取概率。
* 此外，不但可以跨种类设置获取列表，还可以设置随机获取总数、随机获取概率以及这两者的上限与下限。
*
* ==插件指令==
*
*    ::随机 {种类} {包括的ID列表} {数量} {自定义所需金钱} {获取概率}
*
*  - 实现该插件功能的插件命令。
*
*  {种类}：物品/武器/防具/技能/混合
*  ！注意！
*  如果种类为技能的话，在抽出技能时，能够学习该技能并还未习得该技能，
*  且队列中位置相对靠前的队员将自动学会该技能。如果你有JS基础的话，可以在该插件代码部分的“自定义随机技能使用目标”处自行修改随机技能获得后学习该技能的人。
*  如果队伍中没有人能够学习随机技能，可以打开一个开关（插件参数中设置）。
*
*  {包括的列表ID}：这里的数字表示随机物品ID。格式：[1(,2,3,...)]
*  ！注意！
*  如果种类是“混合”，该处格式应为[物品ID|武器ID|防具ID|技能ID]。
*  若不使用物品/武器/防具/技能，将对应的地方空下来就可以了。
*  例如：[1,2,3|1,5||]   - 表示不使用防具、技能种类。
*
*  {数量}：获得数量。如果为0，则获取随机数量的物品。
*
*  {自定义所需金钱}：如果不填，或者填小写字母 d，则使用默认所需金钱（插件参数中设置）。
*
*  {获取概率}：物品获取的统一概率。一位小数，范围在0~1之间。若设为0，则获取概率随机；若设为1或为空，则必然获取。
*  ！注意！
*  这里的获取概率是指每个物品/武器/防具/技能的的获取概率。所以即使设置获取总数为5，你也很可能只能拿到2种、1种物品，甚至什么都拿不到。
*
*
*    ::随机 {数量上/下限} {数量极值}
*
*  - 如果在上一条插件命令中设置{数量}为 0 ，这条插件命令可以修改随机获取数量的上下限。必须放在上一条指令之前。
*    如果不使用该条命令，将会使用默认的随机获取数量上/下限（插件参数中设置）。
*    只会在上一条指令中{数量}设为 0 时才会生效，否则不会起作用。具体可以看例子。
*  ！注意！
*  该插件命令是暂时性的，只要该插件命令之后使用了上一条插件命令，即便该插件指令没有生效（即上一条插件命令中{数量}不为 0），在下一次设置时，你也需要重新再设置该插件指令。（说的有点绕，具体可以看例子）
*
*  {数量上/下限}：数量上限/数量下限
*
*  {数量极值}：数字，数量极值。如果{数量上/下限}设为“数量上限”，这将是数量上限值。
*
*
*    ::随机 {概率上/下限} {概率极值}
*
*  - 如果在上一条插件命令中设置{获取概率}为 0 ，这条插件命令可以修改随机获取概率的上下限。必须放在上一条指令之前。
*    如果不使用该条命令，将会使用默认的随机获取概率上/下限（插件参数中设置）。
*    只会在上一条指令中{获取概率}设为 0 时才会生效，否则不会起作用。具体可以看例子。
*  ！注意！
*  该插件命令是暂时性的，只要该插件命令之后使用了上一条插件命令，即便该插件指令没有生效（即上一条插件命令中{获取概率}不为 0），在下一次设置时，你也需要重新再设置该插件指令。（说的有点绕，具体可以看例子）
*
*  {概率上/下限}：概率上限/概率下限
*
*  {概率极值}：0~1之间的一位小数，概率极值。比如，如果{概率上/下限}设为“概率上限”，这将是概率上限值。
*
*
*  例子：
*
*  ::随机 物品 [1,2,3,4] 1 1500
*  - 需要花1500元才能得到任意一个ID为1,2,3或4的物品。概率百分百。
*  等效于：
*  ::随机 混合 [1,2,3,4|||] 1 1500
*
*  ::随机 武器 [1,3,15] 2 d 0.5
*  - 需要花默认所需金钱才能得到任意两把ID为1,3或15的武器。概率百分之五十。
*    例如，可能得到一把ID为1的武器和一把ID为15的武器，也可能得到两把ID
*    均为3的武器。
*  等效于：
*  ::随机 混合 [|1,3,15||] 2
*
*  ::随机 混合 [1,3,4|2,8|3|6] 1 d d
*  - 需要花费默认所需金钱才能得到一个ID为1,3或4的物品，或ID为2或8的武器
*    ，或ID为3的防具，或ID为6的技能。概率百分百。
*
*  ::随机 数量上限 5
*  ::随机 数量下限 2
*  ::随机 防具 [2,3,6] 1 100 1
*  - 需要花费100金钱才能得到一个ID为2或3或6的防具。概率百分百。
*    注意，这里的获取数量并不为 0 ，所以数量上/下限的插件命令无效。下一次使用时，你需要重新设置一次数量上/下限的插件命令。
*  ::随机 数量上限 5
*  ::随机 防具 [5,3,9] 0 100 1
*  - 需要花费100金钱才能得到上限为5，下限为默认数量下限的随机数量个ID为2或3或6的防具。概率百分百。
*    这个时候，数量上/下限的插件命令才能生效。下一次使用时，还需要重新设置一次数量上/下限的插件命令。以此类推。
*
*
*
*  ==事件脚本==
*
*    RSSD_RandomItems.getRandomItem([id1,id2,...],num,customprice,customProbability);
*  - 获取num个ID可能为id1,id2或...的物品。
*  例: RSSD_RandomItems.getRandomItem([2,4,16],3);
*
*    RSSD_RandomItems.getRandomWeapon([id1,id2,...],num,customprice,customProbability);
*  - 获取num个ID可能为id1,id2或...的武器。
*  例: RSSD_RandomItems.getRandomWeapon([1,3,8],2);
*
*    RSSD_RandomItems.getRandomArmor([id1,id2,...],num,customprice,customProbability);
*  - 获取num个ID可能为id1,id2或...的防具。
*  例: RSSD_RandomItems.getRandomArmor([4,2,17],1);
*
*    RSSD_RandomItems.getRandomWeapon([id1,id2,...],num,customprice,customProbability);
*  - 获取num个ID可能为id1,id2或...的技能。在抽出技能时，能够学习该技能并
*    还未习得该技能，且队列中位置相对靠前的队员将自动学会该技能。
*  例: RSSD_RandomItems.getRandomWeapon([7,9,10,11,21],1);
*
*    RSSD_RandomItems.getRandomMix([iid1,iid2,...],[wid1,wid2,...],[aid1,aid2,...],[sid1,sid2,...],num,customprice);
*  - 得到num个ID可能为iid1,iid2,...的物品，或ID可能为wid1,wid2,...的武器，
*    或ID可能为aid1,aid2,...的防具，或ID可能为sid1,sid2,...的技能。
*  - 若不使用物品/武器/防具/技能，保留[]，将对应的地方空下来就可以了。
*  例：RSSD_RandomItems.getRandomMix([1,3,4,7],[8,6],[2,3],[],2,);
*      获得2个ID可能为1,3,4,7的物品，或ID可能为8,6的武器，或ID可能为2,3的
*      防具。也就是说，可能会得到1个ID为1的物品和1个ID为3的防具，可能得
*      到2个ID分别为1,7的物品，也可能得到2个ID均为8的武器。
*     
*
*    RSSD_RandomItems.rItems[num]
*  - 返回上一次获取随机物品时所获物品的ID对象。num从0开始，表示获取的第1个物品（物品获取顺序没有规律）。
*    例如：RSSD_RandomItems.rItems[0]
*  - 访问上一次获取随机物品时的第1个物品。可访问的属性有：name, id, amount.
*    例如：RSSD_RandomItems.rItems[0].name
*  - 返回上一次获取随机物品时的第1个物品的名称。
*
*    RSSD_RandomItems.rWeapons[num]
*  - 返回上一次获取随机武器时所获武器的对象。num从0开始，表示获取的第1个武器（武器获取顺序没有规律）。
*    例如：RSSD_RandomItems.rWeapons[0]
*  - 访问上一次获取随机武器时的第1个武器。可访问的属性有：name, id, amount.
*    例如：RSSD_RandomItems.rWeapons[0].amount
*  - 返回上一次获取随机武器时的第1个武器的获取数量。
*
*    RSSD_RandomItems.rArmors
*  - 返回上一次获取随机防具时所获防具的对象。num从0开始，表示获取的第1个防具（防具获取顺序没有规律）。
*    例如：RSSD_RandomItems.rArmors[0]
*  - 访问上一次获取随机防具时的第1个防具。可访问的属性有：name, id, amount.
*    例如：RSSD_RandomItems.rArmors[0].id
*  - 返回上一次获取随机防具时的第1个防具的ID。
*
*    RSSD_RandomItems.rSkills
*  - 返回上一次获取随机技能时所获技能的对象。num从0开始，表示获取的第1个技能（防具获取顺序没有规律）。
*    例如：RSSD_RandomItems.rSkills[0]
*  - 访问上一次获取随机技能时的第1个技能。可访问的属性有：name, id, amount.
*    例如：RSSD_RandomItems.rSkills[0].targets
*  - 返回上一次获取随机技能时学习了第1个技能的队员序列索引[数组]。
*
*    RSSD_RandomItems.skillsTargets[num]
*  - 返回上一次获取随机技能时学会了第num+1个获取的技能的所有队员索引的数组。num与上一条事件脚本中的num相对应。
*    例如：RSSD_RandomItems.skillsTargets[0]
*  - 返回上一次获取随机技能时学会了第1个获取的技能的所有队员索引的数组。
*
*    RSSD_RandomItems.memberWhoLearntSkill
*  - 返回上一次获取随机技能时学会了技能的队员索引数组。
*
*    RSSD_RandomItems.itemsAmount
*  - 返回最后一次使用随机物品时理论上可以获得的数量。
*
*    RSSD_RandomItems.itemsTrueAmount
*  - 返回最后一次使用随机物品时实际上获得的数量。
*
*    RSSD_RandomItems.weaponsAmount
*  - 返回最后一次使用随机物品时理论上可以获得的数量。
*
*    RSSD_RandomItems.weaponsTrueAmount
*  - 返回最后一次使用随机物品时实际上获得的数量。
*
*    RSSD_RandomItems.armorsAmount
*  - 返回最后一次使用随机物品时理论上可以获得的数量。
*
*    RSSD_RandomItems.armorsTrueAmount
*  - 返回最后一次使用随机物品时实际上获得的数量。
*    
*
*
*
*
*
* @param 默认所需金钱
* @type number
* @desc 默认所需的金钱数量。也可以在插件指令或事件脚本中设置所需的金钱。
* @default 1000
*
* @param 不能获取随机技能时打开的开关
* @type switch
* @desc 如果队伍中没有人能学习所获的技能，该开关将会打开。
* @default 
*
* @param 无法学习技能时是否退还金钱
* @type boolean
* @on 退还金钱
* @off 不退还
* @default true
*
* @param 随机获取数量默认上限
* @type number
* @min 1
* @desc 如果随机物品数量设置为0（随机数量），该参数将是随机数量的默认上限。默认为3
* @default 3
*
* @param 随机获取数量默认下限
* @type number
* @min 1
* @desc 如果随机物品数量设置为0（随机数量），该参数将是随机数量的默认下限。默认为1
* @default 1
*
* @param 随机获取概率默认上限
* @type number
* @min 0
* @max 1
* @decimals 1
* @desc 如果随机物品获取概率设置为0（随机概率），该参数将是随机获取概率的默认上限。默认为1
* @default 1
*
* @param 随机获取概率默认下限
* @type number
* @min 0
* @max 1
* @decimals 1
* @desc 如果随机物品获取概率设置为0（随机概率），该参数将是随机获取概率的默认下限。默认为0
* @default 0
*/

/*目前要做的事情：
1.把Mix部分写了
2.试着解决第一次调用插件指令时无效的问题 - 已解决
3.为事件脚本添加自定义金钱功能 - 已解决
4.将帮助文档再细化一下
5.试着创建控制字符
6.解决技能部分的代码不生效的问题（可以试着不用for嵌套） - 已解决，是代码写的有问题
7.（重点）有机会的话，将相关数组改为*对象*，这样就可以一一对应了。在随机物品中，已实现用对象来操作。亲测有效。
8.（重点）获取概率功能有待完善。目前只写了物品部分的获取概率功能，亲测有效。
9.再看看获取参数部分的写法有什么问题（感觉不对劲）
10.尝试添加本应获取却因为获取概率最终没有获取的物品ID数组（此数组长度 = 获取次数 - 最终获取的物品的数组长度）
*/

/** 自定义随机技能使用目标 */
function customRandomSkillTarget() {
    //---------------------------------------------------------------------------------------------------
    // 可在此修改随机技能使用目标。已提供的实现方法有6种。最终只能保留1种方法。
    // 如果你想在游戏过程中改变随机技能使用目标，可以使用一个变量，通过改变变量值来切换不同的目标。（请自行添加代码）
    // 如果获取多个技能，该函数将会被多次使用。
    //
    // · 使用的固定变量或函数：
    // skillIndex   - 获取的一个随机技能的ID。*必须使用*
    // RSSD_RandomItems.canLearnSkill(memberId,skillId)   - memberId的队列成员能否学习skillId的技能
    // RSSD_RandomItems.memberWhoLearntSkill   - 学习了技能的队员索引数组。*必须使用*
    //
    // ！注意！在自定义的函数中，*必须*在RSSD_RandomItems.memberWhoLearntSkill数组里添加学习了技能的队员索引！
    // ！注意！在自定义的函数中，*必须*调用$gameParty.members()[memberId].learnSkill(skillIndex);!
    //---------------------------------------------------------------------------------------------------
    // 默认模式：能够学习该技能并还未习得该技能，且队列中位置相对靠前的队员将自动学会技能。
    for (var i = 0; i < $gameParty.members().length; i++) {
        if (RSSD_RandomItems.canLearnSkill(i,skillIndex) && !$gameParty.members()[i].hasSkill(skillIndex)) {
            $gameParty.members()[i].learnSkill(skillIndex);
            RSSD_RandomItems.memberWhoLearntSkill.push(i);
            break;
        }
    }

    /* 
    // 第二种模式：索引为指定变量值的队员将会自动学习技能，忽略该队员是否能够学习该技能。
    // 方式1：如果你只想对一个队员这样做，可以使用以下代码：
    $gameParty.members()[$gameVariables.value(n)].learnSkill(skillIndex);    //将n替换为变量ID，作为存储队员索引的的变量
    if (RSSD_RandomItems.canLearnSkill($gameVariables.value(n),skillIndex) && !$gameParty.members()[$gameVariables.value(n)].hasSkill(skillIndex)) {
        RSSD_RandomItems.memberWhoLearntSkill.push($gameVariables.value(n));   //如果能够学习该技能且还未习得该技能，就将该队列索引加入数组中。
    }
    /*
    // 方式2：
    // 如果你想对多个队员这样做，可以使用以下代码：
    targetList = [$gameVariables.value(n1),$gameVariables.value(n2),$gameVariables.value(n3)];   //可以在这个数组中再添加新的变量ID，这些变量将会作为存储队员索引的的变量
    for (var i = 0; i < $gameParty.members().length; i++) {   //这里用$gameParty.members().length是防止设置的变量数超过队伍的长度
        $gameParty.members()[targetList[i]].learnSkill(skillIndex);
        if (RSSD_RandomItems.canLearnSkill(targetList[i],skillIndex) && !$gameParty.members()[targetList[i]].hasSkill(skillIndex)) {
            RSSD_RandomItems.memberWhoLearntSkill.push(targetList[i]);   //如果能够学习该技能且还未习得该技能，就将该队列索引加入数组中。
        }
    }
    /*
    在游戏中，将能够获得随机技能的队员索引存入代码中指定的变量即可使用。
    */
    
    /*
    // 第三种模式：索引为指定变量值的队员将会自动学习技能，如果该队员无法学习，则能够学习该技能并还未习得该技能，且队列中位置相对靠前的队员将自动学会技能。
    // 方式1：如果你只想对一个队员这样做，可以使用以下代码：
    if (RSSD_RandomItems.canLearnSkill($gameVariables.value(n),skillIndex) && !$gameParty.members()[$gameVariables.value(n)].hasSkill(skillIndex)) {
        $gameParty.members()[$gameVariables.value(n)].learnSkill(skillIndex);    //将n替换为变量ID，作为存储队员索引的的变量
        RSSD_RandomItems.memberWhoLearntSkill.push($gameVariables.value(n));   //这一行的n也要修改。如果能够学习该技能且还未习得该技能，就将该队列索引加入数组中。
    } else {
        for (var i = 0; i < $gameParty.members().length; i++) {
            if (RSSD_RandomItems.canLearnSkill(i,skillIndex) && !$gameParty.members()[i].hasSkill(skillIndex)) {
                $gameParty.members()[i].learnSkill(skillIndex);
                RSSD_RandomItems.memberWhoLearntSkill.push(i);
                break;
            }
        }
    }
    /* 
    // 方式2：如果你想对多个队员这样做，且希望所选的能够学习该技能并还未习得该技能的*所有*队员都学习随机技能，可以使用以下代码：
    targetList = [$gameVariables.value(n1),$gameVariables.value(n2),$gameVariables.value(n3)];   //可以在这个数组中再添加新的变量ID，这些变量将会作为存储队员索引的的变量
    targetCanLearn = [];   //可以学习该随机技能的队员索引数组
    for (var j = 0; j < targetList.length; j++) {
        if (RSSD_RandomItems.canLearnSkill(targetList[j],skillIndex) && !$gameParty.members()[$gameVariables.value(n)].hasSkill(skillIndex)) {
            $gameParty.members()[target[j]].learnSkill(skillIndex);    //将n替换为变量ID，作为存储队员索引的的变量
            RSSD_RandomItems.memberWhoLearntSkill.push($gameVariables.value(n));
            RSSD_targetCanLearn.push(targetList[j]);
        }
    }
    /*
    // 方式3：如果你想对多个队员这样做，且希望所选的能够学习该技能并还未习得该技能的*随机*一名队员学习随机技能，可以使用以下代码：
    targetList = [$gameVariables.value(n1),$gameVariables.value(n2),$gameVariables.value(n3)];   //可以在这个数组中再添加新的变量ID，这些变量将会作为存储队员索引的的变量
    targetCanLearn = [];   //可以学习该随机技能的队员索引数组
    for (var j = 0; j < targetList.length; j++) {
        if (RSSD_RandomItems.canLearnSkill(targetList[j],skillIndex) && !$gameParty.members()[$gameVariables.value(n)].hasSkill(skillIndex)) {
            $gameParty.members()[target[j]].learnSkill(skillIndex);    //将n替换为变量ID，作为存储队员索引的的变量
            RSSD_RandomItems.memberWhoLearntSkill.push($gameVariables.value(n));
            RSSD_targetCanLearn.push(targetList[j]);
        }
    }
    if (target) {   //确保有队员能够学习该技能并还未习得该技能
        target = Math.floor(Math.random()*targetCanLearn.length);
        $gameParty.members()[target].learnSkill(skillIndex);
    }
    */
    
    /* 在这里自定义新的方法 */

}


//=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+


var Imported = Imported || {};
Imported.RSSD_RandomItems = true;

//获取参数：（再看看写法上有什么问题）
var RSSD_RandomItems = RSSD_RandomItems || {};
RSSD_RandomItems.parameters = PluginManager.parameters('RSSD_RandomItems');
RSSD_RandomItems.price = parseInt(RSSD_RandomItems.parameters['默认所需金钱'] || '1000');
RSSD_RandomItems.switchId = parseInt(RSSD_RandomItems.parameters['不能获取随机技能时打开的开关'] || '');
RSSD_RandomItems.returnMoney = RSSD_RandomItems.parameters['无法学习技能时是否退还金钱'] === 'true';
RSSD_RandomItems.randomMax = parseInt(RSSD_RandomItems.parameters['随机获取数量默认上限'] || '3');
RSSD_RandomItems.randomMin = parseInt(RSSD_RandomItems.parameters['随机获取数量默认下限'] || '1');
RSSD_RandomItems.randomMaxP = parseFloat(RSSD_RandomItems.parameters['随机获取概率默认上限'] || '1');
RSSD_RandomItems.randomMinP = parseFloat(RSSD_RandomItems.parameters['随机获取概率默认下限'] || '0');

//===============插件指令===============//
var getName;   //公共调用，在下面的“功能实现”派上了用场

var items = {};   //第1层对象
var weapons = {};
var armors = {};
var skills = {};

function getInnerData(obj,index,type,num) {
    var getData2 = {
        name:'',
        id:0,
        amount:0,      //注意，这一行“数量”目前并未定义（包括物品）。
        target:-1
    };   //数组中第2层公共对象:物品详细信息。存到各个数组里。用于物品/武器/防具/混合的功能
    if (type === 1) {
        getData2.name = $dataItems[index].name;
        getData2.id = index;
    } else if (type === 2) {
        getData2.name = $dataWeapons[index].name;
        getData2.id = index;
    } else if (type === 3) {
        getData2.name = $dataArmors[index].name;
        getData2.id = index;
    } else if (type === 4) {
        getData2.name = $dataSkills[index].name;
        getData2.id = index;
        getData2.target = RSSD_RandomItems.memberWhoLearntSkill[skillIndex];
    }
    obj[String(num)] = {};
    obj[String(num)] = getData2;
}

RSSD_RandomItems._Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    RSSD_RandomItems._Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === '::随机') {
        var args1 = String(args[1]);
        var args2 = Number(args[2]);
        if (args[0] === '物品') {
            var commonItemsChars = null;     //物品的ID列表数组
            if (args1.indexOf('[')!=-1) {
                args1 = args1.replace("[","");
                args1 = args1.replace("]","");
                commonItemsChars = [];
                var temp_arr = args1.split(/[,，]/);
                for (var k = 0; k < temp_arr.length; k++) {
                    var itemsId = Number(temp_arr[k]);
                    if (!RSSD_RandomItems.isItemExist(itemsId)) {   //检测Id是否不存在
                        continue;
                    }
                    commonItemsChars.push(itemsId);
                }
                if (args[3] === 'd') {
                    //啥也不干，让RSSD_RandomItems.customPrice成为undefined
                } else if (args[3]) {
                    RSSD_RandomItems.customPrice = Number(args[3]);
                }
                if (args[4] === 'd') {

                } else if (args[4]) {
                    RSSD_RandomItems.customProbability = Number(args[4]);
                }
                RSSD_RandomItems.getRandomItem(commonItemsChars,args2,RSSD_RandomItems.customPrice,RSSD_RandomItems.customProbability);
            }
        }
        if (args[0] === '武器') {
            var commonWeaponsChars = null;     //武器的ID列表数组
            if (args1.indexOf('[')!=-1) {
                args1 = args1.replace("[","");
                args1 = args1.replace("]","");
                commonWeaponsChars = [];
                var temp_arr = args1.split(/[,，]/);
                for (var k = 0; k < temp_arr.length; k++) {
                    var weaponsId = Number(temp_arr[k]);
                    if (!RSSD_RandomItems.isWeaponExist(weaponsId)) {   //检测Id是否不存在
                        continue;
                    }
                    commonWeaponsChars.push(weaponsId);
                }
                if (args[3] === 'd') {
                    //啥也不干，让RSSD_RandomItems.customPrice成为undefined
                } else if (args[3]) {
                    RSSD_RandomItems.customPrice = Number(args[3]);
                }
                if (args[4] === 'd') {

                } else if (args[4]) {
                    RSSD_RandomItems.customProbability = Number(args[4]);
                }
                RSSD_RandomItems.getRandomWeapon(commonWeaponsChars,args2,RSSD_RandomItems.customPrice,RSSD_RandomItems.customProbability);
            }
        }
        if (args[0] === '防具') {
            var commonArmorsChars = null;     //防具的ID列表数组
            if (args1.indexOf('[')!=-1) {
                args1 = args1.replace("[","");
                args1 = args1.replace("]","");
                commonArmorsChars = [];
                var temp_arr = args1.split(/[,，]/);
                for (var k = 0; k < temp_arr.length; k++) {
                    var armorsId = Number(temp_arr[k]);
                    if (!RSSD_RandomItems.isArmorExist(armorsId)) {   //检测Id是否不存在
                        continue;
                    }
                    commonArmorsChars.push(armorsId);
                }
                if (args[3] === 'd') {
                    //啥也不干，让RSSD_RandomItems.customPrice成为undefined
                } else if (args[3]) {
                    RSSD_RandomItems.customPrice = Number(args[3]);
                }
                if (args[4] === 'd') {

                } else if (args[4]) {
                    RSSD_RandomItems.customProbability = Number(args[4]);
                }
                RSSD_RandomItems.getRandomArmor(commonArmorsChars,args2,RSSD_RandomItems.customPrice,RSSD_RandomItems.customProbability);
            }
        }
        if (args[0] === '技能') {
            var commonSkillsChars = null;     //技能的ID列表数组
            if (args1.indexOf('[')!=-1) {
                args1 = args1.replace("[","");
                args1 = args1.replace("]","");
                commonSkillsChars = [];
                var temp_arr = args1.split(/[,，]/);
                for (var k = 0; k < temp_arr.length; k++) {
                    var skillsId = Number(temp_arr[k]);
                    if (!RSSD_RandomItems.isSkillExist(skillsId)) {   //检测Id是否不存在
                        continue;
                    }
                    commonSkillsChars.push(skillsId);
                }
                if (args[3] === 'd') {
                    //啥也不干，让RSSD_RandomItems.customPrice成为undefined
                } else if (args[3]) {
                    RSSD_RandomItems.customPrice = Number(args[3]);
                }
                if (args[4] === 'd') {

                } else if (args[4]) {
                    RSSD_RandomItems.customProbability = Number(args[4]);
                }
                RSSD_RandomItems.getRandomSkill(commonSkillsChars,args2,RSSD_RandomItems.customPrice,RSSD_RandomItems.customProbability);
            }
        }
        if (args[0] === '混合') {
            //建立4个子数组
            //原数组：
            var mixItemsp = [];
            var mixWeaponsp = [];
            var mixArmorsp = [];
            var mixSkillsp = [];
            //要使用的数组：
            var mixItems = [];
            var mixWeapons = [];
            var mixArmors = [];
            var mixSkills = [];
            if (args1.indexOf('[')!=-1) {
                //获得初始数组
                args1 = args1.replace("[","");
                args1 = args1.replace("]","");
                var commonMix = new Array(4);
                commonMix = args1.split("|"); //存储4个子数组的总数组。注意，调用元素时可能会出现元素undefined的情况。
                //将各部分分配到各个子数组
                mixItemsp = commonMix[0].split('/,，/');
                mixWeaponsp = commonMix[1].split('/,，/');
                mixArmorsp = commonMix[2].split('/,，/');
                mixSkillsp = commonMix[3].split(',，');
                //依次检查ID是否存在
                for (var k = 0; k < mixItemsp.length; k++) {
                    var itemsId = Number(mixItemsp[k]);
                    if (RSSD_RandomItems.isItemExist(itemsId) == false) {   //检测Id是否不存在
                        continue;
                    }
                    mixItems.push(itemsId);
                }
                for (var k = 0; k < mixWeaponsp.length; k++) {
                    var itemsId = Number(mixWeaponsp[k]);
                    if (RSSD_RandomItems.isWeaponExist(itemsId) == false) {   //检测Id是否不存在
                        continue;
                    }
                    mixWeapons.push(itemsId);
                }
                for (var k = 0; k < mixArmorsp.length; k++) {
                    var itemsId = Number(mixArmorsp[k]);
                    if (RSSD_RandomItems.isArmorExist(itemsId) == false) {   //检测Id是否不存在
                        continue;
                    }
                    mixArmors.push(itemsId);
                }
                for (var k = 0; k < mixSkillsp.length; k++) {
                    var itemsId = Number(mixSkillsp[k]);
                    if (RSSD_RandomItems.isSkillExist(itemsId) == false) {   //检测Id是否不存在
                        continue;
                    }
                    mixSkills.push(itemsId);
                }
                if (args[3] === 'd') {
                    //啥也不干，让RSSD_RandomItems.customPrice成为undefined
                } else if (args[3]) {
                    RSSD_RandomItems.customPrice = Number(args[3]);
                }
                if (args[4] === 'd') {

                } else if (args[4]) {
                    RSSD_RandomItems.customProbability = Number(args[4]);
                }
                RSSD_RandomItems.getRandomMix(mixItems,mixWeapons,mixArmors,mixSkills,args2,RSSD_RandomItems.customPrice,RSSD_RandomItems.customProbability);
            }
        }
        if (args[0] === '数量上限') {
            RSSD_RandomItems.setMaxRandomAmount(parseInt(args1));
        }
        if (args[0] === '数量下限') {
            RSSD_RandomItems.setMinRandomAmount(parseInt(args1));
        }
        if (args[0] === '概率上限') {
            RSSD_RandomItems.setMaxRandomProbability(parseFloat(args1));
        }
        if (args[0] === '概率下限') {
            RSSD_RandomItems.setMinRandomProbability(parseFloat(args1));
        }
    }
}

//===============isDataExist(Id)方法实现===============//
RSSD_RandomItems.isItemExist = function (id) {
    if (!isNaN(id) && id > 0 && id <= $dataItems.length) {
        return true;
    } else {
        return false;
    }
}
RSSD_RandomItems.isWeaponExist = function (id) {
    if (!isNaN(id) && id > 0 && id <= $dataWeapons.length) {
        return true;
    } else {
        return false;
    }
}
RSSD_RandomItems.isArmorExist = function (id) {
    if (!isNaN(id) && id > 0 && id <= $dataArmors.length) {
        return true;
    } else {
        return false;
    }
}
RSSD_RandomItems.isSkillExist = function (id) {
    if (!isNaN(id) && id > 0 && id <= $dataSkills.length) {
        return true;
    } else {
        return false;
    }
}



//===============功能实现===============//

/**获取随机物品 */
RSSD_RandomItems.getRandomItem = function (i,num,cm,probability) {
    clearAllAttributes(RSSD_RandomItems.rItems);
    checkCondition(num,cm,probability);
    var pr;
    if ($gameParty.gold() >= money) {   //检查队伍是否拥有足够金钱
        RSSD_RandomItems.rItems = {};   //>存放最后一次调用该函数时所得所有物品的名称的数组
        RSSD_RandomItems.rItems = items;
        getName = RSSD_RandomItems.rItems;
        var LastIndex;
        $gameParty.loseGold(money);
        var arrayIndex;
        var itemIndex;
        for (var j = 0, m = 0; j < num; j++) {  //使用随机概率后，此处情况大改，连带“自定义随机技能使用目标”处也要修改（初步看是不用再写learnSkill方法）（发现也可不改动，此处问题已解决）
            arrayIndex = Math.floor(Math.random()*i.length);
            itemIndex = i[arrayIndex];
            getInnerData(getName,itemIndex,1,m);   //在这里已经实现了将对象添加到getName对象里的过程了。
            pr = Math.random();
            if (pr > probability) { //获得概率实现
                delete getName[String(m)];
            } else {
                $gameParty.gainItem($dataItems[itemIndex],1);
                m++;   //m是各物品的对象顺序Id，每当获得新物品，Id就+1
            }
            var LastIndex = String(objectAttributesAmount(getName) - 1);
            var key = attributeIsRepeated(getName,getName,LastIndex);
            if (key) {
                delete getName[LastIndex];
                getName[key].amount += 1;
            }
        }
        if (RSSD_RandomItems.randomAmount === undefined && num !== undefined) {
            RSSD_RandomItems.itemsAmount = num;   //本应获得的数量
        } else if (RSSD_RandomItems.randomAmount !== undefined) {
            RSSD_RandomItems.itemsAmount = RSSD_RandomItems.randomAmount;
        }
        RSSD_RandomItems.itemsTrueAmount = objectAttributesAmount(getName);   //真正获得的物品数量
    }
    clearCustom();
}

/**获取随机武器 */
RSSD_RandomItems.getRandomWeapon = function (w,num,cm,probability) {
    clearAllAttributes(RSSD_RandomItems.rWeapons);
    checkCondition(num,cm,probability);
    var pr;
    if ($gameParty.gold() >= money) {
        RSSD_RandomItems.rWeapons = {};   //>存放最后一次调用该函数时所得所有武器的名称的数组，必须放这儿，不然如果钱不够的话会返回空数组
        RSSD_RandomItems.rWeapons = weapons;
        getName = RSSD_RandomItems.rWeapons;
        var LastIndex;
        $gameParty.loseGold(money);
        var arrayIndex;
        var weaponIndex;
        for (var j = 0, m = 0; j < num; j++) {
            arrayIndex = Math.floor(Math.random()*w.length);
            weaponIndex = w[arrayIndex];
            getInnerData(getName,weaponIndex,2);
            pr = Math.random();
            if (pr > probability) { //获得概率实现
                delete getName[String(m)];
            } else {
                $gameParty.gainItem($dataWeapons[weaponIndex],1);
                m++;
            }
            var LastIndex = String(objectAttributesAmount(getName) - 1);
            var key = attributeIsRepeated(getName,getName,LastIndex);
            if (key) {
                delete getName[LastIndex];
                getName[key].amount += 1;
            }
        }
        if (RSSD_RandomItems.randomAmount === undefined && num !== undefined) {
            RSSD_RandomItems.weaponsAmount = num;   //本应获得的数量
        } else if (RSSD_RandomItems.randomAmount !== undefined) {
            RSSD_RandomItems.weaponsAmount = RSSD_RandomItems.randomAmount;
        }
        RSSD_RandomItems.weaponsTrueAmount = objectAttributesAmount(getName);   //真正获得的物品数量
    }
    clearCustom();
}

/**获取随机防具 */
RSSD_RandomItems.getRandomArmor = function (a,num,cm,probability) {
    clearAllAttributes(RSSD_RandomItems.rArmors);
    checkCondition(num,cm,probability);
    var pr;
    if ($gameParty.gold() >= money) {
        RSSD_RandomItems.rArmors = {};   //>存放最后一次调用该函数时所得所有防具的名称的对象
        RSSD_RandomItems.rArmors = armors;
        getName = RSSD_RandomItems.rArmors;
        $gameParty.loseGold(money);
        var arrayIndex;
        var armorIndex;
        for (var j = 0, m = 0; j < num; j++) {
            arrayIndex = Math.floor(Math.random()*a.length);
            armorIndex = a[arrayIndex];
            getInnerData(getName,armorIndex,3,m);
            pr = Math.random();
            if (pr > probability) { //获得概率实现
                delete getName[String(m)];
            } else {
                $gameParty.gainItem($dataArmors[armorIndex],1);
                m++;
            }
            var LastIndex = String(objectAttributesAmount(getName) - 1);
            var key = attributeIsRepeated(getName,getName,LastIndex);
            if (key) {
                delete getName[LastIndex];
                getName[key].amount += 1;
            }
        }
        if (RSSD_RandomItems.randomAmount === undefined && num !== undefined) {
            RSSD_RandomItems.armorsAmount = num;   //本应获得的数量
        } else if (RSSD_RandomItems.randomAmount !== undefined) {
            RSSD_RandomItems.armorsAmount = RSSD_RandomItems.randomAmount;
        }
        RSSD_RandomItems.armorsTrueAmount = objectAttributesAmount(getName);   //真正获得的物品数量
    }
    clearCustom();
}

/**获取随机技能 */
RSSD_RandomItems.getRandomSkill = function (s,num,cm,probability) {
    clearAllAttributes(RSSD_RandomItems.rArmors);
    checkCondition(num,cm,probability);
    var pr;
    if ($gameParty.gold() >= money) {
        RSSD_RandomItems.rSkills = [];   //>存放最后一次调用该函数时所得所有防具的名称的数组
        getName = RSSD_RandomItems.rSkills;
        $gameParty.loseGold(money);
        RSSD_RandomItems.memberWhoLearntSkill = [];   //学习了技能的队员索引ID
        var arrayIndex;
        var skillIndex;
        for (var j = 0; j < num; j++) {
            arrayIndex = Math.floor(Math.random()*s.length);
            skillIndex = s[arrayIndex];
            customRandomSkillTarget();
            getName.push(skillIndex);
            pr = Math.random();
            if (pr > probability) { //获得概率实现
                LastIndex = getName.length - 1;
                $gameParty.members()[RSSD_RandomItems.memberWhoLearntSkill[skillIndex]].forgetSkill(skillIndex);
                RSSD_RandomItems.memberWhoLearntSkill.splice(LastIndex,1);
                RSSD_RandomItems.rSkills.splice(LastIndex,1);
            }
            //不用再写else部分，因为customRandomSkillTarget()部分里已经写了学习技能的功能了。
        }
        if (getName.length == 1) {   //如果只有一个，则直接获取
            RSSD_RandomItems.rSkills = getName[0];
            RSSD_RandomItems.memberWhoLearntSkill = RSSD_RandomItems.memberWhoLearntSkill[0];
        }
        if (!RSSD_RandomItems.memberWhoLearntSkill) {
            if (RSSD_RandomItems.returnMoney) {
                $gameParty.gainGold(money);
            } 
            if (RSSD_RandomItems.switchId) {
                $gameSwitches.setValue(RSSD_RandomItems.switchId,1);
            }
        } else {
            $gameSwitches.setValue(RSSD_RandomItems.switchId,0);
        }
    }
    clearCustom();
}
//用于判断技能能否被学习
RSSD_RandomItems.canLearnSkill = function (p,s) {  //p是队伍索引，s是技能ID
    var memberSkillTypeList = $gameParty.members()[p].traitsSet(41);
    if (memberSkillTypeList.includes($dataSkills[s].stypeId)) {
        return true;
    } else {
        return false;
    }
}

//混合：
RSSD_RandomItems.getRandomMix = function (i,w,a,s,num,cm,probability) {  //未完成
    checkCondition(num,cm,probability);
    var pr;
    var mixItemsLength = i.length;
    var mixWeaponsLength = w.length;
    var mixArmorsLength = a.length;
    var mixSkillsLength = s.length;
    if ($gameParty.gold() >= money) {
        RSSD_RandomItems.rMix = []   //>存放最后一次调用该函数时所得所有物品的名称的数组（不能用对象！！！对象不能访问数组！！！）
        getName = RSSD_RandomItems.rMix;
        i = i.concat(b,c,d);    //把i,w,a,s数组全部放到i里，不创建新的数组，省内存
        $gameParty.loseGold(money);
        var arrayIndex;
        var mixIndex;
        for (var j = 0; j < num; j++) {
            arrayIndex = Math.floor(Math.random()*i.length);
            mixIndex = i[arrayIndex];
            getName.push(mixIndex);
            RSSD_RandomItems.randomMixFunc(mixIndex,mixItemsLength,mixWeaponsLength,mixArmorsLength,mixSkillsLength);
        }
    }
}

RSSD_RandomItems.randomMixFunc = function (mixIndex,il,wl,al,sl) { //未完成，还要加上概率部分的实现，完善技能部分。
    if (mixIndex < il) {
        pr = Math.random();
        if (pr > probability) { //获得概率实现
            LastIndex = getName.length - 1;
            RSSD_RandomItems.rMix.item.splice(LastIndex,1);
        } else {
            $gameParty.gainItem($dataItems[mixIndex],1);
        }
    } else if (mixIndex < wl) {
        pr = Math.random();
        if (pr > probability) { //获得概率实现
            LastIndex = getName.length - 1;
            RSSD_RandomItems.rMix.weapon.splice(LastIndex,1);
        } else {
            $gameParty.gainItem($dataWeapons[mixIndex],1);
        }
    } else if (mixIndex < al) {
        pr = Math.random();
        if (pr > probability) { //获得概率实现
            LastIndex = getName.length - 1;
            RSSD_RandomItems.rMix.armor.splice(LastIndex,1);
        } else {
            $gameParty.gainItem($dataArmors[mixIndex],1);
        }
    } else if (mixIndex < sl) {
        customRandomSkillTarget();
    }
}

RSSD_RandomItems.randomMixCheck = function () {
    if (RSSD_RandomItems.rMix.item.length == 1) {
        RSSD_RandomItems.rMix.item = RSSD_RandomItems.rMix.item[0];
    } else if (RSSD_RandomItems.rMix.weapon.length == 1) {
        RSSD_RandomItems.rMix.weapon = RSSD_RandomItems.rMix.weapon[0];
    }
}

function checkCondition(num,cm,probability) {
    //检查金钱是否自定义
    money = cm === undefined ? RSSD_RandomItems.price : cm;
    //num 为 0 时，检查最大最小数量是否自定义
    if (num === 0) {
        var maxAmount = RSSD_RandomItems.customMax === undefined ? RSSD_RandomItems.randomMax : RSSD_RandomItems.customMax;
        var minAmount = RSSD_RandomItems.customMin === undefined ? RSSD_RandomItems.randomMin : RSSD_RandomItems.customMin;
        maxAmount = maxAmount - minAmount + 1;
        var num = num === 0 ? Math.floor(minAmount + Math.random()*maxAmount) : num;
        RSSD_RandomItems.randomAmount = num;    // 若为随机数量，则将数量存储到RSSD_RandomItems.randomAmount
    }
    //随机获取概率：
    if (probability === 0) {
        MaxP = RSSD_RandomItems.customMaxP === undefined ? 1 : RSSD_RandomItems.customMaxP;
        MinP = RSSD_RandomItems.customMinP === undefined ? 0 : RSSD_RandomItems.customMinP;
        probability = Math.random()*(MaxP - MinP) + MinP;
    } else if (probability > 1 || isNaN(probability) || probability === undefined) {
        probability = 1;
    }
}

function clearCustom() {
    delete RSSD_RandomItems.customPrice;
    delete RSSD_RandomItems.customMax;
    delete RSSD_RandomItems.customMin;
    delete RSSD_RandomItems.customProbability;
    delete RSSD_RandomItems.customMaxP;
    delete RSSD_RandomItems.customMinP;
}

//自定义随机数量上限
RSSD_RandomItems.setMaxRandomAmount = function (amount) {
    RSSD_RandomItems.customMax = amount;
}

//自定义随机数量下限
RSSD_RandomItems.setMinRandomAmount = function (amount) {
    RSSD_RandomItems.customMin = amount;
}

//自定义随机概率上限
RSSD_RandomItems.setMaxRandomProbability = function (probability) {
    RSSD_RandomItems.customMaxP = probability;
}

//自定义随机概率下限
RSSD_RandomItems.setMinRandomProbability = function (probability) {
    RSSD_RandomItems.customMinP = probability;
}

/**小功能：获取对象的属性数量 */
function objectAttributesAmount(obj) {
    var count = 0;
    for (var i in obj) {
        count++;
    }
    return count;
}

/**小功能：清空对象 */
function clearAllAttributes(obj) {
    for (let key in obj) {
        delete obj[key];
    }
}

/**防止重复。若重复，则给属性amount加1 */
function attributeIsRepeated(obj,obj2,attribute) {   //obj是第二层对象，attribute是第三层对象
    for (let key in obj) {
        if (obj[key] == obj2[attribute] && key != attribute) {
            return key;
        }
    }
}
