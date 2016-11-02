'use strict';

class GraphHelper {
    /**
     * Draws a line
     *
     * @param {Context} ctx
     * @param {Number} fromX
     * @param {Number} fromY
     * @param {Number} toX
     * @param {Number} toY
     * @param {Number} lineWidth
     * @param {String} strokeColor
     */
    static drawLine(ctx, fromX, fromY, toX, toY, lineWidth = 2, strokeColor = '#000000') {
       ctx.moveTo(fromX, fromY);
       ctx.lineTo(toX, toY);
       ctx.lineWidth = lineWidth;
       ctx.strokeStyle = strokeColor;
       ctx.stroke();
    }

    /**
     * Draws a circle
     *
     * @param {Context} ctx
     */
    static drawCircle(ctx, x, y, radius = 4, fillColor = '#000000') {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    /**
     * Draws a string
     *
     * @param {Context} ctx
     */
    static drawText(ctx, x, y, string, size) {
        ctx.font = size + 'px Arial';
        ctx.fillText(string, x, y);
    }
}

module.exports = GraphHelper;
