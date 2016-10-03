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
            class: 'logo',
            handler: this.toggleAboutPanel
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
            separator: true
        });

        links.push({
            url: '/settings/',
            icon: 'cog'
        });

        if(localStorage.getItem('source') != 'bitbucket') {
            links.push({
                url: '/plan/',
                icon: 'calendar'
            });
        }
        
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
            $.get('/README.md', (res) => {
                $content
                .append(
                        markdownToHtml(res) 
                );
            });
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
     * Toggles the projects list
     */
    toggleProjectsList(isActive, overrideUrl) {
        this.togglePanel('/projects/', 'project-list', ($content) => {
            let filterProjects = (query) => {
                $content.find('.project-editor').each((i, element) => {
                    let title = $(element).find('.header > h4').text() || '';
                    let isMatch = title.toLowerCase().indexOf(query.toLowerCase()) > -1;

                    $(element).toggle(!query || query.length < 2 || isMatch);
                });       
            };

            ApiHelper.getProjects()
            .then(() => {
                _.append($content.empty(),
                    _.div({class: 'project-list-search'},
                        _.input({type: 'text', placeholder: 'Search in projects...'})
                            .on('change keyup paste', (e) => {
                                let query = e.target.value;

                                filterProjects(query);
                            })
                    ),
                    _.div({class: 'project-list-items'},
                        _.each(window.resources.projects, (i, project) => {
                            return new ProjectEditor({
                                model: project,
                                overrideUrl: overrideUrl
                            }).$element;
                        })
                    )
                );
            })
            .catch((e) => {
                debug.error(e, this);  
            });
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
        this.cleanUpClasses();
        this.$element.find('.obscure .content').empty();
        
        if(!ApiHelper.getProjectName()) {
            this.toggleProjectsList(true, url);

        } else {
            url = this.getFullUrl(url);

            if(url != Router.url) {
                this.$element.toggleClass('out', true);
                
                resources = {};

                setTimeout(() => {
                    location.hash = url;
                }, 400);
            }
        }
    }

    /**
     * Slide navbar in
     */
    slideIn() {
        if(Router.url) {
            let url = Router.url
                .replace('/' + ApiHelper.getUserName(), '')
                .replace('/' + ApiHelper.getProjectName(), '');

            this.$element.find('button.active').removeClass('active');
            this.$element.find('button[data-url*="' + url + '"]').toggleClass('active', true);

            this.$element.toggleClass('out', false);

            $('.navbar .obscure .content').empty();
        }
    }
}

module.exports = Navbar;
