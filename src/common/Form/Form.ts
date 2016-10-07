import {Component, Input, Output, Query, QueryList, ViewChildren, EventEmitter} from 'angular2/core';
import {ControlGroup, ControlArray, Control, FormBuilder, Validators, NgClass, NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {isPresent} from "angular2/src/facade/lang";
import {
    FormLabel, FormErrors, FormGroup,
    FormWidgetInput, FormWidgetChoice
} from "../form"
import {Model} from "../model"

@Component({
    selector: 'form-component',
    directives: [
        ...ROUTER_DIRECTIVES, NgClass, NgIf,
        FormLabel, FormErrors, FormGroup,
        FormWidgetInput, FormWidgetChoice
    ]
})
export class Form {
    @Input('model') public model:Model;
    @Output() public submitted:EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    fireSubmitted(evt) {
        if (
            !(this.model.hasError('main') && this.model.getError('main').type === 'success')
            && !this.model.valid
        ) {
            //this.model.setValue(this.model.value);
            this.model.setErrors({
                main: {type: 'danger', message: 'Please fix the errors first.', dismissible: false}
            });
        } else {
            this.submitted.emit(this);
        }
    }

    setControlsErrors(errors:any, group?:ControlGroup) {
        group = isPresent(group) ? group : this.model;
        Object.keys(errors).map((key) => {
            if (group.contains(key)) {
                let control = group.controls[key];
                if (control instanceof ControlGroup) {
                    if (errors.children) {
                        this.setControlsErrors(errors.children, control)
                    }
                } else if (errors[key].errors) {
                    control.setErrors({
                        'server-side': errors[key].errors
                    });
                }
            }
        });
    }

    addError(message:string) {
        this.model.setErrors({
            'main': {type: 'danger', message: message, dismissible: false}
        });
        return this;
    }

    addInfo(message:string) {
        this.model.setErrors({
            'main': {type: 'info', message: message, dismissible: false}
        });
        return this;
    }

    addSuccess(message:string) {
        this.model.setErrors({
            'main': {type: 'success', message: message, dismissible: false}
        });
        return this;
    }

    addWarning(message:string) {
        this.model.setErrors({
            'warning': {type: 'success', message: message, dismissible: false}
        });
        return this;
    }
}

