module.exports = function render() {
    return _.div({class: 'milestone-editor'},
        _.div({class: 'header'},
            _.button({class: 'btn-transparent'},
                _.h4({}, 
                    _.span({class: 'fa fa-chevron-right'}),
                    _.span({class: 'fa fa-chevron-down'}),
                    this.model.title
                )
            ).click(() => { this.onClickToggle(); })
        ),
        _.div({class: 'columns'},
            _.each(window.resources.columns, (columnIndex, column) => {
                return _.div({class: 'column'},
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
