import {Form as BaseForm} from '../../../../common/form';
import {Component, Input} from 'angular2/core';
import {ComponentMetadata} from '../../../../common/decorator';
import {ReportedPostsListFilterModel} from '../../../model';

@ComponentMetadata.Extends.Directives(BaseForm)
@Component({
    selector: '.form-reported-post-list-filter-component',
    template: require('./Form.html')
})
export class ReportedPostsListFilterForm extends BaseForm {
}

