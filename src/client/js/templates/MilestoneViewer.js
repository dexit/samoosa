'use strict';

module.exports = function render() {
    let state = SettingsHelper.get('milestone', this.model.index) || 'collapsed';
    
    return _.div({class: 'milestone-viewer ' + state, 'data-title': this.model.title, 'data-index': this.model.index, 'data-end-date': this.model.endDate},
        _.div({class: 'header'},
            _.div({class: 'title'}, 
                _.button({class: 'btn-toggle btn-transparent'},
                    _.span({class: 'fa fa-chevron-right'}),
                    _.h4(this.model.title),
                    _.p(this.model.description)
                ).click(() => { this.onClickToggle(); })
            )
        ),
        _.div({class: 'columns'},
            _.each(window.resources.columns, (columnIndex, column) => {
                return _.div({class: 'column', 'data-name': column, 'data-index': columnIndex},
                    _.div({class: 'header'},
                        _.h4(column)
                    ),
                    _.div({class: 'body'},
                        _.each(this.model.getIssues(), (issueIndex, issue) => {
                            if(issue.column === column) {
                                let $issueEditor = new IssueEditor({
                                    model: issue
                                }).$element;      

                                return $issueEditor;
                            }            
                        }),
                        _.if(columnIndex == 0 && !ApiHelper.isSpectating(),
                            _.button({class: 'btn btn-new-issue'},
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
