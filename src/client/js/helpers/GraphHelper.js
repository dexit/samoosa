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
     */
    static drawLine(ctx, fromX, fromY, toX, toY) {
       ctx.moveTo(fromX, fromY);
       ctx.lineTo(toX, toY);
       ctx.stroke();
    }

    /**
     * Draws a circle
     *
     * @param {Context} ctx
     */
    static drawCircle(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
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
