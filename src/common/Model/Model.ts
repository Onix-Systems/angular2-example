import {Control, ControlGroup, ControlCheckbox, ControlArray, Validators} from "../../common/model";
import {META} from "../Decorator/META";

export class Model extends ControlGroup {
    constructor(controls:{
        [key: string]: any;
    }, optionals?:{
        [key: string]: boolean;
    }, validator?, asyncValidator?) {
        super(controls, optionals, validator, asyncValidator);
        Object.keys(controls).map((k)=> {
            this.controls[k]['setName'](k);
        });
    }

    public setValue(value:any) {
        setValue(this, value);
        return this;
        function setValue(control, value) {
            if (control instanceof ControlArray && value instanceof Array) {
                let modelClass = META.getModelClass(control);
                while (control.length) {
                    control.removeAt(0);
                }
                value.map(function (value) {
                    let model = new modelClass();
                    control.push(model.setValue(value));
                });
            } else if (control instanceof ControlGroup && value instanceof Object) {
                Object.keys(control.controls).map((k)=> {
                    setValue(control.controls[k], value[k]);
                });
            } else if (control instanceof Control) {
                control.updateValue(value);
            }
        }
    }

    public getValue() {
        return filter(this.value);
        function filter(value) {
            if ( value instanceof Object ) {
                let result = {};
                Object.keys(value).map((k)=>{
                    if ( value[k] !== null ) {
                        result[k] = filter(value[k]);
                    }
                });
                return result;
            }
            return value;
        }
    }

    protected name = 'form';

    setName(name) {
        this.name = name;
        return this;
    }

    getName() {
        return this.name;
    }

    getParent() {
        return this['_parent'];
    }
}

