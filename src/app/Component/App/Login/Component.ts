import {Component} from 'angular2/core';
import {RestAPIUserService} from '../../../service';
import {UserLoginForm} from '../../../form';
import {UserLoginModel} from '../../../model';
import {Router} from 'angular2/router';

@Component({
    selector: '.app-login-component',
    directives: [UserLoginForm],
    pipes: [],
    template: require('./Component.html'),
    host: {}
})
export class AppLoginComponent {
    data = {value: ''};
    loginModel:UserLoginModel = new UserLoginModel;

    constructor(protected rest:RestAPIUserService, protected router: Router) {
    }

    ngOnInit() {
        this.rest.logout();
    }

    doLogin(form:UserLoginForm) {
        this.rest.postLogin(form.model.getValue())
            .then((data) => {
                this.router.navigate(['Users']);
            })
            .catch((err) => {
                form.addError(err.message);
            });
    }
}
