//=============================================================================
// RSSD_HiddenParams.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.1.2 - 自定义隐藏属性
 * @author Rose_shadows
 * @target MV MZ
 * @help
 * === 介绍 ===
 * 
 * 该插件允许你为角色/敌人设置额外的隐藏属性。
 * 
 * 
 * === 特性 ===
 * 
 * 1. 属性可以附加在角色、职业、物品、武器、防具、技能、敌人、状态上，
 *    在使用物品/技能、更换武器/防具、增减状态、更改职业时可以实时更改属性值。
 * 2. 可以在伤害公式中使用所设置的隐藏属性。
 * 3. 可以通过插件指令/脚本更改指定角色的指定属性。
 * 4. 可以使用控制字符显示指定属性的属性名和属性值。
 * 5. 版本 1.1.0 起，对于 MV ，可以使用 YEP_StatusMenuCore.js 显示属性。
 * 
 * 
 * === 使用方法 - 插件参数 ===
 * 
 * 首先，在插件参数中的“隐藏属性列表”中设置隐藏属性。
 * 
 * “属性名” - 使用控制字符时显示的属性名称，例：魔法攻击
 * “属性短名” - 每个属性的标识符。例：mat
 * “默认值” - 没有设置标签时的默认值
 * 
 * 其中，“属性短名”主要由小写字母组成，不能为空，且必须独一无二。
 * 属性短名不能是 hp、mp、tp。
 * 如果在 MV 工程使用 YEP_StatusMenuCore.js 显示属性，
 * 属性短名也不能是数据库中已有的任何一种属性。
 * 
 * 
 * === 使用方法 - 数据库标签 ===
 * 
 * 该插件通过在备注栏中书写标签来设置属性值。
 * 在角色、职业、物品、武器、防具、技能、敌人、状态备注栏中如下记述标签：
 * <p_[SHORT_NAME]:VALUE>
 * 其中，[SHORT_NAME]是隐藏属性的属性短名，VALUE是附加值。
 * 
 * 例如，如果一个属性的短名是“np”，现在想让角色在装备武器#3时增长100点“np”值，
 * 则在武器#3的备注栏中如下书写：
 * <p_np:100>
 * 如果想减少属性值，只需设置负数即可。
 * 
 * 另外，“p_”是标签名的前缀，如果与其他插件产生不兼容性，可以在插件参数列表中
 * 更改。
 * 
 * 
 * === 伤害公式 ===
 * 
 * 和“a.atk”“b.mat”类似，你可以使用 a._SHORT_NAME 来调用当前的属性值。
 * 
 * 例如，如果一个属性的短名是“np”，要获取使用者的该属性值，
 * 就在伤害公式中如下书写：
 * a._np
 * 
 * 
 * === 控制字符 ===
 * 
 * 在对话框中显示属性名：
 *   \HCPN[SHORT_NAME]
 * SHORT_NAME - 属性短名
 * 
 * 例如：
 *   \HCPN[np]
 * - 显示短名为 np 的属性的名称
 * 
 * 在对话框中显示指定角色/敌人的指定属性值：
 *   \HCPV[TYPE,INDEX,SHORT_NAME]
 * TYPE - 战斗者类型。a = 角色，e = 敌人(仅用于战斗中，否则忽略)
 * INDEX - 索引。TYPE 若为 a，则是角色ID，若为 e，则是敌人敌群索引
 * SHORT_NAME - 属性短名
 * 
 * 例如：
 *   \HCPV[a,1,np]
 * - 显示 角色#1 的短名为 np 的属性值
 * 
 * 
 * === 在状态界面显示属性 (MV) ===
 * 
 * 版本 1.1.0 起与 YEP_StatusMenuCore.js 插件相兼容。
 * 
 * 请将该插件放在 YEP_StatusMenuCore.js 插件以下。
 * 
 * 在该插件的插件参数中设置好相关参数后，打开 YEP_StatusMenuCore.js，
 * 找到“Attribute”（属性）参数设置区，在任一一列参数中添加属性短名，
 * 即可在状态界面的 Attribute 栏看到所添加的属性。
 * 
 * 
 * === MV 插件指令 ===
 * 
 * ::RSSD_HP change {TYPE} {INDEX} {SHORT_NAME} {VALUE}
 * - 增减指定人物的指定属性值。
 *   {TYPE} - 战斗者类型。actor = 角色；enemy = 敌人(仅用于战斗)
 *   {INDEX} - 索引。{TYPE}若为 actor，则是角色ID；
 *             若为 enemy，则是敌人索引(仅用于战斗)
 *   {SHORT_NAME} - 属性短名
 *   {VALUE} - 要更改的属性值
 * 
 * 
 * === 脚本 ===
 * 
 * 提前说明，以下出现的 character 是 $gameActors.actor(actorId)
 * 或 $gameTroop.members()[enemyIndex]
 * 或 $gameParty.members()[memberIndex] 对象
 * 
 * character.changeCusparam(SHORT_NAME, VALUE);
 * - 给人物的短名为 SHORT_NAME 的属性值增加 VALUE 。
 *   如果 VALUE 是负数，就是减少属性值。
 * 
 * character.cusparam(SHORT_NAME)
 * - 获取人物的短名为 SHORT_NAME 的属性总值。
 * 
 * character.initialCusparam(SHORT_NAME)
 * - 获取人物默认的短名为 SHORT_NAME 的属性值。
 * 
 * character.stateCusparam(SHORT_NAME)
 * - 获取人物通过状态增减的短名为 SHORT_NAME 的属性值。
 * 
 * character.itemCusparam(SHORT_NAME)
 * - 获取人物通过技能/物品增减的短名为 SHORT_NAME 的属性值。
 * 
 * character.plusCusparam(SHORT_NAME)
 * - 获取人物通过插件指令/脚本增减的短名为 SHORT_NAME 的属性值。
 * 
 * character.equipCusparam(SHORT_NAME)
 * - 获取人物通过装备增减的短名为 SHORT_NAME 的属性值。
 * 
 * character.classCusparam(SHORT_NAME)
 * - 获取人物通过职业增减的短名为 SHORT_NAME 的属性值。
 * 
 * TextManager.cusparamName(SHORT_NAME)
 * - 获取短名为 SHORT_NAME 的属性名称。
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT协议
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 * 1.0.1 - 更新插件参数结构，添加设置属性上限和下限值的功能。
 * 1.0.2 - 对浮点数属性添加辅助功能，新增浮点数精度插件参数。
 * 1.1.0 - 兼容 YEP_StatusMenuCore.js 可在状态界面添加属性。
 *         修复属性上限和下限值的 Bug，更新帮助文本。
 * 1.1.2 - 更新插件参数结构，添加为每个数据库对象单独设置默认值的功能。
 *         修复用脚本获取通过装备、技能、状态等单独增减的属性值时小数不精确
 *         的问题，更新帮助文本。
 * 
 * 
 * @command Change Cusparam
 * @text 增减隐藏属性值
 * @desc 通过插件指令增减属性值。
 * 
 * @arg Param Short Name
 * @text 隐藏属性短名
 * @desc 隐藏属性的短名。
 * @default 
 * 
 * @arg Value
 * @text 增减值
 * @type number
 * @desc 增减的属性值。若为负数就是减少属性值。
 * @default 0
 * 
 * @arg Target
 * @text 作用对象
 * @type select
 * @option 角色
 * @value actor
 * @option 敌人(仅用于战斗中)
 * @value enemy
 * @desc 增减属性值的对象。
 * @default actor
 * 
 * @arg Index
 * @text 索引
 * @type number
 * @desc 作用对象索引。作用对象若为角色，则是角色ID；若为敌人，则是敌人在敌群中的索引。注意，敌群索引从 0 开始。
 * @default 1
 * 
 * @param Tag Prefix
 * @text 标签前缀
 * @desc 写在数据库备注栏中的标签前缀。防止产生不兼容性。
 * @default p_
 * 
 * @param Float Num Acc
 * @text 浮点数精度
 * @type number
 * @desc 如果属性值是浮点数，则保留多少位小数。
 * @default 3
 * 
 * @param Param List
 * @text 隐藏属性列表
 * @type struct<paramConfig>[]
 * @desc 设置隐藏属性的列表。
 * @default []
 */
