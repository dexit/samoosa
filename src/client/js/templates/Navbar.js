'use strict';

module.exports = function Navbar() {
    return _.div({class: 'navbar'},
        _.div({class: 'obscure'},
            _.div({class: 'content'})
        ),
        _.div({class: 'buttons'},
            _.each(this.getLinks(), (i, link) => {
                let isActive = Router.url.indexOf(link.url) > -1;

                return _.button({'data-url': link.url, class: (link.class || '') + (isActive ? ' active' : '') + (link.bottom ? ' bottom' : '')},
                    _.if(link.icon,
                        _.span({class: 'fa fa-' + link.icon})
                    ),
                    _.if(link.img,
                        _.img({src: link.img})
                    )
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
