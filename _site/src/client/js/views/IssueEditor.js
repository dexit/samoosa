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
        $('.issue-editor .multi-edit-toggle').each(function() {
            this.checked = false;
        });
        $('.board-container').toggleClass('multi-edit', false);
    }

    /**
     * Event: Click remove button
     */
    onClickRemove() {
        if(confirm('Are you sure you want to delete "' + this.model.title + '"?')) {
            ApiHelper.removeIssue(this.model)
            .then(() => {
                this.$element.remove();
            });
        }
    }

    /**
     * Event: Click the toggle button
     */
    onClickToggle(e) {
        e.preventDefault();
        e.stopPropagation();

        if(!this.usingMultiEdit()) {
            IssueEditor.cancelMultiSelect();
        }

        this.$element.removeAttr('style');

        let wasExpanded = this.$element.hasClass('expanded');

        this.$element.removeClass('expanded');
        
        let collapsedHeight = this.$element.outerHeight();
    
        this.$element.addClass('expanded');
        
        let expandedHeight = this.$element.outerHeight();

        this.$element.removeClass('expanded');

        if(!wasExpanded) {
            this.$element.addClass('expanded');
            this.$element.css('height', collapsedHeight + 'px');
            
            setTimeout(() => {
                this.$element.css('height', expandedHeight + 'px');
            }, 50);
        
        } else {
            this.$element.css('height', expandedHeight + 'px');
            
            setTimeout(() => {
                this.$element.css('height', collapsedHeight + 'px');
            }, 50);

        }

        if(this.usingMultiEdit()) {
            $('.issue-editor .multi-edit-toggle').each(function() {
                this.checked = false;
            }); 
            
            $('.board-container').toggleClass('multi-edit', !wasExpanded);

        } else {
            if(!wasExpanded) {
                this.getComments();
            }
        }
    }

    /**
     * Gets an IMG tag with the avatar of the assigned collaborator
     *
     * @returns {Object} img
     */
    getAssigneeAvatar() {
        let assignee = window.resources.collaborators[this.model.assignee];

        if(assignee) {
            return _.img({src: assignee.avatar});
        } else {
            return _.div({class: 'unassigned'},
                _.span({class: 'fa fa-user'})
            );
        }
    }

    /**
     * Gets a property from the DOM of the editor
     *
     * @param {String} key
     * @param {Boolean} useCheckboxes
     *
     * @returns {String} value
     */
    getProperty(key, useCheckboxes) {
        let $property = this.$element.find('*[data-property="' + key + '"]');
        let value = $property.val() || $property.text();
    
        if(useCheckboxes) {
            let $checkbox = this.$element.find('*[data-property="' + key + '"]').siblings('.multi-edit-toggle');
            
            if(!$checkbox[0].checked) {
                return null;
            }
        }

        return value;
    }
    
    /**
     * Sets a property to the DOM of the editor
     *
     * @param {String} key
     * @param {String} value
     */
    setProperty(key, value) {
        let $property = this.$element.find('*[data-property="' + key + '"]');
        $property.val(value);
    }

    /**
     * Updates the model with properties from the DOM
     */
    updateModel() {
        this.model.title = this.getProperty('title'); 
        this.model.type = this.getProperty('type'); 
        this.model.priority = this.getProperty('priority');
        this.model.assignee = this.getProperty('assignee');
        this.model.version = this.getProperty('version'); 
        this.model.description = this.getProperty('description');
        this.model.estimate = this.getProperty('estimate');
    }

    /**
     * Updates the DOM with properties from the model
     */
    updateDOM() {
        // Update all fields
        this.setProperty('title', this.model.title);
        this.setProperty('type', this.model.type);
        this.setProperty('priority', this.model.priority);
        this.setProperty('assignee', this.model.assignee);
        this.setProperty('version', this.model.version);
        this.setProperty('description', this.model.description);
        this.setProperty('estimate', this.model.estimate);

        // Update data type attribute
        this.$element.attr('data-type', resources.issueTypes[this.model.type]);

        // Update avatar image
        this.$element.find('.header .assignee-avatar').html(
            this.getAssigneeAvatar()
        );

        // Update priority indicator
        this.$element.find('.priority-indicator').replaceWith(this.getPriorityIndicator());
    }

    /**
     * Check whether or not we're using multi edit
     *
     * @returns {Boolean} active
     */
    usingMultiEdit() {
        return this.$element.hasClass('selected') && $('.issue-editor.selected').length > 1;
    }

    /**
     * Synchronises the model data with the remote backend
     */
    sync() {
        // Start loading
        this.$element.toggleClass('loading', true);

        // Update the issue though the API
        ApiHelper.updateIssue(this.model)
        .then(() => {
            this.$element.toggleClass('loading', false);
        });
    }

    /**
     * Event: Click the dragging handle
     */
    onClickDragHandle(e) {
        if(ApiHelper.isSpectating()) { return; }
        
        if(!InputHelper.isShiftDown) {
            // Set class on board container
            $('.board-container').toggleClass('dragging', true);

            // Set element
            let $element = this.$element;

            if(this.usingMultiEdit()) {
                $element = $('.issue-editor.selected');
            } else {
                //IssueEditor.cancelMultiSelect();
            }

            // Apply temporary CSS properties
            $element.each((i, element) => {
                $(element).css({
                    top: this.$element.offset().top,
                    left: this.$element.offset().left,
                    width: this.$element.outerWidth(),
                    height: this.$element.outerHeight(),
                    'pointer-events': 'none',
                    'z-index': 999,
                    'margin-top': (i * 15) + 'px'
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
        if(ApiHelper.isSpectating()) { return; }
        
        // Unregister mouse events
        $(document)
            .off('mouseup')
            .off('mousemove');
        
        // Set element
        let $element = this.$element;

        if(this.usingMultiEdit()) {
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
                
                    // Trigger the sync event
                    view.sync();
                }
            }
        });
       
        // Update filters
        ViewHelper.get('FilterEditor').applyFilters();

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
        if(ApiHelper.isSpectating()) { return; }

        // Only update values if we're not using multi edit
        if(!this.usingMultiEdit()) {
            this.updateModel();
            this.updateDOM();
            this.sync();
        
            // Update filters
            ViewHelper.get('FilterEditor').applyFilters();
            
            for(let milestoneEditor of ViewHelper.getAll('MilestoneEditor')) {
                if(milestoneEditor.model.index == this.model.milestone) {
                    milestoneEditor.updateProgress();
                    break;
                }
            }
        }
    }
   
    /**
     * Event: Click multi edit apply button
     */
    onClickMultiEditApply() {
        if(ApiHelper.isSpectating()) { return; }
        
        this.updateModel();
        this.updateDOM();
        this.sync();

        // Look for other IssueEditor views and update them as needed
        if(this.usingMultiEdit()) {
            for(let view of ViewHelper.getAll('IssueEditor')) {
                if(view != this && view.$element.hasClass('selected')) {
                    view.model.type = this.getProperty('type', true) || view.model.type;
                    view.model.priority = this.getProperty('priority', true) || view.model.priority;
                    view.model.assignee = this.getProperty('assignee', true) || view.model.assignee;
                    view.model.version = this.getProperty('version', true) || view.model.version;
                    view.model.estimate = this.getProperty('estimate', true) || view.model.estimate;
                
                    view.updateDOM();
                    view.sync();
                }
            }
        }
        
        // Update filters
        ViewHelper.get('FilterEditor').applyFilters();
    }
    
    /**
     * Event: Click multi edit cancel button
     */
    onClickMultiEditCancel() {
        if(ApiHelper.isSpectating()) { return; }
        
        IssueEditor.cancelMultiSelect();
    }

    /**
     * Event: Fires on changing a checkbox
     */
    onChangeCheckbox(e) {
        if(ApiHelper.isSpectating()) { return; }
        
        e.preventDefault();
        e.stopPropagation();

        if(this.$element.hasClass('selected')) {
            this.$element.find('.multi-edit-toggle').each(function(i) {
                let otherCheckbox = $('.issue-editor.selected .multi-edit-toggle')[i];
            
                otherCheckbox.checked = this.checked;
            });
        }
    }

    /**
     * Event: Click the edit button of a field
     */
    onClickEdit(e) {
        e.preventDefault();
        e.stopPropagation();

        if(ApiHelper.isSpectating()) { return; }
        
        if(!InputHelper.isShiftDown && !$(this).parents('.issue-editor').hasClass('selected')) {
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
        if(ApiHelper.isSpectating()) { return; }
        
        let text = this.$element.find('.add-comment textarea').val();

        this.$element.toggleClass('loading', true);
    
        this.$element.find('.add-comment textarea').val('');

        ApiHelper.addIssueComment(this.model, text)
        .then(() => {
            this.getComments();
        });
    }

    /**
     * Event: Key up on input fields
     *
     * @param {Event} e
     */
    onKeyUp(e) {
        if(ApiHelper.isSpectating()) { return; }
    
        let foundAnyFuzzyMatches = false;

        let replaced = $(this).val().replace(/@[a-zA-Z0-9-_]+ /g, (string) => {
            let fuzzyMatch;
            let typedName = string.replace('@', '').replace(' ', '');

            for(let collaborator of resources.collaborators || []) {
                if(!collaborator) { continue; }

                if(typedName == collaborator.name) {
                    return string;

                } else if(collaborator.name.indexOf(typedName) == 0) {
                    fuzzyMatch = collaborator.name;

                }
            }

            if(fuzzyMatch) {
                foundAnyFuzzyMatches = true;

                return '@' + fuzzyMatch + ' ';
            
            } else {
                return string;

            }
        });

        if(foundAnyFuzzyMatches) {
            $(this).val(replaced);

            $(this).change();
        }
    }

    /**
     * Event: Remove focus from input fields
     *
     * @param {Event} e
     */
    onBlur(e) {
        if(ApiHelper.isSpectating()) { return; }
        
        $(e.target)
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
        if(ApiHelper.isSpectating()) { return; }
        
        // Check for shift key
        if(InputHelper.isShiftDown) {
            e.preventDefault();
            e.stopPropagation();

            this.$element.toggleClass('selected');

            if(this.$element.hasClass('selected')) {
                this.$element.toggleClass('expanded', false);
            }
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
                                _.textarea({class: 'edit selectable hidden text btn-transparent'},
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