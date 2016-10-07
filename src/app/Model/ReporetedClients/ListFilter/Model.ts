import {Control, ControlCheckbox, ControlChoice, Model as BaseModel} from "../../../../common/model";

export class ReportedClientsListFilterModel extends BaseModel {
    constructor() {
        super({
            keyword: new Control('')
                .setLabel('Keyword'),
            keywordExactly: new Control()
                .setLabel('Exact Search'),
        });
    }
}
