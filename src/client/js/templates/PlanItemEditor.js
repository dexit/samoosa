'use strict';

module.exports = function render() {
    return _.div({class: 'plan-item-editor', 'data-date': this.model.endDate},
        _.div({class: 'drag-handle'},
            this.model.title
        ).on('mousedown', (e) => { this.onClickDragHandle(e); }),
        _.div({class: 'header'},
            _.button({class: 'btn-transparent'},
                _.span({class: 'fa fa-remove'})
            ).click(() => { this.onClickClose(); }),
            _.input({class: 'selectable edit', placeholder: 'Type milestone title here', type: 'text', value: this.model.title})
        ),
        _.div({class: 'body'},
            _.input({class: 'selectable', placeholder: 'Type milestone description here', type: 'text', value: this.model.description})
        ),
        _.div({class: 'footer'},
            _.button({class: 'btn'}, 'Delete', _.span({class: 'fa fa-remove'})).click(() => { this.onClickDelete(); }),
            _.button({class: 'btn'}, 'OK', _.span({class: 'fa fa-check'})).click(() => { this.onClickOK(); })
        )
    );
};
