import {Component, Input} from 'angular2/core';
import {List} from '../../list';

@Component({
    selector: '.list-sort-label',
    directives: [],
    pipes: [],
    template: `<ng-content></ng-content><div class="btn-sort glyphicon" [ngClass]="cssClasses" (click)="reSort()"></div>`,
    host: {}
})
export class ListSortLabelComponent {
    @Input('sortBy') private sortBy:Array<string>;
    private _invertedSortBy:Array<string> = [];
    @Input('list') private list:List;
    private cssClasses:{} = {};

    ngOnInit() {
        this.sortBy = this.sortBy || [];
        this._invertedSortBy = this.sortBy.map((item:string)=> {
            return item[0] === '-' ? item.substr(1) : ('-'.concat(item));
        });
        let channel = this.list.getEventChannel(List.EVENT_CHANNEL_SORT_BY_CHANGED);
        channel.subscribe((list:List)=> {
            let sortBy = list.getSortBy();
            if (JSON.stringify(sortBy) === JSON.stringify(this.sortBy)) {
                this.cssClasses['glyphicon-sort'] = false;
                this.cssClasses['glyphicon-sort-by-attributes'] = true;
                this.cssClasses['glyphicon-sort-by-attributes-alt'] = false;
            } else if (JSON.stringify(sortBy) === JSON.stringify(this._invertedSortBy)) {
                this.cssClasses['glyphicon-sort'] = false;
                this.cssClasses['glyphicon-sort-by-attributes'] = false;
                this.cssClasses['glyphicon-sort-by-attributes-alt'] = true;
            } else {
                this.cssClasses['glyphicon-sort'] = true;
                this.cssClasses['glyphicon-sort-by-attributes'] = false;
                this.cssClasses['glyphicon-sort-by-attributes-alt'] = false;
            }
        });
        channel.emit(this.list);
    }

    reSort() {
        let sortBy = this.list.getSortBy();
        if (JSON.stringify(sortBy) === JSON.stringify(this.sortBy)) {
            this.list.setSortBy(this._invertedSortBy);
        } else {
            this.list.setSortBy(this.sortBy);
        }
    }
}
