import {Component, Input, Inject, EventEmitter} from 'angular2/core';
import {Subject} from 'rxjs/Subject';
import {NgClass, NgIf} from 'angular2/common';
import {Control} from '../Model/Control';
import { Alert } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'form-errors',
    directives: [NgClass, NgIf, Alert],
    template: `
<template ngFor #item [ngForOf]="errorsList" #i="index">
    <div class="text-help" [ngClass]="item.cssClasses">{{item.message}}</div>
</template>`
})
export class FormErrors {
    @Input() control:Control;
    @Input() cssClasses = {};
    @Input() map = {};
    public errorsList = [];
    private _emitters:{ [channel: string]: EventEmitter<any> } = {};

    constructor() {
    }

    ngOnInit() {
        this.control.statusChanges.subscribe((status)=> {
            if (status === 'INVALID') {
                this.errorsList = this.getErrorsList();
            } else {
                this.errorsList.map((message)=> {
                    this.getEventChannel('error-removed').emit(message);
                });
                this.errorsList = [];
            }
        });
    }

    getErrorsList() {
        var self = this,
            errors = [];
        if (this.control.errors) {
            Object.keys(this.control.errors).map((k)=> {
                if (this.control.errors[k]) {
                    if (this.control.errors[k] instanceof Array) {
                        this.control.errors[k].map((message)=> {
                            addError(k, message);
                        });
                    } else {
                        addError(k, this.control.errors[k]);
                    }
                }
            });
        }
        return errors;
        function addError(group, message) {
            message = message instanceof Object ?
                message : {message: message};
            let _mapped = self.map[group] || {};
            message.group = group;
            message.type = _mapped.type || message.type || 'danger';
            message.message = _mapped.message || message.message;
            message.cssClasses = {};

            message.cssClasses['form-control-message'] = true;
            message.cssClasses['form-control-message-'.concat(message.type)] = true;
            message.cssClasses['form-control-message-'.concat(message.type, '-', group)] = true;

            errors.push(message);
            self.getEventChannel('error-added').emit(message);
        }
    }

    getEventChannel(channel:string):EventEmitter<any> {
        if (!this._emitters[channel]) {
            this._emitters[channel] = new EventEmitter();
        }
        return this._emitters[channel];
    }
}
