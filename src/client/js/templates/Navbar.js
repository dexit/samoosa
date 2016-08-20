'use strict';

module.exports = function Navbar() {
    return _.div({class: 'navbar'},
        _.div({class: 'obscure'},
            _.div({class: 'content'})
        ),
        _.div({class: 'buttons'},
            _.each(this.getLinks(), (i, link) => {
                return _.button({'data-url': link.url, class: (Router.url.indexOf(link.url) > -1 ? 'active' : '') + (link.bottom ? ' bottom' : '')},
                    _.span({class: 'fa fa-' + link.icon})
                ).click(() => {
                    this.cleanUpClasses();

                    if(link.handler) {
                        link.handler.call(this);

                    } else if(link.url) {
                        this.onClickLink(link.url);
                    
                    }
                });
            })
        )
    );
};
