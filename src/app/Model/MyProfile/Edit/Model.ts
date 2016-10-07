import {Control, ControlCheckbox, Validators, Model as BaseModel} from "../../../../common/model";

export class MyProfileEditModel extends BaseModel {
    constructor() {
        super({
            email: new Control('', Validators.required)
                .setLabel('Email'),
            firstName: new Control('', Validators.required)
                .setLabel('First Name'),
            surName: new Control('', Validators.required)
                .setLabel('Surname')
        });
    }
}
