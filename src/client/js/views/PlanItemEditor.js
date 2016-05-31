'use strict';

class PlanItemEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/PlanItemEditor');

        this.fetch();
    }

    /**
     * Opens this milestone as a dialog
     */
    openDialog() {
        let prev = {
            x: this.$element.offset().left,
            y: this.$element.offset().top,
            w: this.$element.width(),
            h: this.$element.height(),
            $parent: this.$element.parent()
        };
        
        this.positionBuffer = prev;
        
        $('body').append(this.$element);

        this.$element.css({
            position: 'absolute',
            left: prev.x,
            top: prev.y,
            width: prev.w,
            height: prev.h,
            transition: 'all 0.5s ease',
            overflow: 'hidden'
        });

        setTimeout(() => {
            this.$element.removeAttr('style');
            this.$element.css({
                position: 'absolute',
                left: '50%',
                top: '100px',
                transform: 'translateX(-50%)',
                transition: 'all 0.5s ease'
            });
        }, 1);

    }

    /**
     * Event: Change
     */
    onChange() {
        let dateString = this.$element.parents('.date').attr('data-date');

        // Update model data with new information based on DOM location
        this.model.title = this.$element.find('.header input').val();
        this.model.description = this.$element.find('.body input').val();
        
        if(dateString) {
            this.model.endDate = new Date(dateString).toISOString();
        }

        // Update DOM elements to match model
        this.$element.find('.drag-handle').text(this.model.title);

        // Start loading
        this.$element.toggleClass('loading', true);
        
        ApiHelper.updateMilestone(this.model)
        .then(() => {
            this.$element.toggleClass('loading', false);
        }); 
    }

    /**
     * Event: Click close button
     */
    onClickClose() {
        let prev = this.positionBuffer;
    
        this.$element.removeAttr('style');
        this.$element.css({
            position: 'absolute',
            left: prev.x,
            top: prev.y,
            width: prev.w,
            height: prev.h,
            transition: 'all 0.5s ease',
            overflow: 'hidden'
        });

        setTimeout(() => {
            prev.$parent.append(this.$element);
            this.$element.removeAttr('style');
        }, 550);
    }


    /**
     * Event: Click OK button
     */
    onClickOK() {
        this.onChange();

        this.onClickClose();
    }

    /**
     * Event: Release the dragging handle
     */
    onReleaseDragHandle(e) {
        // Unregister mouse events
        $(document)
            .off('mouseup')
            .off('mousemove');
        
        // Unset temporary classes and styling
        $('.plan-container').toggleClass('dragging', false);
        this.$element.removeAttr('style');
        
        // Unregister column mouse events and unset hovering state
        $('.plen-editor .dates .date')
            .off('mouseenter')
            .off('mouseleave').
            toggleClass('hovering', false);

        // Check if any change happened
        let $target = $('.plan-editor .dates .date.hovering .body').first();
        
        if($target[0] != this.$element.parent()[0]) {
            // Place this element into the hovered date container
            $target.prepend(this.$element);
            
            // Trigger the change event
            this.onChange();
        
        // If not, open dialog
        } else {
            this.openDialog();

        }
    }

    /**
     * Event: Click the dragging handle
     */
    onClickDragHandle(e) {
        // Cache the previous parent
        let $parent = this.$element.parent();

        // Set class on board container
        $('.plan-container').toggleClass('dragging', true);

        // Apply temporary CSS properties
        this.$element.css({
            top: this.$element.offset().top,
            left: this.$element.offset().left,
            width: this.$element.outerWidth(),
            height: this.$element.outerHeight(),
            'pointer-events': 'none',
            'z-index': 999
        });
        
        // Buffer the offset between mouse cursor and element position
        let offset = {
            x: this.$element.offset().left - e.pageX,
            y: this.$element.offset().top - e.pageY
        };

        // Add absolute positioning afterwards to allow getting proper offset
        this.$element.css({
            position: 'absolute'
        }); 
        
        // Buffer previous pointer location
        let prev = {
            x: e.pageX,
            y: e.pageY
        };

        // Place the element in a global scope
        $('.plan-container').append(this.$element);

        // Column mouse hover events
        $('.plan-editor .dates .date')
            .on('mouseenter', function() {
                $(this).toggleClass('hovering', true);
            })
            .on('mouseleave', function() {
                $(this).toggleClass('hovering', false); 
            });

        // Document pointer movement logic
        $(document)
            .off('mousemove')
            .on('mousemove', (e) => {
                // Get current pointer location
                let current = {
                    x: e.pageX,
                    y: e.pageY
                };

                // Apply new CSS positioning values
                this.$element.css({
                    top: current.y + offset.y,
                    left: current.x + offset.x
                });

                // Replace previous position buffer data
                prev = current;
            });

        // Document pointer release mouse button logic
        $(document)
            .off('mouseup')
            .on('mouseup', (e) => {
                // Append the element back to its parent, in case it wans't dropped correctly
                $parent.append(this.$element);
                
                this.onReleaseDragHandle(e);
            });
    }
}

module.exports = PlanItemEditor;
