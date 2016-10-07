import {Control, ControlCheckbox, ControlChoice, Model as BaseModel} from "../../../../common/model";

export class BlockedClientsBlockUserModel extends BaseModel {
    constructor() {
        super({
            blocker: new Control('').setLabel('Blocker'),
            blocked: new Control('').setLabel('Username'),
        });
    }
}
