/* tslint:disable */
/* tslint:enable */

    import {LocalStorage, REST} from '../../../common/decorator';
import {Observable} from 'rxjs/Observable';
import {
    Request, RequestOptions, RequestMethod, RequestOptionsArgs,
    Response,
    URLSearchParams
} from 'angular2/http';

/*
 * REST Api base class
 */
export class RestApiService {
    @LocalStorage() protected apiKey:string;
    @LocalStorage() protected user:Object;

    constructor() {
        REST.BASE_URL(process.env.restAPI.baseUrl)(this.constructor);
    }

    setApiKeyToken(token:string) {
        this.apiKey = 'token ' + token;
        return this;
    }

    setCurrentUser(user:Object) {
        if (user) {
            this.user = user;
        } else {
            this.user = null;
            this.apiKey = null;
        }
        return this;
    }

    getCurrentUser():any {
        return this.user || null;
    }

    @REST.FILTER.REQUEST()
    requestFilter(request):Request {
        switch (request.method) {
            case RequestMethod.Put:
            case RequestMethod.Patch:
            case RequestMethod.Post:
                if (!request.headers.get('Content-Type')) {
                    request.headers.append('Content-Type', 'application/x-www-form-urlencoded');
                }
                break;
        }
        if (this.apiKey) {
            if (!request.headers.get('Authorization')) {
                request.headers.append('Authorization', this.apiKey);
            }
        }
        return request;
    }

    @REST.FILTER.RESPONSE()
    responseFilter(observer:Observable<Response>):Observable<Response> {
        return observer;
    }


}
