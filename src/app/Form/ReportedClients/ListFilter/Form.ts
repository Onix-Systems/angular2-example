import {Form as BaseForm} from '../../../../common/form';
import {Component, Input} from 'angular2/core';
import {ComponentMetadata} from '../../../../common/decorator';
import {ReportedClientsListFilterModel} from '../../../model';

@ComponentMetadata.Extends.Directives(BaseForm)
@Component({
    selector: '.form-reported-client-list-filter-component',
    template: require('./Form.html')
})
export class ReportedClientsListFilterForm extends BaseForm {
}

