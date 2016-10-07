import {Control, ControlCheckbox, ControlChoice, Model as BaseModel} from "../../../../common/model";

export class BlockedClientsListFilterModel extends BaseModel {
    constructor() {
        super({
            keyword: new Control('')
                .setLabel('Keyword'),
            keywordExactly: new Control()
                .setLabel('Exact Search'),
        });
    }
}
