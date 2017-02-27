'use strict';

module.exports = function Navbar() {
    return _.div({class: 'navbar'},
        _.div({class: 'backdrop'})
            .click(() => {
                this.hide();
            }),
        _.div({class: 'obscure'},
            _.div({class: 'content'})
        ),
        _.div({class: 'buttons'},
            _.button({class: 'btn-logo', title: 'About Samoosa'})
                .click(() => {
                    this.onClickAbout();
                }),
            _.each(this.getLinks(), (i, link) => {
                if(link.separator) {
                    return _.div({class: 'separator'});

                } else {
                    return _.button(
                        {
                            title: link.title,
                            'data-url': link.url,
                            class:
                                (link.class || '') +
                                (link.bottom ? ' bottom' : '') +
                                (link.handler ? ' handler' : '')
                        },
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
                            this.onClickLink(link.url, link.title);
                        
                        }
                    });
                }
            })
        )
    );
};
