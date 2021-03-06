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
            title: 'User',
            url: '/source/',
            handler: this.toggleSourcePanel,
            icon: 'user'
        });
    
        links.push({
            title: 'Repositories',
            url: '/repositories/',
            handler: this.toggleRepositoriesList,
            icon: 'folder'
        });
        
        links.push({
            separator: true
        });

        links.push({
            title: 'Milestones',
            url: '/milestones/',
            icon: 'map-signs'
        });
        
        links.push({
            title: 'Kanban',
            url: '/board/kanban/all',
            icon: 'columns'
        });

        links.push({
            title: 'List',
            url: '/board/list/all',
            icon: 'list'
        });
        
        links.push({
            title: 'Settings',
            url: '/settings/',
            icon: 'cog'
        });
        
        links.push({
            title: 'Analytics',
            url: '/analytics/',
            icon: 'line-chart'
        });
        
        return links;
    }

    /**
     * Cleans up extra added classes
     */
    cleanUpClasses() {
        this.$element.toggleClass('repository-list', false);
        this.$element.toggleClass('source-panel', false);
        this.$element.toggleClass('about-panel', false);
    }
   
    /**
     * Hides the navbar
     */
    hide() {
        this.cleanUpClasses();
        this.$element.toggleClass('out', false);
        this.$element.find('.obscure .content').empty();
        this.$element.find('.buttons > button').toggleClass('active', false);
    }

    /**
     * Toggles a panel
     */
    togglePanel(url, className, onActive, isActive) {
        let $button = this.$element.find('.buttons button[data-url="' + url + '"]');
        let $content = this.$element.find('.obscure .content');

        if(isActive != true && isActive != false) {
            isActive = !$button.hasClass('active');
        }

        $content.empty();

        this.$element.find('.buttons button.handler').toggleClass('active', false);

        $button.toggleClass('active', isActive);

        this.$element.toggleClass('out', isActive);
        this.$element.toggleClass(className, isActive);
      
        if(isActive) { 
            onActive($content);
        } else {
            $content.empty();
        }
    }

    /**
     * Toggles the about panel
     */
    toggleAboutPanel(isActive) {
        this.togglePanel('/', 'about-panel', ($content) => {
            _.append($content,
                _.img({class: 'about-logo', src: '/public/svg/logo-medium.svg'}),
                _.h1('Samoosa')
            );
        }, isActive);
    }


    /**
     * Toggles the source panel
     */
    toggleSourcePanel(isActive) {
        this.togglePanel('/source/', 'source-panel', ($content) => {
            ApiHelper.getUser()
            .then((user) => {
                $content
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
            })
            .catch((e) => {
                debug.error(e, this);  
            });
        }, isActive);
    }

    /**
     * Toggles the repositories list
     */
    toggleRepositoriesList(isActive, overrideUrl) {
        let latest = SettingsHelper.getLatestRepositories();

        this.togglePanel('/repositories/', 'repository-list', ($content) => {
            let filterRepositories = (query) => {
                $content.find('.repository-editor').each((i, element) => {
                    let title = $(element).find('.header > h4').text() || '';
                    let isMatch = title.toLowerCase().indexOf(query.toLowerCase()) > -1;

                    $(element).toggle(!query || query.length < 2 || isMatch);
                });       
            };

            _.append($content.empty(),
                _.div({class: 'repository-list-actions'},
                    _.div({class: 'repository-list-action search'},
                        _.input({class: 'selectable', type: 'text', placeholder: 'Search in repositories...'})
                            .on('change keyup paste', (e) => {
                                let query = e.target.value;

                                filterRepositories(query);
                            }),
                        _.span({class: 'fa fa-search'})
                    )
                ),
                _.div({class: 'repository-list-items'},
                    _.if(latest.length > 0,
                        _.h4('Latest'),
                        _.each(latest, (i, repositoryPath) => {
                            return new RepositoryEditor({
                                model: getRepoByPath(repositoryPath),
                                overrideUrl: overrideUrl
                            }).$element;
                        }),
                        _.h4('All')
                    ),
                    _.each(window.resources.repositories, (i, repository) => {
                        return new RepositoryEditor({
                            model: repository,
                            overrideUrl: overrideUrl
                        }).$element;
                    })
                )
            );
        }, isActive);
    }

    /**
     * Gets the full router URL
     *
     * @param {String} url
     *
     * @returns {String} url
     */
    getFullUrl(url) {
        // Prepend repository
        url = '/' + ApiHelper.getRepositoryName() + url;
        
        // Prepend user
        url = '/' + ApiHelper.getRepositoryOwner() + url;
        
        return url;
    }

    /**
     * Event: Click on a link
     *
     * @param {String} url
     * @param {String} title
     */
    onClickLink(url, title) {
        this.cleanUpClasses();
        this.$element.find('.obscure .content').empty();
        
        if(!ApiHelper.getRepositoryName()) {
            this.toggleRepositoriesList(true, url);

        } else {
            let fullUrl = this.getFullUrl(url);

            if(fullUrl != Router.url) {
                spinner(title);

                location.hash = fullUrl;
            }

            this.slideIn();
        }
    }

    /**
     * Slide navbar in
     */
    slideIn() {
        if(Router.url) {
            let url = Router.url
                .replace('/' + ApiHelper.getRepositoryOwner(), '')
                .replace('/' + ApiHelper.getRepositoryName(), '');

            if(Router.params.resource) {
                url = url.replace(Router.params.resource, '');
            }

            this.$element.find('button.active').removeClass('active');
            this.$element.find('button[data-url*="' + url + '"]').toggleClass('active', true);

            this.$element.toggleClass('out', false);

            $('.navbar .obscure .content').empty();
        }
    }

    /**
     * Event: Click about button
     */
    onClickAbout() {
        alert('Samoosa v' + app.version);
    }
}

module.exports = Navbar;
