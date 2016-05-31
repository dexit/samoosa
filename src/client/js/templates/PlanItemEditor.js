'use strict';

module.exports = function render() {
    return _.div({class: 'plan-item-editor'},
        _.div({class: 'header'},
            _.h4({class: 'title'},
                this.model.title
            )
        ),
        _.div({class: 'body'},
            'blablabaala'    
        ),
        _.div({class: 'footer'},
            'blablabaala'    
        )
    );
};
