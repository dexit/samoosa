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
            this.render();
        });
    }
    
    onClickAdd(name, regex) {
        if(!this.checkValue(name, regex)) { return; }

        ResourceHelper.addResource(this.name, name)
        .then(() => {
            this.render();
        });
    }

    onChange(index, identifier) {
        let $input = this.$element.find('.item').eq(index).find('input');
        let regex = $input.attr('pattern');
        let value = $input.val() || '';

        if(!this.checkValue(value, regex)) { return; }
        
        ResourceHelper.updateResource(this.name, value, index, identifier)
        .then(() => {
            this.render();
        });
    }

    checkValue(value, regex) {
        if(regex) {
            regex = new RegExp('^' + regex + '$');
        }

        if(!value || (regex && !value.match(regex))) {
            let message = 'The value "' + value + '" is invalid.';
            
            if(regex) {
                message += '\n\nRegex: ' + regex;
            }

            alert(message);
            
            return false;
        }

        return true;
    }
}

module.exports = ResourceEditor;
