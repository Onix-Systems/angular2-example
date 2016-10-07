import {EventEmitter} from 'angular2/core';

export class List {
    public static EVENT_CHANNEL_ANY_CHANGED:string = 'ANY_CHANGED';
    public static EVENT_CHANNEL_FILTER_CHANGED:string = 'FILTER_CHANGED';
    public static EVENT_CHANNEL_PAGE_CHANGED:string = 'PAGE_CHANGED';
    public static EVENT_CHANNEL_PER_PAGE_CHANGED:string = 'PER_PAGE_CHANGED';
    public static EVENT_CHANNEL_SORT_BY_CHANGED:string = 'SORT_BY_CHANGED';
    public static EVENT_CHANNEL_RESULT_CHANGED:string = 'RESULT_CHANGED';

    public filter:{} = {};
    public page:number = 1;
    public perPage:number = 20;
    public sortBy:Array<string> = ['id'];

    public result:{} = null;

    private _emitters:{ [channel: string]: EventEmitter<any> } = {};

    getFilter():{} {
        return this.filter;
    }

    setFilter(value:{}) {
        this.filter = value;
        this.getEventChannel(List.EVENT_CHANNEL_ANY_CHANGED)
            .emit(this);
        this.getEventChannel(List.EVENT_CHANNEL_FILTER_CHANGED)
            .emit(this);
        return this;
    }

    getPage():number {
        return this.page;
    }

    setPage(value:number) {
        this.page = value;
        this.getEventChannel(List.EVENT_CHANNEL_ANY_CHANGED)
            .emit(this);
        this.getEventChannel(List.EVENT_CHANNEL_PAGE_CHANGED)
            .emit(this);
        return this;
    }

    getPerPage():number {
        return this.perPage;
    }

    setPerPage(value:number) {
        this.perPage = value;
        this.getEventChannel(List.EVENT_CHANNEL_ANY_CHANGED)
            .emit(this);
        this.getEventChannel(List.EVENT_CHANNEL_PER_PAGE_CHANGED)
            .emit(this);
        return this;
    }

    getSortBy():Array<string> {
        return this.sortBy;
    }

    setSortBy(value:Array<string>) {
        this.sortBy = value;
        this.getEventChannel(List.EVENT_CHANNEL_ANY_CHANGED)
            .emit(this);
        this.getEventChannel(List.EVENT_CHANNEL_SORT_BY_CHANGED)
            .emit(this);
        return this;
    }

    getResult():{} {
        return this.result;
    }

    setResult(value:{}) {
        this.result = value;
        this.getEventChannel(List.EVENT_CHANNEL_RESULT_CHANGED)
            .emit(this);
        return this;
    }

    getEventChannel(channel:string):EventEmitter<any> {
        if (!this._emitters[channel]) {
            this._emitters[channel] = new EventEmitter();
        }
        return this._emitters[channel];
    }
}