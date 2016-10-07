import {
    Directive, Input, Query, QueryList, ContentChildren,
    ElementRef, Renderer
} from 'angular2/core';
import {FormErrors} from './Errors';

@Directive({
    selector: '.form-group'
})
export class FormGroup {
    @ContentChildren(FormErrors) private formErrors:QueryList<FormErrors> = new QueryList<FormErrors>();

    constructor(private _elementRef:ElementRef, private _renderer:Renderer) {
    }

    ngAfterContentInit() {
        this.formErrors.map((item)=> {
            item.getEventChannel('error-added').subscribe((error)=> {
                this._renderer.setElementClass(
                    this._elementRef.nativeElement, 'has-'.concat(error.type), true
                );
            });
            item.getEventChannel('error-removed').subscribe((error)=> {
                this._renderer.setElementClass(
                    this._elementRef.nativeElement, 'has-'.concat(error.type), false
                );
            });
        });

    }
}
export default FormGroup;
