'use strict';

class ResourceEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ResourceEditor');

        // Special cases
        if(this.name == 'issueColumns') {
            for(let i = this.model.length - 1; i >= 0; i--) {
                if(this.model[i] == 'to do' || this.model[i] == 'done') {
                    this.model.splice(i, 1);
                }
            }
        }

        this.fetch();
    }

    onClickRemove(index) {
        console.log(index);

        ResourceHelper.removeResource(this.name, index)
        .then(() => {
            this.render()
        });
    }
    
    onClickAdd(name) {
        ResourceHelper.addResource(this.name, name)
        .then(() => {
            this.render();
        });
    }
}

module.exports = ResourceEditor;
