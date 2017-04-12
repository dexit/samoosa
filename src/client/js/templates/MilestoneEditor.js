'use strict';

module.exports = function render() {
    let date = this.model.getEndDate();
    let year = date ? date.getFullYear() : new Date().getFullYear();
    let month = date ? date.getMonth() + 1 : new Date().getMonth() + 1;
    let day = date ? date.getDate() : new Date().getDate();

    let remainingIssues = this.model.getIncompletedIssues();
    let remainingHours = this.model.getIncompletedHours();

    return _.div({class: 'milestone-editor' + (this.model.isOverdue() ? ' overdue' : '') + (this.model.isClosed() ? ' closed' : ''), 'data-id': this.model.id},
        _.button({class: 'btn btn-print'}, _.span({class: 'fa fa-print'}))
            .on('click', () => {
                this.onClickPrint();
            }),
        _.div({class: 'input-group'},
            _.label('Title'),
            _.input({name: 'title', class: 'selectable edit', placeholder: 'Type milestone title here', type: 'text', value: this.model.title})
        ),
        _.div({class: 'input-group'},
            _.label('Description'),
            _.input({name: 'description', class: 'selectable', placeholder: 'Type milestone description here', type: 'text', value: this.model.description})
        ),
        _.div({class: 'date-input input-group'},
            _.label('End date'),
            _.input({placeholder: 'YYYY', name: 'year', type: 'number', value: year}),
            _.span({class: 'separator'}, '/'),
            _.input({placeholder: 'MM', name: 'month', min: 1, max: 12, type: 'number', value: month}),
            _.span({class: 'separator'}, '/'),
            _.input({placeholder: 'DD', name: 'day', min: 1, max: 31, type: 'number', value: day})
        ),
        _.if(remainingIssues.length > 0,
            _.div({class: 'issues'},
                _.h6({class: 'remaining'}, remainingIssues.length + ' issues left (' + remainingHours + ' hours)'),
                _.ul({class: 'important'},
                    _.each(remainingIssues, (i, issue) => {
                        return _.li(issue.title);
                    })
                )
            )
        ),
        _.div({class: 'buttons'}, 
            _.button({class: 'btn btn-primary'},
                'Remove'
            ).click(() => { this.onClickDelete(); }),
            _.button({class: 'btn btn-primary'},
                'Save'
            ).click(() => { this.onClickSave(); })
        )
    );
};
