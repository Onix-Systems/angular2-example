import {Component, Directive, Input, HostBinding, ElementRef, Renderer} from 'angular2/core';
import {ControlChoice} from '../../model';
import {Provider} from "angular2/core";
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    selector: 'input[type=choice][[ngFormControl]]',
    directives: [DROPDOWN_DIRECTIVES],
    template: `<span class="btn-group" dropdown [ngClass]="cssClasses">
		<button id="single-button" type="button" class="btn" dropdownToggle>
			{{choiceLabel}} <span class="caret"></span>
		</button>
		<ul class="dropdown-menu" role="menu" aria-labelledby="single-button">
			<template ngFor #item [ngForOf]="control.getChoices()" #i="index">
				<li role="menuitem" (click)="selectChoice(item)"><a class="dropdown-item">{{item.label}}</a></li>
			</template>
		</ul>
	</span>`
})
export class FormWidgetChoice {
    @Input('ngFormControl') control:ControlChoice;
    @HostBinding('attr.id') hostId:string;
    @HostBinding('attr.type') hostType:string = 'hidden';

    @Input() choiceLabel:string = null;
    @Input() cssClasses = {};

    constructor(private element:ElementRef,
                private renderer:Renderer) {
    }

    ngOnInit() {
        this.hostId = this.control.getId();
        let nativeElement = this.element.nativeElement;
        while (nativeElement.lastChild) {
            nativeElement.parentNode.insertBefore(
                nativeElement.lastChild,
                nativeElement.nextSibling);
        }
        let choices = this.control.getChoices(),
            currentChoice = choices[0];
        choices.map((choice)=>{
            if ( this.control.value === choice.value ) {
                currentChoice = choice;
            }
        });
        if ( currentChoice ) {
            this.selectChoice(currentChoice);
        }
    }

    selectChoice(choice:{label:string, value:string}) {
        this.choiceLabel = choice.label;
        this.control.updateValue(choice.value);
    }
}