'use strict';

/**
 * The navbar view
 *
 * @class View Navbar
 */
class Navbar extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/Navbar');

        this.fetch();
    }

    /**
     * Gets a list of links
     */
    getLinks() {
        let links = [];

        if(!ApiHelper.isSpectating()) {
            links.push({
                url: '/user/',
                icon: 'user'
            });
        }
    
        if(!ApiHelper.isSpectating()) {
            links.push({
                url: '/projects/',
                handler: this.toggleProjectsList,
                icon: 'folder'
            });
        }
        
        links.push({
            url: '/plan/',
            icon: 'calendar'
        });
        
        links.push({
            url: '/board/kanban/',
            icon: 'columns'
        });

        links.push({
            url: '/board/list/',
            icon: 'list'
        });
        
        if(!ApiHelper.isSpectating()) {
            links.push({
                url: '/settings/',
                icon: 'cog',
                bottom: true
            });
        }

        return links;
    }

    /**
     * Toggles the projects list
     */
    toggleProjectsList() {
        let $button = this.$element.find('.buttons button[data-url="/projects/"]');
        let $content = this.$element.find('.obscure .content');

        $button.toggleClass('active');

        let isActive = $button.hasClass('active');

        this.$element.toggleClass('out', isActive);
        $button.children('.fa')
            .toggleClass('fa-folder-open', isActive)
            .toggleClass('fa-folder', !isActive);
      
        if(isActive) { 
            ApiHelper.getProjects()
            .then(() => {
                $content
                .empty()
                .append(
                    _.each(window.resources.projects, (i, project) => {
                        return new ProjectEditor({
                            model: project
                        }).$element;
                    })
                );
            });
        } else {
            $content.empty();
        }
    }

    /**
     * Gets the full router URL
     *
     * @param {String} url
     *
     * @returns {String} url
     */
    getFullUrl(url) {
        if(url != '/user/' && url != '/projects/') {
            url = '/' + SettingsHelper.get('projects', 'current') + url;
        } else {
            url = url;
        }

        return url;
    }

    /**
     * Event: Click on a link
     *
     * @param {String} url
     */
    onClickLink(url) {
        url = this.getFullUrl(url);
        
        if(url != Router.url) {
            this.$element.toggleClass('out', true);

            setTimeout(() => {
                location.hash = url;
            }, 400);
        }
    }

    /**
     * Slide navbar in
     */
    slideIn() {
        let url = Router.url.replace('/' + SettingsHelper.get('projects', 'current'), '');

        this.$element.find('button.active').removeClass('active');
        this.$element.find('button[data-url="' + url + '"]').toggleClass('active', true);

        this.$element.toggleClass('out', false);

        $('.navbar .obscure .content').empty();
    }
}

module.exports = Navbar;
