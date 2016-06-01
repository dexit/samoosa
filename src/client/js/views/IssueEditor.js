'use strict';

class IssueEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/IssueEditor');

        this.fetch();
    }

    /**
     * Cancels multi select
     */
    static cancelMultiSelect() {
        $('.issue-editor').toggleClass('selected', false); 
        
        $('body').off('click');
    }

    /**
     * Event: Click the toggle button
     */
    onClickToggle() {
        if(!InputHelper.isShiftDown) {
            let wasExpanded = this.$element.hasClass('expanded');

            $('.issue-editor').removeClass('expanded');

            this.$element.toggleClass('expanded', !wasExpanded);
        
            if(!wasExpanded) {
                this.getComments();
            }
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
        if(!InputHelper.isShiftDown) {
            // Set class on board container
            $('.board-container').toggleClass('dragging', true);

            // Set element
            let $element = this.$element;

            if($('.issue-editor.selected').length > 0) {
                $element = $('.issue-editor.selected');
            }

            // Apply temporary CSS properties
            $element.each(function(i) {
                $(this).css({
                    top: $element.first().offset().top,
                    left: $element.first().offset().left,
                    width: $element.first().outerWidth(),
                    height: $element.first().outerHeight(),
                    'pointer-events': 'none',
                    'z-index': 999 - i,
                    'margin-top': (30 * i) + 'px'
                });
            });
            
            // Buffer the offset between mouse cursor and element position
            let offset = {
                x: this.$element.offset().left - e.pageX,
                y: this.$element.offset().top - e.pageY
            };

            // Add absolute positioning afterwards to allow getting proper offset
            $element.css({
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

                    // Apply new CSS positioning values
                    $element.css({
                        top: current.y + offset.y,
                        left: current.x + offset.x
                    });

                    // Scroll page if dragging near the top or bottom
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
    }

    /**
     * Event: Release the dragging handle
     */
    onReleaseDragHandle(e) {
        // Unregister mouse events
        $(document)
            .off('mouseup')
            .off('mousemove');
        
        // Set element
        let $element = this.$element;

        if($('.issue-editor.selected').length > 0) {
            $element = $('.issue-editor.selected');
        }

        // Unset temporary classes and styling
        $('.board-container').toggleClass('dragging', false);
        $element.removeAttr('style');
        
        // Place this element into the hovered column
        $('.milestone-editor .columns .column.hovering .body')
            .first()
            .prepend($element);
        
        // Unregister column mouse events and unset hovering state
        $('.milestone-editor .columns .column')
            .off('mouseenter')
            .off('mouseleave').
            toggleClass('hovering', false);

        // Update model data with new information based on DOM location
        $element.each(function(i) {
            for(let view of ViewHelper.getAll('IssueEditor')) {
                if(this == view.$element[0]) {
                    view.model.milestone = view.$element.parents('.milestone-editor').attr('data-index');
                    view.model.column = view.$element.parents('.column').attr('data-index');
                
                    // Trigger the change event
                    view.onChange();
                }
            }
        });
        
        // Cancel multiselect
        IssueEditor.cancelMultiSelect();

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

        // Update data type attribute
        this.$element.attr('data-type', resources.issueTypes[this.model.type]);

        // Update avatar image
        this.$element.find('.header .assignee-avatar').html(
            this.getAssigneeAvatar()
        );

        // Start loading
        this.$element.toggleClass('loading', true);

        // Update priority indicator
        this.$element.find('.priority-indicator').replaceWith(this.getPriorityIndicator());

        // Update the issue though the API
        ApiHelper.updateIssue(this.model)
        .then(() => {
            this.$element.toggleClass('loading', false);
        });
    }
    
    /**
     * Event: Click the edit button of a field
     */
    onClickEdit() {
        if(!InputHelper.isShiftDown) {
            $(this)
                .toggleClass('hidden', true)
                .siblings('.edit')
                .toggleClass('hidden', false)
                .focus()
                .select(); 
        }
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
     * Event: Click entire container element
     *
     * @param {Object} event
     */
    onClickElement(e) {
        // Check for shift key
        if(InputHelper.isShiftDown) {
            e.preventDefault();
            e.stopPropagation();

            this.$element.toggleClass('selected');

            $('body')
            .off('click')
            .on('click', function() {
                IssueEditor.cancelMultiSelect();
            });
        }
    }

    /**
     * Gets priority icon
     *
     * @returns {String} icon
     */
    getPriorityIndicator() {
        let priority = resources.issuePriorities[this.model.priority];
        let icon = '';

        switch(priority) {
            case 'low': case 'trivial':
                icon = 'arrow-down';
                break;

            case 'medium': case 'minor':
                icon = 'arrow-up';
                break;
            
            case 'high': case 'critical':
                icon = 'arrow-up';
                break;
            
            case 'blocker':
                icon = 'arrow-up';
                break;
        }

        return _.span({class: 'priority-indicator fa fa-' + icon + ' ' + priority});
    }

    /**
     * Lazy-load the comments
     */
    getComments() {
        let $comments = this.$element.find('.comments');

        ApiHelper.getUser()
        .then((user) => {
            ApiHelper.getIssueComments(this.model)
            .then((comments) => {
                this.$element.toggleClass('loading', false);
                
                $comments.html(
                    _.each(comments, (i, comment) => {
                        let collaborator = window.resources.collaborators[comment.collaborator];
                        let text = markdownToHtml(comment.text);
                        let isUser = collaborator.name == user.name;
                        
                        return _.div({class: 'comment', 'data-index': comment.index},
                            _.div({class: 'collaborator'},
                                _.img({src: collaborator.avatar}),
                                _.p(collaborator.name)    
                            ),
                            _.if(isUser, 
                                _.div({class: 'btn-edit'},
                                    text
                                ).click(this.onClickEdit),
                                _.textarea({class: 'edit hidden text btn-transparent'},
                                    comment.text
                                ).change(() => {
                                    this.$element.toggleClass('loading', true);
                                    
                                    comment.text = this.$element.find('.comments .comment[data-index="' + comment.index + '"] textarea').val();

                                    this.$element.find('.comments .comment[data-index="' + comment.index + '"] .btn-edit').html(
                                        markdownToHtml(comment.text) || ''
                                    );

                                    ApiHelper.updateIssueComment(this.model, comment)
                                    .then(() => {
                                        this.$element.toggleClass('loading', false);
                                    });
                                })
                                .blur(this.onBlur)
                            ),
                            _.if(!isUser,
                                _.div({class: 'text'},
                                    text
                                )
                            )
                        );
                    })
                );
            });
        });
    }
}

module.exports = IssueEditor;
