import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {RestAPIReportService} from '../../../service';
import {LoggedHeader} from '../../../header';
import {ReportedClientsListFilterForm} from '../../../form';
import {ReportedClientsListFilterModel} from '../../../model';
import {ListSortLabelComponent, ListPaginationComponent, List} from '../../../../common/list';

@Component({
    selector: '.app-reported-clients-component',
    directives: [LoggedHeader, ReportedClientsListFilterForm, ListSortLabelComponent, ListPaginationComponent],
    pipes: [],
    template: require('./Component.html'),
    host: {}
})
export class AppReportedClientsComponent {
    private listFilterModel:ReportedClientsListFilterModel = new ReportedClientsListFilterModel;
    public list:List = new List;

    constructor(protected rest:RestAPIReportService,
                private _routeParams:RouteParams) {
    }

    ngOnInit() {
        this.list
            .getEventChannel(List.EVENT_CHANNEL_ANY_CHANGED)
            .subscribe((list:List)=> {
                this.rest.postAdminReportedClientsList(
                    list.getFilter(), list.getPage(),
                    list.getPerPage(), list.getSortBy()
                ).then((data) => {
                    list.setResult(data);
                }).catch((err) => {
                });
            });
        this.list.setFilter(this.listFilterModel.getValue());
    }

    doGo(form:ReportedClientsListFilterForm) {
        this.list.setFilter(form.model.getValue());
    }

    removeReportItem(event, item) {
        if (confirm('Are You Sure?')) {
            Promise.all(
                item.reports.map((report)=>{
                    return this.rest.deleteAdminReport(report['id']);
                })
            ).then((data) => {
                if (data) {
                    this.list.setFilter(this.listFilterModel.getValue());
                }
            })
        }
        event.stopPropagation();
    }

    removeReportedItem(event, item) {
        if (confirm('Are You Sure?')) {
            this.rest.deleteAdminReportReported(item.reports[0]['id']).then((data) => {
                if (data) {
                    this.list.setFilter(this.listFilterModel.getValue());
                }
            })
        }
        event.stopPropagation();
    }
}
