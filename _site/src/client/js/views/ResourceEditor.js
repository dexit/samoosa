'use strict';

class ResourceEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ResourceEditor');

        this.fetch();
    }

    onClickRemove(index) {
        ResourceHelper.removeResource(this.name, index)
        .then(() => {
            this.render()
        });
    }
    
    onClickAdd(name) {
        if(name) {
            ResourceHelper.addResource(this.name, name)
            .then(() => {
                this.render();
            });
        }
    }

    onChange(index, identifier) {
        let value = this.$element.find('.item').eq(index).find('input').val();

        ResourceHelper.updateResource(this.name, value, index, identifier)
        .then(() => {
            this.render();
        });
    }
}

module.exports = ResourceEditor;
