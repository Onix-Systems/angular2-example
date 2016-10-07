import {Control} from './Control';

export class ControlCheckbox extends Control {
    private _value: number;
    _updateValue() {
        if ( this._value ) {
            this._value = 1;
        } else {
            this._value = null;
        }
    }
}

