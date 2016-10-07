import {REST} from '../../../common/decorator';
import {RestApiService} from './RestApiService';

export class RestAPIPostService extends RestApiService {

    public postAdminPostsList(filter, page:number = 1, perPage:number = 20, sortBy:Array<string> = ['id']):Promise<any> {
        return this.postRESTAdminPostsList(filter, page, perPage, sortBy.join(','))
            .then((data)=> {
                return data;
            });
    }

    public deleteAdminPosts(post_id:number):Promise<any> {
        return this.deleteRESTAdminPosts(post_id)
            .then((data)=> {
                return data;
            });
    }

    @REST.POST('/admin/posts/list/{:page}/{:perPage}/{:sortBy}.json')
    protected postRESTAdminPostsList(@REST.BODY() filter:Object,
                                     @REST.PARAM('page') page:number = 1,
                                     @REST.PARAM('perPage') perPage:number = 20,
                                     @REST.PARAM('sortBy') sortBy:string = 'id'):Promise<any> {
        return null;
    }

    @REST.DELETE('/admin/posts/{:post_id}.json')
    protected deleteRESTAdminPosts(@REST.PARAM('post_id') post_id:number):Promise<any> {
        return null;
    }

}

