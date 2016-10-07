import {Directive, Input, HostBinding} from 'angular2/core';
import {Control} from '../../Model/Control';
import {Provider} from "angular2/core";

@Directive({
    selector: 'input[[ngFormControl]]'
})
export class FormWidgetInput {
    @Input('ngFormControl') control:Control;
    @HostBinding('attr.id') hostId:string;

    ngOnInit() {
        this.hostId = this.control.getId();
    }
}