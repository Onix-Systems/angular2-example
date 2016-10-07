import {Control, ControlCheckbox, ControlChoice, Model as BaseModel} from "../../../../common/model";

export class PostsListFilterModel extends BaseModel {
    constructor() {
        super({
            postType: new ControlChoice('')
                .setChoices([
                    { value: null, label: 'Post Type'},
                    { value: 1, label: 'Image'},
                    { value: 2, label: 'Video'}
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
