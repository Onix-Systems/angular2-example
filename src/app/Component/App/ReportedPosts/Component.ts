import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {RestAPIReportService} from '../../../service';
import {LoggedHeader} from '../../../header';
import {ReportedPostsListFilterForm} from '../../../form';
import {ReportedPostsListFilterModel} from '../../../model';
import {ListSortLabelComponent, ListPaginationComponent, List} from '../../../../common/list';

@Component({
    selector: '.app-reported-posts-component',
    directives: [LoggedHeader, ReportedPostsListFilterForm, ListSortLabelComponent, ListPaginationComponent],
    pipes: [],
    template: require('./Component.html'),
    host: {}
})
export class AppReportedPostsComponent {
    private listFilterModel:ReportedPostsListFilterModel = new ReportedPostsListFilterModel;
    public list:List = new List;

    constructor(protected rest:RestAPIReportService,
                private _routeParams:RouteParams) {
    }

    ngOnInit() {
        this.list
            .getEventChannel(List.EVENT_CHANNEL_ANY_CHANGED)
            .subscribe((list:List)=> {
                this.rest.postAdminReportedPostsList(
                    list.getFilter(), list.getPage(),
                    list.getPerPage(), list.getSortBy()
                ).then((data) => {
                    list.setResult(data);
                }).catch((err) => {
                });
            });
        this.list.setFilter(this.listFilterModel.getValue());
    }

    doGo(form:ReportedPostsListFilterForm) {
        this.list.setFilter(form.model.getValue());
    }

    mapPostType(postType:number) {
        return {1: 'Image', 2: 'Video'}[postType];
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
