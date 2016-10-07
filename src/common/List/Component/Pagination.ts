import {Component, Input} from 'angular2/core';
import {List} from '../../list';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    selector: '.list-pagination',
    directives: [PAGINATION_DIRECTIVES],
    pipes: [],
    template: `<pagination [totalItems]="list.result.totalItems" [(ngModel)]="list.page" [itemsPerPage]="list.perPage"
				            class="pagination-sm"
				            [maxSize]="5"
				            [boundaryLinks]="true" [rotate]="false"
				            (pageChanged)="list.setPage($event.page)"></pagination>`,
    host: {}
})
export class ListPaginationComponent {
    @Input('list') private list:List;

    constructor() {
    }

    ngOnInit() {
    }
}
