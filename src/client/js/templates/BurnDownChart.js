'use strict';

module.exports = function render() {
    let milestone = this.getCurrentMilestone();
    let totalDays = milestone.getTotalDays();
    let totalHours = milestone.getTotalEstimatedHours();
    let milestoneStart = new Date(milestone.startDate);
    let milestoneEnd = new Date(milestone.endDate);

    const CANVAS_HEIGHT = 400;
    const CANVAS_WIDTH = 800;
    const CANVAS_MARGIN = 10;

    let optimalHours = this.getOptimalHours();

    let $canvas = _.canvas({width: CANVAS_WIDTH, height: CANVAS_HEIGHT});
    let ctx = $canvas[0].getContext('2d');

    /**
     * Draws the grid
     */
    let drawGrid = () => {
        let xDivider = totalDays - 1;
        if(xDivider < 1) { xDivider = 1; }
        
        let xUnit = (CANVAS_WIDTH - (CANVAS_MARGIN * 2)) / xDivider;
        let yUnit = (CANVAS_HEIGHT - (CANVAS_MARGIN * 2));
        
        for(let i in optimalHours) {
            let x = CANVAS_MARGIN + i * xUnit;
            let y = CANVAS_MARGIN + (1 - optimalHours[i] / totalHours) * yUnit;

            GraphHelper.drawLine(ctx, x, CANVAS_MARGIN, x, CANVAS_HEIGHT - CANVAS_MARGIN);
            GraphHelper.drawLine(ctx, CANVAS_MARGIN, y, CANVAS_WIDTH - CANVAS_MARGIN, y);
        }
    };

    /**
     * Draws the optimal hours
     */
    let drawOptimalHours = () => {
        let xDivider = totalDays - 1;
        if(xDivider < 1) { xDivider = 1; }
        
        let xUnit = (CANVAS_WIDTH - (CANVAS_MARGIN * 2)) / xDivider;
        let yUnit = (CANVAS_HEIGHT - (CANVAS_MARGIN * 2));

        for(let i in optimalHours) {
            if(i == 0) { continue; }

            let startX = CANVAS_MARGIN + (i - 1) * xUnit;
            let startY = CANVAS_MARGIN + (1 - optimalHours[i - 1] / totalHours) * yUnit;

            let endX = CANVAS_MARGIN + i * xUnit;
            let endY = CANVAS_MARGIN + (1 - optimalHours[i] / totalHours) * yUnit;

            GraphHelper.drawCircle(ctx, startX, startY, 5);

            if(i >= optimalHours.length - 1) {
                GraphHelper.drawCircle(ctx, endX, endY, 5);
            }

            GraphHelper.drawLine(ctx, startX, startY, endX, endY);
        }
    };

    return _.div({class: 'burndown-chart analytics-body'},
        _.div({class: 'toolbar'},
            _.select({class: 'milestone-picker'},
                _.each(resources.milestones, (i, milestone) => {
                    return _.option({value: milestone.index}, milestone.title);
                })
            ).val(milestone ? milestone.index : 0).change((e) => { this.onChangeMilestonePicker($(e.target).val()); })
        ),
        _.div({class: 'graph'},
            _.p('Total task estimates: ' + totalHours),
            _.p('Milestone start: ' + milestoneStart),
            _.p('Milestone end: ' + milestoneEnd),

            $canvas,
            drawGrid(),
            drawOptimalHours()
        )
    );
}
