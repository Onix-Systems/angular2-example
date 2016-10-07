import {Directive, Input, ElementRef, Renderer, HostBinding} from 'angular2/core';
import {Control} from '../Model/Control';

@Directive({
    selector: 'label[[control]]'
})
export class FormLabel {
    @Input('control') control:Control;
    @HostBinding('attr.for') hostFor:string;

    constructor(private renderer:Renderer, private element:ElementRef) {
    }

    ngOnInit() {
        let nativeElement = this.element.nativeElement;
        if ( nativeElement.innerHTML==='' ) {
            nativeElement.innerHTML = this.control.getLabel();
        }
        this.hostFor = this.control.getId();
    }
}
