import {Form as BaseForm} from '../../../../common/form';
import {Component, Input} from 'angular2/core';
import {ComponentMetadata} from '../../../../common/decorator';
import {MyProfileChangePasswordModel} from '../../../model';

@ComponentMetadata.Extends.Directives(BaseForm)
@Component({
    selector: '.form-my-profile-change-password-component',
    template: require('./Form.html')
})
export class MyProfileChangePasswordForm extends BaseForm {
}

