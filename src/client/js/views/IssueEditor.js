'use strict';

class IssueEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/IssueEditor');

        this.fetch();
    }

    onClickToggle() {
        let wasExpanded = this.$element.hasClass('expanded');

        $('.issue-editor').removeClass('expanded');

        this.$element.toggleClass('expanded', !wasExpanded);
    
        if(!wasExpanded) {
            this.getComments();
        }
    }

    getAssigneeAvatar() {
        let assignee = window.resources.collaborators[this.model.assignee];

        if(assignee) {
            return _.img({src: assignee.avatar});
        }
    }

    getProperty(key) {
        let $property = this.$element.find('*[data-property="' + key + '"]');
        
        return $property.val() || $property.text();
    }

    onChange() {
        this.model.title = this.getProperty('title'); 
        this.model.type = this.getProperty('type'); 
        this.model.priority = this.getProperty('priority');
        this.model.assignee = this.getProperty('assignee');
        this.model.version = this.getProperty('version'); 
        this.model.description = this.getProperty('description');

        this.$element.toggleClass('loading', true);

        ApiHelper.updateIssue(this.model)
        .then(() => {
            this.$element.toggleClass('loading', false);
        });
    }
    
    onClickEdit() {
        $(this)
            .toggleClass('hidden', true)
            .siblings('.edit')
            .toggleClass('hidden', false)
            .focus(); 
    }

    onClickComment() {
        let text = this.$element.find('.add-comment textarea').val();

        this.$element.toggleClass('loading', true);
        
        ApiHelper.addIssueComment(this.model, text)
        .then(() => {
            this.getComments();
        });
    }

    onBlur() {
        $(this)
            .toggleClass('hidden', true)
            .siblings('.btn-edit')
            .toggleClass('hidden', false); 
    }

    getComments() {
        let $comments = this.$element.find('.comments');

        ApiHelper.getIssueComments(this.model)
        .then((comments) => {
            this.$element.toggleClass('loading', false);
            
            $comments.html(
                _.each(comments, (i, comment) => {
                    let collaborator = window.resources.collaborators[comment.collaborator];
                    let text = markdownToHtml(comment.text);
                    
                    return _.div({class: 'comment'},
                        _.div({class: 'collaborator'},
                            _.img({src: collaborator.avatar}),
                            _.p(collaborator.name)    
                        ),
                        _.div({class: 'text'},
                            text
                        )
                    );
                })
            );
        });
    }
}

module.exports = IssueEditor;
