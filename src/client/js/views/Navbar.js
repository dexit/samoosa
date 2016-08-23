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
        
        links.push({
            url: '/',
            class: 'logo'
        });
        
        links.push({
            url: '/source/',
            handler: this.toggleSourcePanel,
            icon: 'user'
        });
    
        links.push({
            url: '/projects/',
            handler: this.toggleProjectsList,
            icon: 'folder'
        });
        
        links.push({
            url: '/settings/',
            icon: 'cog'
        });

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
        
        return links;
    }

    /**
     * Cleans up extra added classes
     */
    cleanUpClasses() {
        this.$element.toggleClass('project-list', false);
        this.$element.toggleClass('source-panel', false);
    }

    /**
     * Toggles the source panel
     */
    toggleSourcePanel() {
        let $button = this.$element.find('.buttons button[data-url="/projects/"]');
        let $content = this.$element.find('.obscure .content');

        $button.toggleClass('active');

        let isActive = $button.hasClass('active');

        this.$element.toggleClass('out', isActive);
        this.$element.toggleClass('source-panel', isActive);
        $button.children('.fa')
            .toggleClass('fa-folder-open', isActive)
            .toggleClass('fa-folder', !isActive);
      
        if(isActive) { 
            ApiHelper.getUser()
            .then((user) => {
                $content
                .empty()
                .append([
                    _.div({class: 'current-user'},
                        _.img({src: user.avatar}),
                        _.p(user.name),
                        _.button({class: 'btn'}, 'Log out').click((e) => {
                            e.preventDefault();

                            ApiHelper.logOut();
                        })
                    ) 
                ]);
            });
        } else {
            $content.empty();
        }
    }

    /**
     * Toggles the projects list
     */
    toggleProjectsList(isActive) {
        let $button = this.$element.find('.buttons button[data-url="/projects/"]');
        let $content = this.$element.find('.obscure .content');

        if(isActive != true && isActive != false) {
            isActive = !$button.hasClass('active');
        }

        $button.toggleClass('active', isActive);

        this.$element.toggleClass('out', isActive);
        this.$element.toggleClass('project-list', isActive);
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
        if(url == '/') {
            return url;
        }

        // Prepend project
        url = '/' + ApiHelper.getProjectName() + url;
        
        // Prepend user
        url = '/' + ApiHelper.getUserName() + url;
        
        return url;
    }

    /**
     * Event: Click on a link
     *
     * @param {String} url
     */
    onClickLink(url) {
        url = this.getFullUrl(url);
        
        if(url && url != Router.url) {
            this.$element.toggleClass('out', true);
            
            resources = {};

            setTimeout(() => {
                location.hash = url;
            }, 400);
        }
    }

    /**
     * Slide navbar in
     */
    slideIn() {
        if(Router.url) {
            let url = Router.url;

            this.$element.find('button.active').removeClass('active');
            this.$element.find('button[data-url*="' + url + '"]').toggleClass('active', true);

            this.$element.toggleClass('out', false);

            $('.navbar .obscure .content').empty();
        }
    }
}

module.exports = Navbar;
