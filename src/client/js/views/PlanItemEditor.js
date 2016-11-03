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
        $('.app-container').addClass('disabled');
        
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

        this.$element.toggleClass('opening', true);

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

        setTimeout(() => {
            this.$element.toggleClass('opening', false);
        }, 550);

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
            let date = new Date(dateString);

            this.model.endDate = date.getSimpleString();
        }

        // Update DOM elements to match model
        this.$element.find('.drag-handle').text(this.model.title);

        // Start loading
        this.$element.toggleClass('loading', true);
        
        ResourceHelper.updateResource('milestones', this.model)
        .then(() => {
            this.$element.toggleClass('loading', false);
        }); 
    }

    /**
     * Event: Click delete button
     */
    onClickDelete() {
        spinner(true);

        ResourceHelper.removeResource('milestones', this.model.index)
        .then(() => {
            ViewHelper.removeAll('PlanItemEditor');
            ViewHelper.get('PlanEditor').render();

            $('.app-container').removeClass('disabled');

            spinner(false);
        });
    }

    /**
     * Event: Click close button
     */
    onClickClose() {
        let prev = this.positionBuffer;
    
        this.$element.removeAttr('style');
        this.$element.toggleClass('closing', true);
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
            prev.$parent.prepend(this.$element);
            this.$element.removeAttr('style');
            this.$element.toggleClass('closing', false);
        }, 550);

        $('.app-container').removeClass('disabled');
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
        this.$element.find('button, input').removeAttr('style');
        
        // Find new target element
        let $target = $('.hovering').first();
       
        // Unregister hover mouse events and unset hovering state
        $('.plan-editor .dates .date, .tab.year, .tab.month')
            .off('mouseenter')
            .off('mouseleave').
            toggleClass('hovering', false);

        // If the dragging event lasted less than 100 ms, open dialog
        if(Date.now() - this.prevClick < 100) {
            this.openDialog();

        } else if($target.length > 0) {
            // If the element was dropped onto a date
            if($target.hasClass('date')) {
                // Place this element into the hovered date container
                let $oldParent = this.$element.parent();
                let $newParent = $target.find('.body');
                
                if($newParent[0] != $oldParent[0]) {
                    $newParent.prepend(this.$element);

                    // Trigger the change event
                    this.onChange();
                }
            
            // Special logic for tabs
            } else {
                let endDate = this.model.endDate;

                // Init a date from the current tabs if no date is present
                if(!endDate) {
                    endDate = new Date('1 ' + $('.tab.month.active').text() + ' ' + $('.tab.year.active').text());
               
                // Make sure the date is not a string 
                } else if(endDate.constructor === String) {
                    endDate = new Date(this.model.endDate);

                }

                // If the element was dropped onto a month tab
                if($target.hasClass('month')) {
                    endDate = new Date('1 ' + $target.text() + ' ' + endDate.getFullYear());

                // If the element was dropped onto a year tab
                } else if($target.hasClass('year')) {
                    endDate = new Date('1 ' + $('.tab.month.active').text() + ' ' + $target.text());

                }
               
                // Convert date to ISO string
                this.model.endDate = endDate.floor().toISOString();

                // Hide element
                this.$element.hide();
                
                ResourceHelper.updateResource('milestones', this.model)
                .then(() => {
                    // Follow the tab destination
                    $target.click();
                }); 

            }
        
            // Update the undated box
            ViewHelper.get('PlanEditor').updateUndatedBox();
        }
    }

    /**
     * Event: Click the dragging handle
     */
    onClickDragHandle(e) {
        // Cache the previous click
        this.prevClick = Date.now();

        // Set class on board container
        $('.plan-container').toggleClass('dragging', true);

        // Find the offset parent
        let $offsetParent = this.$element.offsetParent();
        let offsetDOM = $offsetParent.offset();

        if($offsetParent.length < 1) {
            $offsetParent = this.$element.parents('.undated');
            offsetDOM = $offsetParent.offset();

            offsetDOM.top += this.$element.height();
        }

        // Apply temporary CSS properties
        let bounds = this.$element[0].getBoundingClientRect();

        this.$element.css({
            top: bounds.top - offsetDOM.top,
            left: bounds.left - offsetDOM.left,
            width: bounds.width,
            height: bounds.height,
            'pointer-events': 'none',
            'z-index': 999
        });
        
        this.$element.find('button, input').css({
            'pointer-events': 'none',
        });

        // Buffer the offset between mouse cursor and element position
        let offset = {
            x: bounds.left - e.pageX - offsetDOM.left,
            y: bounds.top - e.pageY - offsetDOM.top
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

        // Date mouse hover events
        $('.plan-editor .dates .date, .tab.year, .tab.month')
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
                this.onReleaseDragHandle(e);
            });
    }
}

module.exports = PlanItemEditor;
