import {Form as BaseForm} from '../../../../common/form';
import {Component, Input} from 'angular2/core';
import {ComponentMetadata} from '../../../../common/decorator';
import {BlockedClientsBlockUserModel} from '../../../model';

@ComponentMetadata.Extends.Directives(BaseForm)
@Component({
    selector: '.form-blocked-block-user-component',
    template: require('./Form.html')
})
export class BlockedClientsBlockUserForm extends BaseForm {
}

