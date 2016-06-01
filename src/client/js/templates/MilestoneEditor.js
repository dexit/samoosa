'use strict';

module.exports = function render() {
    return _.div({class: 'milestone-editor ' + SettingsHelper.get('milestone', this.model.index), 'data-index': this.model.index},
        _.div({class: 'header'},
            _.div({class: 'progress-bar', style: 'width: 0%'}),
            _.h4({class: 'title'}, 
                _.button({class: 'btn-toggle btn-transparent'},
                    _.span({class: 'fa fa-chevron-right'}),
                    _.span({class: 'fa fa-chevron-down'}),
                    this.model.title
                ).click(() => { this.onClickToggle(); })
            ),
            _.div({class: 'stats'},
                _.span({class: 'progress-amounts'},
                    _.span({class: 'fa fa-exclamation-circle'}),
                    _.span({class: 'total'}),
                    _.span({class: 'remaining'})
                ),
                _.span({class: 'progress-hours'},
                    _.span({class: 'fa fa-clock-o'}),
                    _.span({class: 'total'}),
                    _.span({class: 'remaining'})
                )
            ),
            _.div({class: 'toolbar'},
                _.button({class: 'btn-new-issue'},
                    'New issue'
                ).click(() => { this.onClickNewIssue(); })
            )
        ),
        _.div({class: 'columns'},
            _.each(window.resources.issueColumns, (columnIndex, column) => {
                return _.div({class: 'column', 'data-index': columnIndex},
                    _.div({class: 'header'},
                        _.h4(column)
                    ),
                    _.div({class: 'body'},
                        _.each(window.resources.issues, (issueIndex, issue) => {
                            if(issue.column == columnIndex && issue.milestone == this.model.index) {
                                return new IssueEditor({
                                    model: issue
                                }).$element;      
                            }            
                        })
                    )
                );
            })
        )
    );   
};
