import {Form as BaseForm} from '../../../../common/form';
import {Component, Input} from 'angular2/core';
import {ComponentMetadata} from '../../../../common/decorator';
import {BlockedClientsListFilterModel} from '../../../model';

@ComponentMetadata.Extends.Directives(BaseForm)
@Component({
    selector: '.form-blocked-client-list-filter-component',
    template: require('./Form.html')
})
export class BlockedClientsListFilterForm extends BaseForm {
}

