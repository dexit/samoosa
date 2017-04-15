'use strict';

module.exports = function render() {
    let milestone = this.getCurrentMilestone();

    if(!milestone) {
        return _.div({class: 'burndown-chart analytics-body'},
            _.h4('There are no milestones defined in this repository')
        );
    }

    let totalDays = milestone.getTotalDays();
    let totalHours = milestone.getTotalEstimatedHours();
    let milestoneStart = milestone.getStartDate();
    let milestoneEnd = milestone.getEndDate();

    let CANVAS_HEIGHT_UNIT = 400 / Math.ceil(totalHours);
    
    let CANVAS_WIDTH_UNIT = 40;

    let optimalHours = this.getOptimalHours();
    let actualHours = this.getActualHours();

    let $canvas = _.canvas({width: CANVAS_WIDTH_UNIT * totalDays, height: CANVAS_HEIGHT_UNIT * totalHours});
    let ctx = $canvas[0].getContext('2d');

    let gridDrawTimer;
    let hoursDrawTimer;

    /**
     * Draws the grid
     */
    let drawGrid = () => {
        let drawNext = (x) => {
            let xPos = x * CANVAS_WIDTH_UNIT;

            GraphHelper.drawLine(ctx, xPos, 0, xPos, CANVAS_HEIGHT_UNIT * totalHours, 1, '#999999');

            if(x < totalDays) {
                gridDrawTimer = setTimeout(() => { drawNext(x + 1); }, 1);
            }
        };

        drawNext(0);
    };

    /**
     * Draws the optimal hours
     *
     * @param {Array} hours
     * @param {String} color
     */
    let drawHours = (hours, color) => {
        let drawNext = (i) => {
            let startHours = hours[i - 1];
            
            let startX = (i - 1) * CANVAS_WIDTH_UNIT;
            let startY = (totalHours - startHours) * CANVAS_HEIGHT_UNIT;

            let endHours = hours[i];

            let endX = i * CANVAS_WIDTH_UNIT;
            let endY = (totalHours - endHours) * CANVAS_HEIGHT_UNIT;

            GraphHelper.drawCircle(ctx, startX, startY, 4, color);

            if(i >= hours.length - 1) {
                GraphHelper.drawCircle(ctx, endX, endY, 4, color);
            }

            GraphHelper.drawLine(ctx, startX, startY, endX, endY, 2, color);

            if(i < hours.length - 1) {
                hoursDrawTimer = setTimeout(() => { drawNext(i + 1); }, 1);
            }
        };

        drawNext(1);
    };

    /**
     * Redraws this graph
     *
     * @param {Boolean} fit
     */
    let redraw = (fit) => {
        if(gridDrawTimer) { clearTimeout(gridDrawTimer); }
        if(hoursDrawTimer) { clearTimeout(hoursDrawTimer); }

        ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height);

        if(fit) {
            let targetWidth = this.$element.find('.graph-container').outerWidth() - 40;

            CANVAS_WIDTH_UNIT = targetWidth / totalDays;
    
            $canvas[0].width = targetWidth;

            /*this.$element.find('.graph-x-axis-labels').empty().append(
                _.loop(totalDays, (i) => {
                    i++;

                    if(i % 5 !== 0 && i != 1 && i != totalDays + 1) { return; }

                    return _.label({style: 'left: ' + (CANVAS_WIDTH_UNIT * (i - 1)) + 'px'},i.toString() + ' d');
                })
            );*/
        }

        drawGrid();
        drawHours(optimalHours, '#21303b');
        drawHours(actualHours, '#e70d3b');
    }

    setTimeout(() => {
        redraw(true);
    }, 50);

    return _.div({class: 'burndown-chart analytics-body'},
        _.div({class: 'toolbar'},
            _.h4({},
                'Milestone',
                _.select({class: 'btn milestone-picker'},
                    _.each(resources.milestones.concat().sort(this.sortMilestones), (i, milestone) => {
                        return _.option({value: milestone.index}, milestone.title);
                    })
                ).val(milestone ? milestone.index : 0).change((e) => { this.onChangeMilestonePicker($(e.target).val()); })
            )
        ),
        _.div({class: 'meta'},
            _.h4('Total days'),
            _.p((totalDays + 1).toString()),
            _.h4('Total hours'),
            _.p(totalHours.toString()),
            _.h4('Milestone start'),
            _.p(milestoneStart ? milestoneStart.toString() : '(invalid)'),
            _.h4('Milestone end'),
            _.p(milestoneEnd ? milestoneEnd.toString() : '(invalid)')
        ),
        _.h4('Chart'),
        _.div({class: 'graph-container'},
            _.div({class: 'graph-y-axis-labels'},
                _.label({style: 'top: 0px'}, Math.round(totalHours) + ' h'),
                _.label({style: 'top: 380px'}, '0 h')
            ),
            _.div({class: 'graph-canvas'},
                $canvas,
                _.div({class: 'graph-x-axis-labels'})
            ).on('mousewheel', () => {
                redraw(true);  
            })
        )
    );
}
