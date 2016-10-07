import {ControlGroup as BaseControlGroup} from 'angular2/common';

export class ControlGroup extends BaseControlGroup {
    protected id = null;
    protected name = null;
    protected label = '';

    setLabel(label) {
        this.label = label;
        return this;
    }

    getLabel() {
        return this.label;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    getId() {
        if (this.id === null) {
            let names = [], p = this;
            do {
                names.unshift(p.getName());
            } while (p = p.getParent());
            this.id = names.join('-');
        }
        return this.id;
    }

    setName(name) {
        this.name = name;
        return this;
    }
    getName() {
        return this.name;
    }

    getAttrName() {
        let names = [], p = this;
        do {
            names.unshift(p.getName());
        } while (p = p.getParent());
        let first = names.shift();
        names.join('][');
        return first.concat(
            names.length ? '['.concat(names.join(']['), ']') : ''
        );
    }

    getParent(){
        return this['_parent'];
    }
}
