import {Control, ControlCheckbox, Validators, Model as BaseModel} from "../../../../common/model";

export class UserLoginModel extends BaseModel {
    constructor() {
        super({
            username: new Control('', Validators.required)
                .setLabel('Username / Email'),
            password: new Control('', Validators.required)
                .setLabel('Password')
        });
    }
}
