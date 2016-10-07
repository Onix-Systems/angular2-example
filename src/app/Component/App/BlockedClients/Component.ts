import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {RestAPIReportService} from '../../../service';
import {LoggedHeader} from '../../../header';
import {BlockedClientsListFilterForm, BlockedClientsBlockUserForm} from '../../../form';
import {BlockedClientsListFilterModel, BlockedClientsBlockUserModel} from '../../../model';
import {ListSortLabelComponent, ListPaginationComponent, List} from '../../../../common/list';
import {RestAPIBlockedEntityService} from "../../../Service/RestAPI/RestAPIBlockedEntityService";

@Component({
    selector: '.app-blocked-clients-component',
    directives: [
        LoggedHeader,
        BlockedClientsListFilterForm, BlockedClientsBlockUserForm,
        ListSortLabelComponent, ListPaginationComponent
    ],
    pipes: [],
    template: require('./Component.html'),
    host: {}
})
export class AppBlockedClientsComponent {
    private listFilterModel:BlockedClientsListFilterModel = new BlockedClientsListFilterModel;
    public list:List = new List;
    public userNameToAdd:{} = {};

    constructor(protected rest:RestAPIBlockedEntityService,
                private _routeParams:RouteParams) {
    }

    ngOnInit() {
        this.list
            .getEventChannel(List.EVENT_CHANNEL_ANY_CHANGED)
            .subscribe((list:List)=> {
                this.rest.postAdminBlockedClientsList(
                    list.getFilter(), list.getPage(),
                    list.getPerPage(), list.getSortBy()
                ).then((data) => {
                    data.items.forEach((item)=> {
                        let model = new BlockedClientsBlockUserModel();
                        model.setValue({
                            'blocker': item.id
                        });
                        item['blockedClientsBlockUserModel'] = model;
                    });
                    list.setResult(data);
                }).catch((err) => {
                });
            });
        this.list.setFilter(this.listFilterModel.getValue());
    }

    doGo(form:BlockedClientsListFilterForm) {
        this.list.setFilter(form.model.getValue());
    }

    unblockClient(event, blockedItem) {
        if (confirm('Are You Sure?')) {
            this.rest.getAdminUnblockEntity(blockedItem['id'])
                .then((data) => {
                    if (data) {
                        this.list.setFilter(this.listFilterModel.getValue());
                    }
                })
        }
        event.stopPropagation();
    }

    addClientToBlockList(form, blockedItem) {
        this.rest.postAdminBlockUser(form.model.getValue())
            .then((data) => {
                this.list.setFilter(this.listFilterModel.getValue());
                form.addSuccess('User blocked!');
            })
            .catch((err) => {
                form.addError(err.message);
                if (err.errors) {
                    form.setControlsErrors(err.errors.children);
                }
            });
    }

}
