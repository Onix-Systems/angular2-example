import {Control} from './Control';

export class ControlChoice extends Control {
    private choices = [];

    setChoices(choices) {
        this.choices = choices;
        return this;
    }
    getChoices() {
        return this.choices;
    }
}

