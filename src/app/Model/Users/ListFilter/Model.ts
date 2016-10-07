import {Control, ControlCheckbox, ControlChoice, Model as BaseModel} from "../../../../common/model";

export class UsersListFilterModel extends BaseModel {
    constructor() {
        super({
            accountType: new ControlChoice('')
                .setChoices([
                    { value: null, label: 'Account Type'},
                    { value: 1, label: 'Public'},
                    { value: 2, label: 'Private'}
                ])
                .setLabel('Account Type'),
            username: new Control('')
                .setLabel('Username'),
            usernameExactly: new ControlCheckbox()
                .setLabel('Exact Search'),
            keyword: new Control('')
                .setLabel('Keyword'),
            keywordExactly: new Control()
                .setLabel('Exact Search'),
        });
    }
}
