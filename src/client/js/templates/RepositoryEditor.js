'use strict';

module.exports = function render() {
    if(!this.model) { return ''; }

    return _.div({class: 'repository-editor'},
        _.div({class: 'content'},
            _.div({class: 'owner'},
                this.model.owner    
            ),
            _.div({class: 'header'},
                _.h4(this.model.title) 
            ),
            _.div({class: 'body'},
                this.model.description    
            )
        )
    ).click(() => { this.onClick(); });
};
