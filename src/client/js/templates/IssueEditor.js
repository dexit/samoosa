module.exports = function render() {
    return _.div({class: 'issue-editor', 'data-index': this.model.index, 'data-type': resources.issueTypes[this.model.type]},
        _.div({class: 'header'},
            _.div({class: 'drag-handle'},
                _.span({class: 'fa fa-bars'})
            ).on('mousedown', (e) => { this.onClickDragHandle(e) }),
            _.div({class: 'assignee-avatar'},
                this.getAssigneeAvatar()
            ),
            _.button({class: 'btn-toggle btn-transparent'},
                _.span({class: 'fa fa-minus-circle'}),
                _.span({class: 'fa fa-plus-circle'})
            ).click((e) => { this.onClickToggle(e); }),
            _.div({class: 'issue-index'},
                this.model.index.toString()
            ),
            this.getPriorityIndicator(),
            _.h4({},
                _.span({class: 'btn-edit'},
                    this.model.title
                ).click(this.onClickEdit),
                _.input({type: 'text', class: 'selectable edit hidden btn-transparent', 'data-property': 'title', value: this.model.title})
                    .change(() => {
                        this.onChange();
                        
                        this.$element.find('.header .btn-edit').html(
                            this.model.title
                        );
                    })
                    .blur(this.onBlur)
            )
        ),
        _.div({class: 'meta'},
            _.div({class: 'multi-edit-notification'},
                'Now editing multiple issues'
            ),
            _.div({class: 'meta-field type' + (window.resources.issueTypes.length < 1 ? ' hidden' : '')},
                _.label('Type'),
                _.select({'data-property': 'type'},
                    _.each(window.resources.issueTypes, (i, type) => {
                        return _.option({value: i}, type);
                    })
                ).change(() => { this.onChange(); }).val(this.model.type),
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); })
            ),
            _.div({class: 'meta-field priority' + (window.resources.issuePriorities.length < 1 ? ' hidden' : '')},
                _.label('Priority'),
                _.select({'data-property': 'priority'},
                    _.each(window.resources.issuePriorities, (i, priority) => {
                        return _.option({value: i}, priority);
                    })
                ).change(() => { this.onChange(); }).val(this.model.priority),
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); })
            ),
            _.div({class: 'meta-field assignee'},
                _.label('Assignee'),
                _.select({'data-property': 'assignee'},
                    _.each(window.resources.collaborators, (i, collaborator) => {
                        return _.option({value: i}, collaborator.name);
                    })
                ).change(() => { this.onChange(); }).val(this.model.assignee),
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); })
            ),
            _.div({class: 'meta-field version' + (window.resources.versions.length < 1 ? ' hidden' : '')},
                _.label('Version'),
                _.select({'data-property': 'version'},
                    _.each(window.resources.versions, (i, version) => {
                        return _.option({value: i}, version);
                    })
                ).change(() => { this.onChange(); }).val(this.model.version),
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); })
            ),
            _.div({class: 'meta-field estimate' + (window.resources.issueEstimates.length < 1 ? ' hidden' : '')},
                _.label('Estimate'),
                _.select({'data-property': 'estimate'},
                    _.each(window.resources.issueEstimates, (i, estimate) => {
                        return _.option({value: i}, estimate);
                    })
                ).change(() => { this.onChange(); }).val(this.model.estimate),
                _.input({class: 'multi-edit-toggle', type: 'checkbox'})
                    .change((e) => { this.onChangeCheckbox(e); })
            ),
            _.div({class: 'multi-edit-actions'}, 
                _.button('Cancel')
                    .click(() => { this.onClickMultiEditCancel(); }),
                _.button('Apply')
                    .click(() => { this.onClickMultiEditApply(); })
            )
        ),
        _.div({class: 'body'},
            _.div({class: 'btn-edit'},
                markdownToHtml(this.model.description)
            ).click(this.onClickEdit),
            _.textarea({class: 'selectable edit hidden btn-transparent', 'data-property': 'description'},
                this.model.description
            ).change(() => {
                this.onChange();
                
                this.$element.find('.body .btn-edit').html(
                    markdownToHtml(this.model.description) || ''
                );
            })
            .blur(this.onBlur)
        ),
        _.div({class: 'comments'}),
        _.div({class: 'add-comment'},
            _.textarea({class: 'btn-transparent', placeholder: 'Add comment here...'}),
            _.button({},
                'Comment'
            ).click(() => { this.onClickComment(); })
        )
    ).click((e) => { this.onClickElement(e); });
};
