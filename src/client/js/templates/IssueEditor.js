/**
 * Issue editor template
 */
module.exports = function render() {
    return _.div({class: 'issue-editor', 'data-index': this.model.index, 'data-type': resources.issueTypes[this.model.type]},

        // Header
        _.div({class: 'header'},
            // Drag handle
            _.div({class: 'drag-handle'},
                _.span({class: 'fa fa-bars'})
            ).on('mousedown', (e) => { this.onClickDragHandle(e) }),

            // Header content
            _.div({class: 'header-content'},
                // Icons                
                _.div({class: 'header-icons'},
                    // Type indicator
                    this.getTypeIndicator(),
                    
                    // Priority indicator
                    this.getPriorityIndicator(),

                    // Issue id
                    _.span({class: 'issue-id'},
                        this.model.id
                    )
                ),

                // Assignee avatar
                _.if(!ApiHelper.isSpectating(),
                    _.div({class: 'assignee-avatar'},
                        this.getAssigneeAvatar()
                    )
                ),
                
                // Center section
                _.div({class: 'header-center'},
                    // Title
                    _.h4({class: 'issue-title'},
                        _.span({class: 'rendered'},
                            this.model.title
                        ),
                        _.input({type: 'text', class: 'selectable edit hidden btn-transparent', 'data-property': 'title', value: this.model.title})
                            .change(() => {
                                this.onChange();
                                
                                this.$element.find('.header .rendered').html(
                                    this.model.title
                                );
                            })
                            .blur(this.onBlur)
                            .keyup((e) => {
                                if(e.which == 13) {
                                    this.onBlur(e);
                                }
                            }),
                        _.button({class: 'btn-edit'}).click(this.onClickEdit)
                    ),
                )
            ),
            
            // Expand/collapse button
            _.button({class: 'btn-toggle btn-transparent'},
                _.span({class: 'fa icon-close fa-chevron-up'}),
                _.span({class: 'fa icon-open fa-chevron-down'})
            ).click((e) => { this.onClickToggle(e); })
        ).click((e) => { this.onClickElement(e); }),

        // Meta information
        _.div({class: 'meta'},

            // Multi edit notification
            _.div({class: 'multi-edit-notification'},
                'Now editing multiple issues'
            ),
                
            // Reporter
            _.if(resources.collaborators.length > 0,
                _.div({class: 'meta-field reporter readonly'},
                    _.label('Reporter'),
                    _.p(this.model.getReporter() ? (this.model.getReporter().displayName || this.model.getReporter().name) : '(unknown)')
                )
            ),
            
            // Assignee
            _.if(resources.collaborators.length > 0,
                _.div({class: 'meta-field assignee'},
                    _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                        .change((e) => { this.onChangeCheckbox(e); }),
                    _.label('Assignee'),
                    _.select({'data-property': 'assignee', disabled: ApiHelper.isSpectating()},
                        _.option({value: null}, '(unassigned)'),
                        _.each(resources.collaborators, (i, collaborator) => {
                            return _.option({value: i}, collaborator.displayName || collaborator.name);
                        })
                    ).change(() => { this.onChange(); }).val(this.model.assignee)
                )
            ),

            // Type
            _.div({class: 'meta-field type' + (window.resources.issueTypes.length < 1 ? ' hidden' : '')},
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); }),
                _.label('Type'),
                _.select({'data-property': 'type', disabled: ApiHelper.isSpectating()},
                    _.each(window.resources.issueTypes, (i, type) => {
                        return _.option({value: i}, type);
                    })
                ).change(() => { this.onChange(); }).val(this.model.type)
            ),

            // Priority
            _.div({class: 'meta-field priority' + (window.resources.issuePriorities.length < 1 ? ' hidden' : '')},
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); }),
                _.label('Priority'),
                _.select({'data-property': 'priority', disabled: ApiHelper.isSpectating()},
                    _.each(window.resources.issuePriorities, (i, priority) => {
                        return _.option({value: i}, priority);
                    })
                ).change(() => { this.onChange(); }).val(this.model.priority)
            ),
            
            // Version
            _.div({class: 'meta-field version' + (window.resources.versions.length < 1 ? ' hidden' : '')},
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); }),
                _.label('Version'),
                _.select({'data-property': 'version', disabled: ApiHelper.isSpectating()},
                    _.each(window.resources.versions, (i, version) => {
                        return _.option({value: i}, version);
                    })
                ).change(() => { this.onChange(); }).val(this.model.version)
            ),

            // Estimate
            _.div({class: 'meta-field estimate' + (window.resources.issueEstimates.length < 1 ? ' hidden' : '')},
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); }),
                _.label('Estimate'),
                _.select({'data-property': 'estimate', disabled: ApiHelper.isSpectating()},
                    _.each(window.resources.issueEstimates, (i, estimate) => {
                        return _.option({value: i}, estimate);
                    })
                ).change(() => { this.onChange(); }).val(this.model.estimate)
            ),
            
            // Multi edit actions
            _.div({class: 'multi-edit-actions'}, 
                _.button({class: 'btn'},
                    'Cancel'
                ).click(() => { this.onClickMultiEditCancel(); }),
                _.button({class: 'btn'},
                    'Apply'
                ).click(() => { this.onClickMultiEditApply(); })
            )
        ),

        // Body
        _.div({class: 'body'},
            
            // Description
            _.button({class: 'btn-edit'},
                _.span({class: 'fa fa-edit'})
            ).click(this.onClickEdit),
            _.label('Description'),
            _.div({class: 'rendered'},
                markdownToHtml(this.model.description)
            ),
            _.textarea({class: 'selectable edit hidden btn-transparent', 'data-property': 'description'},
                this.model.description
            ).change(() => {
                this.onChange();
                
                this.$element.find('.body .rendered').html(
                    markdownToHtml(this.model.description) || ''
                );
            })
            .blur(this.onBlur)
            .keyup(this.onKeyUp)
            .on('paste', (e) => {
                this.onPaste(e);
            })
        ),
        
        // Attachments
        _.div({class: 'attachments'},
            _.label('Attachments'),
            _.input({name: 'file', id: 'input-upload-attachment-' + this.model.id, type: 'file'})
                .change((e) => { this.onAttachmentFileInputChange(e); }),
            _.label({for: 'input-upload-attachment-' + this.model.id, class: 'btn-upload-attachment'},
                _.span({class: 'fa fa-upload'})
            )
        ),

        // Comments
        _.div({class: 'comments'},
            _.label('Comments')
        ),

        // Add comment
        _.if(!ApiHelper.isSpectating(),
            _.div({class: 'add-comment'},
                // Add comment input
                _.textarea({class: 'btn-transparent', placeholder: 'Add comment here...'})
                    .keyup(this.onKeyUp)
                    .on('paste', (e) => {
                        this.onPaste(e);
                    }),

                // Remove button
                _.if(!ApiHelper.isSpectating(),
                    _.button({class: 'btn btn-remove'},
                        _.span({class: 'fa fa-trash'})
                    ).click(() => { this.onClickRemove(); })
                ),

                // Add comment button
                _.button({class: 'btn'},
                    'Comment'
                ).click(() => { this.onClickComment(); })
            )
        )
    );
};
