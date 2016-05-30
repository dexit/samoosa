'use strict';

class IssueEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/IssueEditor');

        this.fetch();
    }

    /**
     * Event: Click the toggle button
     */
    onClickToggle() {
        let wasExpanded = this.$element.hasClass('expanded');

        $('.issue-editor').removeClass('expanded');

        this.$element.toggleClass('expanded', !wasExpanded);
    
        if(!wasExpanded) {
            this.getComments();
        }
    }

    /**
     * Gets an IMG tag with the avatar of the assigned collaborator
     */
    getAssigneeAvatar() {
        let assignee = window.resources.collaborators[this.model.assignee];

        if(assignee) {
            return _.img({src: assignee.avatar});
        }
    }

    /**
     * Gets a property from the DOM of the editor
     *
     * @param {String} key
     */
    getProperty(key) {
        let $property = this.$element.find('*[data-property="' + key + '"]');
        
        return $property.val() || $property.text();
    }

    /**
     * Event: Click the dragging handle
     */
    onClickDragHandle(e) {
        // Set class on board container
        $('.board-container').toggleClass('dragging', true);

        // Apply temporary CSS properties
        this.$element.css({
            top: this.$element.offset().top,
            left: this.$element.offset().left,
            width: this.$element.outerWidth(),
            height: this.$element.outerHeight(),
            'pointer-events': 'none',
            'z-index': 999
        });

        // Add absolute positioning afterwards to allow getting proper offset
        this.$element.css({
            position: 'absolute'
        }); 
        
        // Buffer previous pointer location
        let prev = {
            x: e.pageX,
            y: e.pageY
        };

        // Column mouse hover events
        $('.milestone-editor .columns .column')
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

                // Get current viewport
                let viewport = {
                    x: 0,
                    y: $(document).scrollTop(),
                    w: $(window).width(),
                    h: $(window).height()
                };

                // Calculate delta
                let delta = {
                    x: current.x - prev.x,
                    y: current.y - prev.y
                };

                // Apply new CSS positioning values
                this.$element.css({
                    top: this.$element.offset().top + delta.y,
                    left: this.$element.offset().left + delta.x
                });

                // Scroll page if dragging near the top or bottom
                // TODO: Improve this logic to scroll even if use isn't moving the pointer
                let scrollSpeed = 5;

                if(current.y > viewport.y + viewport.h - 100) {
                    scroll(1 * scrollSpeed);
                } else if(current.y < viewport.y + 100) {
                    scroll(-1 * scrollSpeed);
                }

                // Replace previous position buffer data
                prev = current;
            });

        // Document pointer release mouse button logic
        $(document)
            .off('mouseup')
            .on('mouseup', (e) => { this.onReleaseDragHandle(e); });
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
        $('.board-container').toggleClass('dragging', false);
        this.$element.removeAttr('style');
        
        // Place this element into the hovered column
        $('.milestone-editor .columns .column.hovering .body').first().append(this.$element);
        
        // Unregister column mouse events and unset hovering state
        $('.milestone-editor .columns .column')
            .off('mouseenter')
            .off('mouseleave').
            toggleClass('hovering', false);

        // Update model data with new information based on DOM location
        this.model.milestone = this.$element.parents('.milestone-editor').attr('data-index');
        this.model.column = this.$element.parents('.column').attr('data-index');
    
        // Trigger the change event
        this.onChange();
        
        // Update milestones progress
        for(let milestoneEditor of ViewHelper.getAll('MilestoneEditor')) {
            milestoneEditor.updateProgress();
        }
    }

    /**
     * Event: Fires on every change to a property
     */
    onChange() {
        this.model.title = this.getProperty('title'); 
        this.model.type = this.getProperty('type'); 
        this.model.priority = this.getProperty('priority');
        this.model.assignee = this.getProperty('assignee');
        this.model.version = this.getProperty('version'); 
        this.model.description = this.getProperty('description');
        this.model.estimate = this.getProperty('estimate');

        this.$element.attr('data-type', resources.issueTypes[this.model.type]);

        this.$element.toggleClass('loading', true);

        ApiHelper.updateIssue(this.model)
        .then(() => {
            this.$element.toggleClass('loading', false);
        });
    }
    
    /**
     * Event: Click the edit button of a field
     */
    onClickEdit() {
        $(this)
            .toggleClass('hidden', true)
            .siblings('.edit')
            .toggleClass('hidden', false)
            .focus(); 
    }

    /**
     * Event: Click the comment button
     */
    onClickComment() {
        let text = this.$element.find('.add-comment textarea').val();

        this.$element.toggleClass('loading', true);
        
        ApiHelper.addIssueComment(this.model, text)
        .then(() => {
            this.getComments();
        });
    }

    /**
     * Event: Remove focus from input fields
     */
    onBlur() {
        $(this)
            .toggleClass('hidden', true)
            .siblings('.btn-edit')
            .toggleClass('hidden', false); 
    }

    /**
     * Lazy-load the comments
     */
    getComments() {
        let $comments = this.$element.find('.comments');

        ApiHelper.getIssueComments(this.model)
        .then((comments) => {
            this.$element.toggleClass('loading', false);
            
            $comments.html(
                _.each(comments, (i, comment) => {
                    let collaborator = window.resources.collaborators[comment.collaborator];
                    let text = markdownToHtml(comment.text);
                    
                    return _.div({class: 'comment'},
                        _.div({class: 'collaborator'},
                            _.img({src: collaborator.avatar}),
                            _.p(collaborator.name)    
                        ),
                        _.div({class: 'text'},
                            text
                        )
                    );
                })
            );
        });
    }
}

module.exports = IssueEditor;
