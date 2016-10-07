import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {RestAPIUserService} from '../service';

declare var _: any;

@Directive({
    selector: 'loggedin-router-outlet'
})
export class LoggedInRouterOutletDirective extends RouterOutlet {
    publicRoutes: any;
    private parentRouter: Router;

    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
                _parentRouter: Router, @Attribute('name') nameAttr: string,
                protected restAPIUserService:RestAPIUserService) {
        super(_elementRef, _loader, _parentRouter, nameAttr);
        this.parentRouter = _parentRouter;
    }

    activate(instruction: ComponentInstruction) {
        let rolesRequired = instruction.routeData.get('roles'),
            currentUser =  this.restAPIUserService.getCurrentUser(),
            userRoles = currentUser?currentUser.roles: null;
        if ( rolesRequired && !_.intersection(rolesRequired, userRoles).length ) {
            this.parentRouter.navigate(['Login']);
        }
        return super.activate(instruction);
    }
}