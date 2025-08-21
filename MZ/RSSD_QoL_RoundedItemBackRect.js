//=============================================================================================
// RSSD_QoL_RoundedItemBackRect.js
// Author: Rose_shadows
//=============================================================================================
/*:
 * @plugindesc 1.0.0 - 游戏细节改善 - 圆角的窗口选项背景
 * @author Rose_shadows
 * @target MZ
 * @help
 * 将窗口选项背景的形状由矩形变为圆角矩形。
 * 
 * 该插件即插即用。请把该插件放到最靠上的位置。
 * 插件参数中可以设置具体设置。
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT 协议
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 * 
 * @param 圆角半径
 * @type number
 * @desc 窗口选项背景圆角的半径。单位像素。默认为10。
 * @default 10
 * 
 * 
 */

var Imported = Imported || {};
Imported.RSSD_QoL_RoundedItemBackRect = true;

var RSSD = RSSD || {};
RSSD.QoL_RIBR = {};
RSSD.QoL_RIBR.pluginName = 'RSSD_QoL_RoundedItemBackRect';

RSSD.QoL_RIBR.parameters = PluginManager.parameters(RSSD.QoL_RIBR.pluginName);
RSSD.QoL_RIBR.radius = +(RSSD.QoL_RIBR.parameters['圆角半径'] || '10');

//==============================================================================
// Bitmap
//==============================================================================

Bitmap.prototype.__private_RSSD_QoL_RIBR_strokeRoundRect = function(
    x, y, width, height, radius, color
) {
    const context = this.context;
    context.fillStyle = color;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.stroke();
};

Bitmap.prototype.__private_RSSD_QoL_RIBR_gradientFillRoundRect = function(
    x, y, width, height, radius, color1, color2, vertical
) {
    const context = this.context;
    const x1 = vertical ? x : x + width;
    const y1 = vertical ? y + height : y;
    const grad = context.createLinearGradient(x, y, x1, y1);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
    context.restore();
    this._baseTexture.update();
};

//==============================================================================
// Window_Selectable
//==============================================================================

// Override
Window_Selectable.prototype.drawBackgroundRect = function(rect) {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    const radius = RSSD.QoL_RIBR.radius;
    this.contentsBack.__private_RSSD_QoL_RIBR_gradientFillRoundRect(x, y, w, h, radius, c1, c2, true);
    this.contentsBack.__private_RSSD_QoL_RIBR_strokeRoundRect(x, y, w, h, radius, c1);
};