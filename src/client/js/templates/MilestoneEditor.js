'use strict';

module.exports = function render() {
    let date = this.model.getEndDate();
    let year = date ? date.getFullYear() : new Date().getFullYear();
    let month = date ? date.getMonth() + 1 : new Date().getMonth() + 1;
    let day = date ? date.getDate() : new Date().getDate();

    let remainingData = this.model.getRemainingData();

    return _.div({class: 'milestone-editor', 'data-id': this.model.id},
        _.button({class: 'btn btn-print'}, _.span({class: 'fa fa-print'}))
            .on('click', () => {
                this.onClickPrint();
            }),
        _.h4(
            _.input({name: 'title', class: 'selectable edit', placeholder: 'Type milestone title here', type: 'text', value: this.model.title})
        ),
        _.input({name: 'description', class: 'selectable', placeholder: 'Type milestone description here', type: 'text', value: this.model.description}),
        _.div({class: 'data'},
            _.if(remainingData.issues > 0,
                _.span(remainingData.issues + ' issues left (' + remainingData.hours + ' hours)')
            )
        ),
        _.div({class: 'date-input'},
            _.input({placeholder: 'YYYY', name: 'year', type: 'number', value: year}),
            _.span({class: 'separator'}, '/'),
            _.input({placeholder: 'MM', name: 'month', min: 1, max: 12, type: 'number', value: month}),
            _.span({class: 'separator'}, '/'),
            _.input({placeholder: 'DD', name: 'day', min: 1, max: 31, type: 'number', value: day})
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
