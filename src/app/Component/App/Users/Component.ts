import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {RestAPIUserService} from '../../../service';
import {LoggedHeader} from '../../../header';
import {UsersListFilterForm} from '../../../form';
import {UsersListFilterModel} from '../../../model';
import {ListSortLabelComponent, ListPaginationComponent, List} from '../../../../common/list';

@Component({
    selector: '.app-users-component',
    directives: [LoggedHeader, UsersListFilterForm, ListSortLabelComponent, ListPaginationComponent],
    pipes: [],
    template: require('./Component.html'),
    host: {}
})
export class AppUsersComponent {
    private listFilterModel:UsersListFilterModel = new UsersListFilterModel;
    public list:List = new List;

    constructor(protected rest:RestAPIUserService,
                private _router:Router,
                routeParams:RouteParams) {
    }

    ngOnInit() {
        this.list
            .getEventChannel(List.EVENT_CHANNEL_ANY_CHANGED)
            .subscribe((list:List)=> {
                this.rest.postAdminUsersList(
                    list.getFilter(), list.getPage(),
                    list.getPerPage(), list.getSortBy()
                ).then((data) => {
                    list.setResult(data);
                }).catch((err) => {
                });
            });
        this.list.setFilter(this.listFilterModel.getValue());
    }

    doGo(form:UsersListFilterForm) {
        this.list.setFilter(form.model.getValue());
    }

    mapAccountType(accountType:number) {
        return {1: "Public", 2: "Private"}[accountType];
    }


    removeItem(item) {
        if (confirm('Are You Sure?')) {
            this.rest.deleteAdminUsers(item.id)
                .then((data) => {
                    if (data) {
                        this.list.setFilter(this.listFilterModel.getValue());
                    }
                });
        }
    }

    gotoPosts(item) {
        this._router.navigate(['PostsByUser', {username: item.username}]);
    }
}
