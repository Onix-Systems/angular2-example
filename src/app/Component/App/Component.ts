/* tslint:disable */
/* tslint:enable */

import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, Location, Instruction} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {RouteDefinition} from './RouteDefinition';

import {LoggedInRouterOutletDirective} from '../../directive';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: '.app-component',
    providers: [...FORM_PROVIDERS],
    directives: [...ROUTER_DIRECTIVES, LoggedInRouterOutletDirective],
    pipes: [],
    template: require('./Component.html')
})
@RouteConfig(RouteDefinition)
export class AppComponent {
    constructor(_router:Router,
                _location:Location) {
        _router.recognize(_location.path()).then((instruction:Instruction) => {
            if (!instruction) {
                _router.navigate(['Users']);
            }
        });
    }
}