/*~struct~paramConfig:
 * @param Name
 * @text 属性名
 * @desc 属性的名称。如“魔法攻击”。
 * @default 
 * 
 * @param Short Name
 * @text 属性短名
 * @desc 属性的短名。主要由小写字母组成，不能为空，且必须是独一无二的。例如“mat”。
 * @default cus
 * 
 * @param Min
 * @text 最小值
 * @desc 属性的最小值。若为空则不限制。
 * @default 
 * 
 * @param Max
 * @text 最大值
 * @desc 属性的最大值。若为空则不限制。
 * @default 
 * 
 * @param 默认值设置
 * @default ==============================
 * 
 * @param Initial Actor Value
 * @text 角色默认值
 * @parent 默认值设置
 * @desc 角色备注栏没有用标签设置的情况下，该角色的默认值。默认是0。
 * @default 0
 * 
 * @param Initial Enemy Value
 * @text 敌人默认值
 * @parent 默认值设置
 * @desc 敌人备注栏没有用标签设置的情况下，该敌人的默认值。默认是0。
 * @default 0
 * 
 * @param Initial Class Value
 * @text 职业默认值
 * @parent 默认值设置
 * @desc 职业备注栏没有用标签设置的情况下，成为该职业时默认变更的值。默认是0。
 * @default 0
 * 
 * @param Initial Skill Value
 * @text 技能默认值
 * @parent 默认值设置
 * @desc 技能备注栏没有用标签设置的情况下，使用该技能时默认变更的值。默认是0。
 * @default 0
 * 
 * @param Initial Item Value
 * @text 物品默认值
 * @parent 默认值设置
 * @desc 物品备注栏没有用标签设置的情况下，使用该物品时默认变更的值。默认是0。
 * @default 0
 * 
 * @param Initial Weapon Value
 * @text 武器默认值
 * @parent 默认值设置
 * @desc 武器备注栏没有用标签设置的情况下，装备该武器时默认变更的值。默认是0。
 * @default 0
 * 
 * @param Initial Armor Value
 * @text 防具默认值
 * @parent 默认值设置
 * @desc 防具备注栏没有用标签设置的情况下，装备该防具时默认变更的值。默认是0。
 * @default 0
 * 
 * @param Initial State Value
 * @text 状态默认值
 * @parent 默认值设置
 * @desc 状态备注栏没有用标签设置的情况下，获得该状态时默认变更的值。默认是0。
 * @default 0
 * 
 * @param YEP状态界面兼容
 * @default ==============================
 * 
 * @param is Rate
 * @text 是否为概率
 * @parent YEP状态界面兼容
 * @type boolean
 * @desc 属性是否为概率属性。如果使用 YEP_StatusMenuCore.js，该参数会影响显示属性的方式，不用则没有用处。
 * @default false
 * 
 * @param Name Layout
 * @text 属性名显示设置
 * @parent YEP状态界面兼容
 * @desc 显示的属性名的设置。可以使用颜色/图标等控制字符。${N}会替换成该属性的属性名。若为空则只显示属性名。
 * @default 
 * 
 * @param Value Color
 * @text 属性值颜色
 * @parent YEP状态界面兼容
 * @desc 显示的属性值的颜色代码数字。若为空则保持默认。
 * @default 
 */

