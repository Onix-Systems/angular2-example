import {REST} from '../../../common/decorator';
import {RestApiService} from './RestApiService';

export class RestAPIUserService extends RestApiService {

    public postLogin(credentials):Promise<any> {
        return this.postRESTLogin(credentials)
            .then((data)=> {
                this.setApiKeyToken(data.token);
                this.setCurrentUser(data.data.user);
                return data;
            });
    }

    public logout() {
        this.setCurrentUser(null);
    }

    public getAdminMe():Promise<any> {
        return this.getRESTAdminMe();
    }

    public patchAdminMe(data):Promise<any> {
        return this.patchRESTAdminMe(data)
            .then((data)=> {
                this.setCurrentUser(data);
                return data;
            });
    }

    public postAdminMeChangePassword(data):Promise<any> {
        return this.postRESTAdminMeChangePassword(data)
            .then((data)=> {
                return data;
            });
    }

    public postAdminUsersList(filter, page:number = 1, perPage:number = 20, sortBy:Array<string> = ['id']):Promise<any> {
        return this.postRESTAdminUsersList(filter, page, perPage, sortBy.join(','))
            .then((data)=> {
                return data;
            });
    }

    public deleteAdminUsers(user_id:number):Promise<any> {
        return this.deleteRESTAdminUsers(user_id)
            .then((data)=> {
                return data;
            });
    }

    @REST.POST('/login.json')
    protected postRESTLogin(@REST.BODY() credentials:Object):Promise<any> {
        return null;
    }

    @REST.GET('/admin/me.json')
    protected getRESTAdminMe():Promise<any> {
        return null;
    }

    @REST.PATCH('/admin/me.json')
    protected patchRESTAdminMe(@REST.BODY() credentials:Object):Promise<any> {
        return null;
    }

    @REST.POST('/admin/me/changePassword.json')
    protected postRESTAdminMeChangePassword(@REST.BODY() credentials:Object):Promise<any> {
        return null;
    }

    @REST.POST('/admin/users/list/{:page}/{:perPage}/{:sortBy}.json')
    protected postRESTAdminUsersList(@REST.BODY() filter:Object,
                                     @REST.PARAM('page') page:number = 1,
                                     @REST.PARAM('perPage') perPage:number = 2,
                                     @REST.PARAM('sortBy') sortBy:string = 'id'):Promise<any> {
        return null;
    }

    @REST.DELETE('/admin/users/{:user_id}.json')
    protected deleteRESTAdminUsers(@REST.PARAM('user_id') user_id:number):Promise<any> {
        return null;
    }

}

