import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {RouterActiveDirective} from '../directive';

@Component({
    selector: '.header-logged-component',
    directives: [...ROUTER_DIRECTIVES, RouterActiveDirective],
    template: require('./Logged.html')
})
export class LoggedHeader {
}

