'use strict';

module.exports = function render() {
    let state = SettingsHelper.get('milestone', this.model.index) || '';
    
    if(!state && this.getPercentComplete() >= 100) {
        state = 'collapsed';
    }

    return _.div({class: 'milestone-editor ' + state, 'data-index': this.model.index, 'data-end-date': this.model.endDate},
        _.div({class: 'header'},
            _.div({class: 'progress-bar', style: 'width: ' + this.getPercentComplete() + '%'}),
            _.div({class: 'title'}, 
                _.button({class: 'btn-toggle btn-transparent'},
                    _.span({class: 'fa fa-chevron-right'}),
                    _.span({class: 'fa fa-chevron-down'}),
                    _.h4(this.model.title),
                    _.p(this.model.description)
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
                        }),
                        _.if(columnIndex == 0 && !ApiHelper.isSpectating(),
                            _.button({class: 'btn-new-issue'},
                                'New issue ',
                                _.span({class: 'fa fa-plus'})
                            ).click(() => { this.onClickNewIssue(); })
                        )
                    )
                );
            })
        )
    );   
};
