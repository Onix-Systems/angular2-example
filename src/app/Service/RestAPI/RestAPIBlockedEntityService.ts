import {REST} from '../../../common/decorator';
import {RestApiService} from './RestApiService';

export class RestAPIBlockedEntityService extends RestApiService {

    public postAdminBlockedClientsList(filter, page:number = 1, perPage:number = 20, sortBy:Array<string> = ['id']):Promise<any> {
        return this.postRESTAdminBlockedClientsList(filter, page, perPage, sortBy.join(','))
            .then((data)=> {
                return data;
            });
    }

    @REST.POST('/admin/blocked-clients/list/{:page}/{:perPage}/{:sortBy}.json')
    protected postRESTAdminBlockedClientsList(@REST.BODY() filter:Object,
                                              @REST.PARAM('page') page:number = 1,
                                              @REST.PARAM('perPage') perPage:number = 20,
                                              @REST.PARAM('sortBy') sortBy:string = '-id'):Promise<any> {
        return null;
    }

    public getAdminBlockEntity(blocker_id:number, entityToBlockType_id:number, entityToBlock_id:number):Promise<any> {
        return this.getRESTAdminBlockEntity(blocker_id, entityToBlockType_id, entityToBlock_id)
            .then((data)=> {
                return data;
            });
    }

    @REST.GET('/admin/blocked-entities/block/{:blocker_id}/{:entityToBlockType_id}/{:entityToBlock_id}.json')
    protected getRESTAdminBlockEntity(@REST.PARAM('blocker_id') blocker_id:number,
                                      @REST.PARAM('entityToBlockType_id') entityToBlockType_id:number,
                                      @REST.PARAM('entityToBlock_id') entityToBlock_id:number):Promise<any> {
        return null;
    }

    public getAdminUnblockEntity(blockedEntity_id:number):Promise<any> {
        return this.getRESTAdminUnblockEntity(blockedEntity_id)
            .then((data)=> {
                return data;
            });
    }

    @REST.GET('/admin/blocked-entities/unblock/{:blockedEntity_id}.json')
    protected getRESTAdminUnblockEntity(@REST.PARAM('blockedEntity_id') blockedEntity_id:number):Promise<any> {
        return null;
    }


    public postAdminBlockUser(data):Promise<any> {
        return this.postRESTAdminBlockUser(data)
            .then((data)=> {
                return data;
            });
    }

    @REST.POST('/admin/block-user.json')
    protected postRESTAdminBlockUser(@REST.BODY() data:Object):Promise<any> {
        return null;
    }

}

