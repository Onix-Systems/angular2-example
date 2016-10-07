import {Form as BaseForm} from '../../../../common/form';
import {Component, Input} from 'angular2/core';
import {ComponentMetadata} from '../../../../common/decorator';
import {MyProfileEditModel} from '../../../model';

@ComponentMetadata.Extends.Directives(BaseForm)
@Component({
    selector: '.form-my-profile-edit-component',
    template: require('./Form.html')
})
export class MyProfileEditForm extends BaseForm {
    protected name = 'user-edit-form';
}

