'use strict';

class ResourceEditor extends View {
    constructor(params) {
        super(params);

        this.prettyName();

        this.template = require('../templates/ResourceEditor');

        this.fetch();
    }

    prettyName() {
        this.prettyName = this.name;

        for(let i in this.prettyName) {
            if(i == 0) {
                this.prettyName = this.prettyName.substring(0,1).toUpperCase() + this.prettyName.substring(1);

            } else if(this.prettyName[i] == this.prettyName[i].toUpperCase()) {
                this.prettyName = this.prettyName.substring(0, i) + ' ' + this.prettyName.substring(i);
            
            }
        }
    }

    onClickDelete(index) {
        ResourceHelper.removeResource(this.name, index);
    }
    
    onClickAdd(name) {
        ResourceHelper.addResource(this.name, name);
    }
}

module.exports = ResourceEditor;