var Imported = Imported || {};
Imported.RSSD_HP = true;

var RSSD = RSSD || {};
RSSD.HP = {};

RSSD.HP.pluginName = 'RSSD_HiddenParams';

(function(_){
    var parameters = PluginManager.parameters(_.pluginName);
    _.prefix = parameters['Tag Prefix'] || '';
    _.floatAcc = +parameters['Float Num Acc'] || 3;

    var plist = JSON.parse(parameters['Param List']) || [];
    _.paramList = {};
    plist.forEach((item)=>{
        var obj         = JSON.parse(item);
        var name        = obj['Name'] || '';
        var s_name      = obj['Short Name'];
        var min         = obj['Min'] !== '' ? +obj['Min'] : null;
        var max         = obj['Max'] !== '' ? +obj['Max'] : null;
        var isRate      = obj['is Rate'] === 'true' ? true : false;
        var nameLayout  = obj['Name Layout'] || '';
        var valueColor  = obj['Value Color'] !== '' ? +obj['Value Color'] : null;
        var init_actor  = +obj['Initial Actor Value'] || 0;
        var init_enemy  = +obj['Initial Enemy Value'] || 0;
        var init_class  = +obj['Initial Class Value'] || 0;
        var init_item   = +obj['Initial Item Value'] || 0;
        var init_skill  = +obj['Initial Skill Value'] || 0;
        var init_weapon = +obj['Initial Weapon Value'] || 0;
        var init_armor  = +obj['Initial Armor Value'] || 0;
        var init_state  = +obj['Initial State Value'] || 0;
        _.paramList[s_name] = {'name': name, 'min': min, 'max': max, 'isRate': isRate, 'nameL': nameLayout, 'vColor': valueColor,
        'initActor': init_actor, 'initEnemy': init_enemy, 'initClass': init_class, 'initItem': init_item, 'initSkill': init_skill, 'initWeapon': init_weapon, 'initArmor': init_armor, 'initState': init_state};
    });

    _.getShortNamesByName = function(name) {
        var arr = [];
        var keys = Object.keys(_.paramList);
        for(var i = 0; i < keys.length; i++) {
            var curObj = _.paramList[keys[i]];
            if(curObj.name == name) {
                arr.push(keys[i]);
            }
        };
        if(JSON.stringify(arr) === '[]') return null;
        return arr;
    };

    _.parseForFloat = function(num, acc=_.floatAcc) {
        var accStr = '1';
        for(var i = 0; i < acc; i++) {
            accStr += '0';
        };
        var accNum = Number(accStr);
        return +(Math.floor(num * accNum) / accNum).toFixed(acc);
    };

    /**Param Registeration */

    var __Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
        this.registerCusparams();
        __Game_BattlerBase_initMembers.call(this);
    };

    Game_BattlerBase.prototype.registerCusparams = function() {
        var keys = Object.keys(_.paramList);
        for(var i = 0; i < keys.length; i++) {
            var s_name = keys[i];
            this['_'+s_name] = 0;
        };
    };

    Game_BattlerBase.prototype.cusparam = function(s_name){
        return this['_'+s_name];
    };

    Game_BattlerBase.prototype.initialCusparam = function(s_name) {
        var base = this.isActor() ? this.actor() : this.enemy();
        var tagName = _.prefix + s_name;
        var init_value = this.isActor() ? _.paramList[s_name].initActor : _.paramList[s_name].initEnemy;
        return _.parseForFloat(+base.meta[tagName]) || _.parseForFloat(init_value);
    };

    /**Param's Game Object */

    var __Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        __Game_Battler_initMembers.call(this);
        this.refreshCusparamSettings();
    };

    Game_Battler.prototype.refreshCusparamSettings = function() {
        this._cusparamSettings = {};
        var keys = Object.keys(_.paramList);
        for(var i = 0; i < keys.length; i++){
            var s_name = keys[i];
            this._cusparamSettings[s_name] = {_item: 0, _state: 0, _class: 0, _equip: 0, _plus: 0}
        }
    };

    /**States */

    var __Game_Battler_addState = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function(stateId){
        this.applyAddStateCusparam(stateId);
        __Game_Battler_addState.call(this, stateId);
    };

    var __Game_Battler_removeState = Game_Battler.prototype.removeState;
    Game_Battler.prototype.removeState = function(stateId) {
        this.applyRemoveStateCusparam(stateId)
        __Game_Battler_removeState.call(this, stateId);
    };

    Game_Battler.prototype.applyAddStateCusparam = function(stateId) {
        if(this.isStateAddable(stateId)) {
            var keys = Object.keys(_.paramList);
            var state = $dataStates[stateId];
            for(var i = 0; i < keys.length; i++){
                var s_name = keys[i];
                var tagName = _.prefix + s_name;
                var init_value = _.paramList[s_name].initState;
                this._cusparamSettings[s_name]._state += +state.meta[tagName] || init_value;
            }
        }
    };

    Game_Battler.prototype.applyRemoveStateCusparam = function(stateId) {
        if (this.isStateAffected(stateId)) {
            var keys = Object.keys(_.paramList);
            var state = $dataStates[stateId];
            for(var i = 0; i < keys.length; i++){
                var s_name = keys[i];
                var tagName = _.prefix + s_name;
                var init_value = _.paramList[s_name].initState;
                this._cusparamSettings[s_name]._state -= +state.meta[tagName] || init_value;
            }
        }
    };

    var __Game_Battler_refresh = Game_Battler.prototype.refresh;
    Game_Battler.prototype.refresh = function(){
        __Game_Battler_refresh.call(this);
        this.refreshCusparams();
    };

    Game_Battler.prototype.changeCusparam = function(s_name, variant) {
        var cusparam = this._cusparamSettings[s_name];
        cusparam._plus += variant || 0;
        this.refreshCusparam(s_name);
    };

    Game_Battler.prototype.refreshCusparams = function() {
        var keys = Object.keys(_.paramList);
        for(var i = 0; i < keys.length; i++){
            var s_name = keys[i];
            this.refreshCusparam(s_name);
        }
    };

    Game_Battler.prototype.refreshCusparam = function(s_name) {
        this['_'+s_name] = this.cusparam(s_name);
    };

    Game_Battler.prototype.cusparam = function(s_name) {
        var value = this.initialCusparam(s_name) + this.stateCusparam(s_name) + this.itemCusparam(s_name) + this.plusCusparam(s_name);
        var min = _.paramList[s_name].min;
        var max = _.paramList[s_name].max;
        if(min !== null && max !== null) value = value.clamp(min, max);
        else if(min === null && max !== null) value = Math.min(max, value);
        else if(max === null && min !== null) value = Math.max(min, value);
        return value;
    };

    Game_Battler.prototype.stateCusparam = function(s_name) {
        var cusparam = this._cusparamSettings[s_name];
        return _.parseForFloat(cusparam._state);
    };

    Game_Battler.prototype.itemCusparam = function(s_name) {
        var cusparam = this._cusparamSettings[s_name];
        return _.parseForFloat(cusparam._item);
    };

    Game_Battler.prototype.plusCusparam = function(s_name) {
        var cusparam = this._cusparamSettings[s_name];
        return _.parseForFloat(cusparam._plus);
    };

    /**Items & Skills */

    var __Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        __Game_Action_apply.call(this, target);
        this.applyCusparamEffect(target);
    };

    Game_Action.prototype.applyCusparamEffect = function(target) {
        var base = target;
        var item = this.item();
        var keys = Object.keys(_.paramList);
        for(var i = 0; i < keys.length; i++) {
            var s_name = keys[i];
            var tagName = _.prefix + s_name;
            var init_value = this.isItem() ? _.paramList[s_name].initItem :  _.paramList[s_name].initSkill;
            base._cusparamSettings[s_name]._item += +item.meta[tagName] || init_value;
        }
    };

    /**Equips & Classes */
    
    var __Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        __Game_Actor_initMembers.call(this);
        this._classCusparamFlag = true;
        this._equipCusparamFlag = false;
    };

    var __Game_Actor_initEquips = Game_Actor.prototype.initEquips;
    Game_Actor.prototype.initEquips = function(equips){
        this._equipCusparamFlag = true;
        __Game_Actor_initEquips.call(this, equips);
    };
    
    var __Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        if (!item || this.equipSlots()[slotId] === item.etypeId) {
            this.applyRemovePrevEquipCusparam(slotId);
        }
        this._equipCusparamFlag = true;
        __Game_Actor_changeEquip.call(this, slotId, item);
    };

    var __Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
    Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
        this.applyRemovePrevEquipCusparam(slotId);
        this._equipCusparamFlag = true;
        __Game_Actor_forceChangeEquip.call(this, slotId, item);
    };

    Game_Actor.prototype.applyRemovePrevEquipCusparam = function(slotId){
        var old = this.equips()[slotId];
        var keys = Object.keys(_.paramList);
        for(var i = 0; i < keys.length; i++){
            var s_name = keys[i];
            var tagName = _.prefix + s_name;
            var init_value = DataManager.isWeapon(old) ? _.paramList[s_name].initWeapon : _.paramList[s_name].initArmor;
            if(old){
                this._cusparamSettings[s_name]._equip -= +old.meta[tagName] || init_value;
            }
        }
    };

    var __Game_Actor_changeClass = Game_Actor.prototype.changeClass;
    Game_Actor.prototype.changeClass = function(classId, keepExp) {
        this.applyReplacePrevClassCusparam();
        this._classCusparamFlag = true;
        __Game_Actor_changeClass.call(this, classId, keepExp);
    };

    Game_Actor.prototype.applyReplacePrevClassCusparam = function(){
        var prev = this.currentClass();
        var keys = Object.keys(_.paramList);
        for(var i = 0; i < keys.length; i++){
            var s_name = keys[i];
            var tagName = _.prefix + s_name;
            var init_value = _.paramList[s_name].initClass;
            this._cusparamSettings[s_name]._class -= +prev.meta[tagName] || init_value;
        }
    };

    var __Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function(){
        if(this._equipCusparamFlag) {
            this.refreshEquipCusparams();
            this._equipCusparamFlag = false;
        }
        if(this._classCusparamFlag) {
            this.refreshClassCusparams();
            this._classCusparamFlag = false;
        }
        __Game_Actor_refresh.call(this);
    };

    Game_Actor.prototype.refreshEquipCusparams = function() {
        var keys = Object.keys(_.paramList);
        for(var i = 0; i < keys.length; i++){
            var s_name = keys[i];
            var value = this.equipCusparamValue(s_name);
            this._cusparamSettings[s_name]._equip = value;
        }
    };
    
    Game_Actor.prototype.refreshClassCusparams = function() {
        var cl = this.currentClass();
        var keys = Object.keys(_.paramList);
        for(var i = 0; i < keys.length; i++){
            var s_name = keys[i];
            var tagName = _.prefix + s_name;
            var init_value = _.paramList[s_name].initClass;
            this._cusparamSettings[s_name]._class = +cl.meta[tagName] || init_value;
        }
    };

    Game_Actor.prototype.equipCusparamValue = function(s_name) {
        var value = 0;
        for(var i = 0; i < this.equips().length; i++) {
            var item = this.equips()[i];
            var tagName = _.prefix + s_name;
            var init_value = DataManager.isWeapon(item) ? _.paramList[s_name].initWeapon : _.paramList[s_name].initArmor;
            if(item){
                value += +item.meta[tagName] || init_value;
            }
        };
        return value;
    };

    Game_Actor.prototype.classCusparam = function(s_name) {
        var cusparam = this._cusparamSettings[s_name];
        return _.parseForFloat(cusparam._class);
    };

    Game_Actor.prototype.equipCusparam = function(s_name) {
        var cusparam = this._cusparamSettings[s_name];
        return _.parseForFloat(cusparam._equip);
    };

    Game_Actor.prototype.cusparam = function(s_name) {
        var value = this.initialCusparam(s_name) + this.stateCusparam(s_name) + this.itemCusparam(s_name) + this.classCusparam(s_name) + this.equipCusparam(s_name) + this.plusCusparam(s_name);
        var min = _.paramList[s_name].min;
        var max = _.paramList[s_name].max;
        if(min !== null && max !== null) value = value.clamp(min, max);
        else if(min === null && max !== null) value = Math.min(max, value);
        else if(max === null && min !== null) value = Math.max(min, value);
        return value;
    };

    /**Name Text */

    TextManager.cusparamName = function(s_name){
        return _.paramList[s_name].name;
    };

    /**Escape Codes */

    var __Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = __Window_Base_convertEscapeCharacters.call(this, text);
        text = text.replace(/\x1bHCPN\[(\S+)\]/gi, function() {
            return TextManager.cusparamName(arguments[1]);
        }.bind(this));
        text = text.replace(/\x1bHCPV\[(\S+)\]/gi, function() {
            var args = arguments[1].split(',') || [];
            var type = args[0] || 'a', id = +args[1], s_name = args[2];
            var obj = null;
            switch(type.toLowerCase()){
                case 'a':
                    obj = $gameActors.actor(id);
                    break;
                case 'e':
                    if($gameParty.inBattle()){
                        obj = $gameTroop.members()[id];
                    }
                    break;
            }
            if(obj) return obj['_'+s_name];
            return '';
        }.bind(this));
        return text;
    };

    /**Plugin Command */

    if(Utils.RPGMAKER_NAME === 'MZ') {
        PluginManager.registerCommand(_.pluginName, 'Change Cusparam', (args)=>{
            let obj = null;
            let id = +args['Index'];
            switch(args['Target']) {
                case 'actor':
                    obj = $gameActors.actor(id);
                    break;
                case 'enemy':
                    if($gameParty.inBattle()){
                        obj = $gameTroop.members()[id];
                    }
                    break;
            }
            let s_name = args['Param Short Name'];
            let value = +args['Value'];
            if(obj) obj.changeCusparam(s_name, value);
        })
    } else {    
        var __Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args){
            __Game_Interpreter_pluginCommand.call(this, command, args);
            if(command === '::RSSD_HP') {
                if(args[0].toLowerCase() == 'change') {
                    var obj = null;
                    var id = +args[2];
                    switch(args[1].toLowerCase()) {
                        case 'actor':
                            obj = $gameActors.actor(id);
                            break;
                        case 'enemy':
                            if($gameParty.inBattle()){
                                obj = $gameTroop.members()[id];
                            }
                            break;
                    }
                    var s_name = args[3];
                    var value = +args[4] || 0;
                    if(obj) obj.changeCusparam(s_name, value);
                }
            }
        }
    };

    /**Compatibility with YEP_StatusMenuCore.js */
    if(Imported.YEP_StatusMenuCore){
        var __Window_StatusInfo_initialize = Window_StatusInfo.prototype.initialize;
        Window_StatusInfo.prototype.initialize = function(y, commandWindow){
            __Window_StatusInfo_initialize.call(this, y, commandWindow);
            this.refreshCusparamAttr();
        };

        Window_StatusInfo.prototype.refreshCusparamAttr = function() {
            this._currentCusparam = '';
            this._cusparamValueColorChangeFlag = false;
        };

        // Inspired by Caethyril
        var __Window_StatusInfo_drawAttributeData = Window_StatusInfo.prototype.drawAttributeData;
        Window_StatusInfo.prototype.drawAttributeData = function(attr, dx, dy, dw) {
            var keys = Object.keys(_.paramList);
            var i = keys.indexOf(attr);
            if(i >= 0){
                var s_name = attr;
                var name = _.paramList[s_name].nameL ? _.paramList[s_name].nameL.replace('${N}', TextManager.cusparamName(s_name)) : TextManager.cusparamName(s_name);
                var value = this._actor.cusparam(s_name);
                this.drawAttributeName(name, dx, dy, dw);
                var isRate = _.paramList[s_name].isRate;
                this._currentCusparam = s_name;
                this._cusparamValueColorChangeFlag = true;
                if(isRate){
                    this.drawAttributeRate(value, dx, dy, dw);
                }else {
                    this.drawAttributeValue(value, dx, dy, dw);
                }
            } else {
                __Window_StatusInfo_drawAttributeData.call(this, attr, dx, dy, dw);
            }
        };

        var __Window_StatusInfo_drawAttributeValue = Window_StatusInfo.prototype.drawAttributeValue;
        Window_StatusInfo.prototype.drawAttributeValue = function(value, dx, dy, dw) {
            this.changeCusparamValueColor();
            __Window_StatusInfo_drawAttributeValue.call(this, value, dx, dy, dw);
        };

        Window_StatusInfo.prototype.changeCusparamValueColor = function() {
            if(this._currentCusparam && this._cusparamValueColorChangeFlag) {
                let s_name = this._currentCusparam;
                let colorId = _.paramList[s_name].vColor;
                if(colorId !== null) {
                    this.changeTextColor(this.textColor(colorId));
                }
            }
            this.refreshCusparamAttr();
        };
    };
    
}(RSSD.HP));