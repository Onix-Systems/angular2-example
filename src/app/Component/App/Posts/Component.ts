import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {RestAPIPostService} from '../../../service';
import {LoggedHeader} from '../../../header';
import {PostsListFilterForm} from '../../../form';
import {PostsListFilterModel} from '../../../model';
import {ListSortLabelComponent, ListPaginationComponent, List} from '../../../../common/list';

@Component({
    selector: '.app-posts-component',
    directives: [LoggedHeader, PostsListFilterForm, ListSortLabelComponent, ListPaginationComponent],
    pipes: [],
    template: require('./Component.html'),
    host: {}
})
export class AppPostsComponent {
    private listFilterModel:PostsListFilterModel = new PostsListFilterModel;
    public list:List = new List;

    constructor(
        protected rest:RestAPIPostService,
        private _routeParams:RouteParams) {
    }

    ngOnInit() {
        let username = this._routeParams.get('username');
        if ( username ) {
            this.listFilterModel.setValue({
                username: username,
                usernameExactly: true
            });
        }
        this.list
            .getEventChannel(List.EVENT_CHANNEL_ANY_CHANGED)
            .subscribe((list:List)=>{
                this.rest.postAdminPostsList(
                    list.getFilter(), list.getPage(),
                    list.getPerPage(), list.getSortBy()
                ).then((data) => {
                    list.setResult(data);
                }).catch((err) => {
                });
            });
        this.list.setFilter(this.listFilterModel.getValue());
    }

    doGo(form:PostsListFilterForm) {
        this.list.setFilter(form.model.getValue());
    }


    mapPostType(postType:number) {
        return {1: 'Image', 2: 'Video'}[postType];
    }

    removeItem(item) {
        if (confirm('Are You Sure?')) {
            this.rest.deleteAdminPosts(item.id)
                .then((data) => {
                    if (data) {
                        this.list.setFilter(this.listFilterModel.getValue());
                    }
                });
        }
    }

    openPopup(event, URL, type) {
        event.stopPropagation();
        var
            win = window.open('', "popup", "width=800,height=600"),
            content = '';

        if (type == 1) {
            content = "<body style=\"margin:0;padding:0;height:100%;width:100%;background:url('".concat(URL, "') no-repeat center center; background-size: contain\"></body>");
        } else if (type == 2) {
            content = "<video controls='controls' width='770' height='570' src='".concat(URL, "'></video>");
        }
        win.document.write(content);
        win.focus();
    }
}
