'use strict';

/**
 * The repository bar view
 *
 * @class View Navbar
 */
class RepositoryBar extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/RepositoryBar');

        this.model = Repository.getCurrent();

        this.fetch();
    }

    /**
     * Event: Click edit title
     */
    onClickEditTitle() {
         let $title = this.$element.find('.title');

         $title.find('.edit').focus().toggleClass('hidden', false);
         $title.find('.rendered').toggleClass('hidden', true);
         $title.find('.btn-edit').toggleClass('hidden', true);
    }
    
    /**
     * Event: Click edit description
     */
    onClickEditDescription() {
         let $description = this.$element.find('.description');

         $description.find('.edit').focus().toggleClass('hidden', false);
         $description.find('.rendered').toggleClass('hidden', true);
         $description.find('.btn-edit').toggleClass('hidden', true);
    }

    /**
     * Event: Change
     */
    onChange() {
        let prevTitle = this.model.title;
        let prevDescription = this.model.description;

        let newTitle = this.$element.find('.title .edit').val() || prevTitle;
        let newDescription = this.$element.find('.description .edit').val() || prevDescription;

        if(prevTitle == newTitle && prevDescription == newDescription) {
            this.$element.find('.edit').toggleClass('hidden', true);
            this.$element.find('.rendered, .btn-edit').toggleClass('hidden', false);

            return;
        }

        spinner('Updating "' + this.model.title + '"');

        ApiHelper.updateRepository(this.model, prevTitle)
        .then(() => {
            spinner(false);

            this.model.title = newTitle;
            this.model.description = newDescription;

            this.render();

            if(prevTitle != newTitle) {
                location.hash = location.hash.replace(prevTitle, newTitle).replace('#', '');

                $('head title').html(newTitle + ' - Samoosa');
            }
        })
        .catch((e) => {
            displayError(e);

            this.render();
        });
    }
}

module.exports = RepositoryBar;
