import {Component} from 'angular2/core';
import {RestAPIUserService} from '../../../service';
import {LoggedHeader} from '../../../header';
import {MyProfileEditForm, MyProfileChangePasswordForm} from '../../../form';
import {MyProfileEditModel, MyProfileChangePasswordModel} from '../../../model';

import {TAB_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    selector: '.app-my-profile-component',
    directives: [LoggedHeader, MyProfileEditForm, MyProfileChangePasswordForm, TAB_DIRECTIVES],
    pipes: [],
    template: require('./Component.html'),
    host: {}
})
export class AppMyProfileComponent {
    currentUserModel:MyProfileEditModel = new MyProfileEditModel;
    changePasswordModel:MyProfileChangePasswordModel = new MyProfileChangePasswordModel;

    constructor(protected rest:RestAPIUserService) {
    }

    ngOnInit() {
        this.rest.getAdminMe()
            .then((data) => {
                this.currentUserModel.setValue(data);
            });
    }

    doSave(form:MyProfileEditForm) {
        this.rest.patchAdminMe(form.model.getValue())
            .then((data) => {
            })
            .catch((err) => {
                form.addError(err.message);
                if (err.errors) {
                    form.setControlsErrors(err.errors.children);
                }
            });
    }

    doChangePassword(form:MyProfileChangePasswordForm) {
        this.rest.postAdminMeChangePassword(form.model.getValue())
            .then((data) => {
            })
            .catch((err) => {
                form.addError(err.message);
                if (err.errors) {
                    form.setControlsErrors(err.errors.children);
                }
            });
    }
}
