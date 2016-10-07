import {Control, ControlCheckbox, Validators, Model as BaseModel} from "../../../../common/model";
export class MyProfileChangePasswordModel extends BaseModel {
    constructor() {
        super({
            oldPassword: new Control('', Validators.required)
                .setLabel('Old Password'),
            newPassword: new Control('', Validators.required)
                .setLabel('New Password'),
        });
    }
}
