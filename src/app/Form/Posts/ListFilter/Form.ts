import {Form as BaseForm} from '../../../../common/form';
import {Component, Input} from 'angular2/core';
import {ComponentMetadata} from '../../../../common/decorator';
import {PostsListFilterModel} from '../../../model';

@ComponentMetadata.Extends.Directives(BaseForm)
@Component({
    selector: '.form-posts-list-filter-component',
    template: require('./Form.html')
})
export class PostsListFilterForm extends BaseForm {
}

