import {REST} from '../../../common/decorator';
import {RestApiService} from './RestApiService';

export class RestAPIReportService extends RestApiService {

    public postAdminReportedClientsList(filter, page:number = 1, perPage:number = 20, sortBy:Array<string> = ['id']):Promise<any> {
        return this.postRESTAdminReportedClientsList(filter, page, perPage, sortBy.join(','))
            .then((data)=> {
                return data;
            });
    }

    @REST.POST('/admin/reported-clients/list/{:page}/{:perPage}/{:sortBy}.json')
    protected postRESTAdminReportedClientsList(@REST.BODY() filter:Object,
                                     @REST.PARAM('page') page:number = 1,
                                     @REST.PARAM('perPage') perPage:number = 20,
                                     @REST.PARAM('sortBy') sortBy:string = '-id'):Promise<any> {
        return null;
    }

    public deleteAdminReport(post_id:number):Promise<any> {
        return this.deleteRESTAdminReport(post_id)
            .then((data)=> {
                return data;
            });
    }

    @REST.DELETE('/admin/reports/{:report_id}.json')
    protected deleteRESTAdminReport(@REST.PARAM('report_id') report_id:number):Promise<any> {
        return null;
    }

    public deleteAdminReportReported(post_id:number):Promise<any> {
        return this.deleteRESTAdminReportReported(post_id)
            .then((data)=> {
                return data;
            });
    }

    @REST.GET('/admin/reports/{:report_id}/delete-reported.json')
    protected deleteRESTAdminReportReported(@REST.PARAM('report_id') report_id:number):Promise<any> {
        return null;
    }


    public postAdminReportedPostsList(filter, page:number = 1, perPage:number = 20, sortBy:Array<string> = ['id']):Promise<any> {
        return this.postRESTAdminReportedPostsList(filter, page, perPage, sortBy.join(','))
            .then((data)=> {
                return data;
            });
    }

    @REST.POST('/admin/reported-posts/list/{:page}/{:perPage}/{:sortBy}.json')
    protected postRESTAdminReportedPostsList(@REST.BODY() filter:Object,
                                               @REST.PARAM('page') page:number = 1,
                                               @REST.PARAM('perPage') perPage:number = 20,
                                               @REST.PARAM('sortBy') sortBy:string = '-id'):Promise<any> {
        return null;
    }
}

