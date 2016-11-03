'use strict';

module.exports = function render() {
    return _.div({class: 'plan-item-editor', 'data-date': this.model.endDate},
        _.div({class: 'drag-handle'},
            this.model.title
        ).on('mousedown', (e) => { this.onClickDragHandle(e); }),
        _.button({class: 'btn-close btn-transparent'},
            _.span({class: 'fa fa-remove'})
        ).click(() => { this.onClickClose(); }),
        _.div({class: 'header'},
            _.h4('Title'),
            _.input({class: 'selectable edit', placeholder: 'Type milestone title here', type: 'text', value: this.model.title})
        ),
        _.div({class: 'body'},
            _.h4('Description'),
            _.input({class: 'selectable', placeholder: 'Type milestone description here', type: 'text', value: this.model.description})
        ),
        _.div({class: 'footer'},
            _.button({class: 'btn btn-remove'}, _.span({class: 'fa fa-trash'})).click(() => { this.onClickDelete(); }),
            _.button({class: 'btn'}, 'OK').click(() => { this.onClickOK(); })
        )
    );
};
