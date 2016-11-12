'use strict';

module.exports = function RepositoryBar() {
    return _.div({class: 'repository-bar'},
        _.h4({class: 'title'},
            _.span({class: 'rendered'}, this.model.title),
            _.input({type: 'text', class: 'selectable edit hidden', value: this.model.title})
                .on('change blur keyup', (e) => {
                    if(e.which && e.which != 13) { return; }

                    this.onChange();
                }),
            _.button({class: 'btn-edit'},
                _.span({class: 'fa fa-edit'})
            ).click(() => { this.onClickEditTitle(); })
        ),
        _.p({class: 'description'},
            _.span({class: 'rendered'}, this.model.description),
            _.input({type: 'text', class: 'selectable edit hidden', value: this.model.description})
                .on('change blur keyup', (e) => {
                    if(e.which && e.which != 13) { return; }

                    this.onChange();
                }),
            _.button({class: 'btn-edit'},
                _.span({class: 'fa fa-edit'})
            ).click(() => { this.onClickEditDescription(); })
        )
    );
};
