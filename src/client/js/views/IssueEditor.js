'use strict';

class IssueEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/IssueEditor');

        this.fetch();
    }

    onClickEdit() {
        let wasEditing = this.$element.hasClass('editing');

        $('.issue-editor').removeClass('editing');

        this.$element.toggleClass('editing', !wasEditing);
    
        if(!wasEditing) {
            this.getComments();
        }
    }

    getProperty(key) {
        let $property = this.$element.find('*[data-property="' + key + '"]');
        
        return $property.val() || $property.text();
    }

    onChange() {
        this.model.title = this.getProperty('title'); 
        this.model.type = this.getProperty('type'); 
    
    }

    getComments() {
        let $comments = this.$element.find('.comments');

        if($comments.length < 1) {
            $comments = _.div({class: 'comments'});

            this.$element.append($comments);
        }
        
        ApiHelper.getIssueComments(this.model)
        .then((comments) => {
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

    updateIssue() {

    }
}

module.exports = IssueEditor;
