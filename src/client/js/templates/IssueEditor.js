/**
 * Issue editor template
 */
module.exports = function render() {
    return _.div({class: 'issue-editor', 'data-index': this.model.index, 'data-type': ISSUE_TYPES[this.model.type]},

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
                        _.input({type: 'text', class: 'selectable edit', 'data-property': 'title', value: this.model.title})
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
            _.if(this.model.getReporter(),
                _.div({class: 'meta-field reporter readonly'},
                    _.label('Reporter'),
                    _.p(this.model.getReporter().displayName || this.model.getReporter().name)
                )
            ),
            
            // Assignee
            _.if(resources.collaborators.length > 0,
                _.div({class: 'meta-field assignee'},
                    _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                        .change((e) => { this.onChangeCheckbox(e); }),
                    _.label('Assignee'),
                    _.select({'data-property': 'assignee', disabled: ApiHelper.isSpectating()},
                        _.option({value: null, selected: !this.model.assignee}, '(unassigned)'),
                        _.each(resources.collaborators, (i, collaborator) => {
                            return _.option({value: collaborator.name, selected: collaborator.name == this.model.assignee},
                                collaborator.displayName || collaborator.name
                            );
                        })
                    )
                )
            ),

            // Type
            _.div({class: 'meta-field type'},
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); }),
                _.label('Type'),
                _.select({'data-property': 'type', disabled: ApiHelper.isSpectating()},
                    _.each(ISSUE_TYPES, (type, i) => {
                        return _.option({value: type}, type);
                    })
                ).val(this.model.type)
            ),
            
            // Priority
            _.div({class: 'meta-field priority'},
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); }),
                _.label('Priority'),
                _.select({'data-property': 'priority', disabled: ApiHelper.isSpectating()},
                    _.each(ISSUE_PRIORITIES, (priority, i) => {
                        return _.option({value: priority}, priority);
                    })
                ).val(this.model.priority)
            ),
            
            // Version
            _.div({class: 'meta-field version' + (window.resources.versions.length < 1 ? ' hidden' : '')},
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); }),
                _.label('Version'),
                _.select({'data-property': 'version', disabled: ApiHelper.isSpectating()},
                    _.each(window.resources.versions, (i, version) => {
                        return _.option({value: version}, version);
                    })
                ).val(this.model.version)
            ),

            // Estimate
            _.div({class: 'meta-field estimate'},
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); }),
                _.label('Estimate'),
                _.select({'data-property': 'estimate', disabled: ApiHelper.isSpectating()},
                    _.each(ISSUE_ESTIMATES, (estimate, i) => {
                        return _.option({value: estimate}, estimate);
                    })
                ).val(this.model.estimate)
            ),
            
            // Tags
            _.div({class: 'meta-field tags'},
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); }),
                _.label('Tags'),
                _.div({class: 'input', 'data-property': 'tags', 'data-value': this.model.tags.join(',')},
                    // All tags
                    _.each(this.model.tags, (i, tag) => {
                        if(!tag) { return; }

                        return _.span({class: 'tag'},
                            tag,
                            _.button({class: 'btn-remove-tag'}, 
                                _.span({class: 'fa fa-remove'})
                            ).click((e) => {
                                let tagIndex = this.model.tags.indexOf(tag);

                                if(tagIndex < 0) { return; }

                                this.model.tags.splice(tagIndex, 1);

                                this.render();
                            })
                        );
                    }),

                    // Add tag
                    _.span({class: 'add-tag'},
                        _.button({class: 'btn-add-tag'},
                            _.span({class: 'fa fa-plus'})
                        ).click((e) => {
                            this.onClickAddTag(e);
                        })
                    )
                )
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

        // Attachments
        _.div({class: 'attachments'},
            _.label('Attachments'),
            _.input({name: 'file', id: 'input-upload-attachment-' + this.model.id, type: 'file', multiple: true})
                .change((e) => { this.onAttachmentFileInputChange(e); }),
            _.label({for: 'input-upload-attachment-' + this.model.id, class: 'btn-upload-attachment'},
                _.span({class: 'fa fa-upload'})
            )
        ),

        // Body
        _.div({class: 'body'},
            
            // Description
            _.label('Description'),
            _.textarea({class: 'selectable edit btn-transparent', 'data-property': 'description'},
                this.model.description
            )
        ),
        
        // Actions
        _.if(!ApiHelper.isSpectating(),
            _.div({class: 'actions'},
                // Remove button
                _.if(!this.isCreating,
                    _.button({class: 'btn btn-small btn-remove-issue'},
                        _.span({class: 'fa fa-trash'})
                    ).click(() => { this.onClickRemove(); })
                ),

                // Create button
                _.if(this.isCreating,
                    _.button({class: 'btn btn-create-issue'},
                        'Create',
                    ).click(() => { this.onClickCreate(); })
                ),
                
                // Save button
                _.if(!this.isCreating,
                    _.button({class: 'btn btn-save-issue'},
                        'Save',
                    ).click(() => { this.onChange(); })
                )
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
                _.div({class: 'comment'},
                    _.div({class: 'collaborator'},
                        _.img({title: User.getCurrent().displayName || User.getCurrent().name, src: User.getCurrent().avatar}),
                    ),
                    _.textarea({class: 'edit selectable btn-transparent', placeholder: 'Add comment here...'})
                        .keyup(this.onKeyUp)
                        .blur(() => { this.onSubmitComment(); })
                        .on('paste', (e) => { this.onPaste(e); })
                )
            )
        )
    );
};
