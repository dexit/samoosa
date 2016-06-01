'use strict';

module.exports = function render() {
    return _.div({class: 'project-editor'},
        _.div({class: 'toolbar'},
            _.input({type: 'checkbox'})
                .change(() => { this.onClickCheckbox(); })
        ),
        _.div({class: 'content'},
            _.div({class: 'header'},
                _.h4(this.model.title) 
            ),
            _.div({class: 'body'},
                this.model.description    
            )
        )
    );
};
