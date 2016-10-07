/// <reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts" />

import {Injectable, Inject, Injector, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {ClassLocator} from '../Helper/ClassLocator';
import Serialize from './RESTs/Serialize/UrlEncoded';
import {
    HTTP_PROVIDERS,
    Http, Headers,
    Request, RequestOptions, RequestMethod, RequestOptionsArgs,
    Response,
    URLSearchParams
} from 'angular2/http';

class Client {
    public http;

    public constructor(@Inject(Http) http:Http) {
        this.http = http;
    }
}
var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, Client]),
    client = injector.get(Client);

export const REST = {
    BASE_URL: function (url) {
        return function (target, method?, descriptor?) {
            switch (arguments.length) {
                case 1:
                    Reflect.defineMetadata('REST.BASE_URL', url, target);
                    break;
                case 3:
                    Reflect.defineMetadata('REST.BASE_URL.' + method, url, target);
            }
        };
    },
    GET: processMethod('GET', RequestMethod.Get),
    POST: processMethod('POST', RequestMethod.Post),
    PATCH: processMethod('PATCH', RequestMethod.Patch),
    DELETE: processMethod('DELETE', RequestMethod.Delete),
    HEAD: processMethod('DELETE', RequestMethod.Head),
    OPTIONS: processMethod('DELETE', RequestMethod.Options),
    PARAM: processParam('PARAM'),
    QUERY: processParam('QUERY'),
    BODY: processParam('BODY', 'BODY'),
    HEADER: processParam('HEADER'),
    SerializeClass: function (serializeClassName) {
        return function (target) {
            Reflect.defineMetadata(
                'REST.SerializeClass', ClassLocator.get(serializeClassName), target
            );
        };
    },
    FILTER: {
        REQUEST: addFilter('REQUEST'),
        RESPONSE: addFilter('RESPONSE')
    }
};

function doRequest(requestMethod:number, decorator) {
    return function () {
        let args = Array.prototype.slice.call(arguments, 0),
            body_args = getParams('BODY', decorator),
            param_args = getParams('PARAM', decorator),
            query_args = getParams('QUERY', decorator),
            header_args = getParams('HEADER', decorator),
            uri = param_args.reduce(function (acc, p) {
                acc = acc.replace(p.reg_exp, 'value' in p ? p.value : args[p.index]);
                return acc;
            }, Reflect.getMetadata('REST.URI.' + decorator.method, decorator.target)),
            url = (
                    Reflect.getMetadata('REST.BASE_URL.' + decorator.method, decorator.target)
                    || Reflect.getMetadata('REST.BASE_URL', decorator.target.constructor)
                ) + uri,
            body = body_args.map(function (p) {
                let value = 'value' in p ? p.value : args[p.index];
                if (value instanceof Object) {
                    let serializeClass =
                        Reflect.getMetadata('REST.SerializeClass', value.constructor) || Serialize;
                    return serializeClass.serialize(value);
                }
                return value;
            }),
            search = Serialize.serialize(query_args.reduce(function (acc, p) {
                acc[p.name] = 'value' in p ? p.value : args[p.index];
                return acc;
            }, {})),
            headers = header_args.reduce(function (acc, p) {
                acc.append(p.name, 'value' in p ? p.value : args[p.index]);
                return acc;
            }, new Headers());

        var options = new RequestOptions({
            method: requestMethod,
            url: url,
            headers: headers,
            body: body[0] || null,
            search: search
        });
        decorator.instance = this;
        var request = applyFilter('REQUEST', decorator)(new Request(options));

        return new Promise<any>((resolve, reject)=> {
            applyFilter('RESPONSE', decorator)(client.http.request(request))
                .subscribe((data:Response)=> {
                    resolve(data.json());
                }, (err:Response) => {
                    reject(err.json());
                });
        });
    };
}

function processMethod(method_type, method_num) {
    return function (uri) {
        return function (target, method?, descriptor?) {
            switch (arguments.length) {
                case 1:
                    Reflect.defineMetadata('REST.' + method_type + '.URI', uri, target);
                    break;
                case 3:
                    Reflect.defineMetadata('REST.URI.' + method, uri, target);
                    descriptor.value = doRequest(method_num, {
                        target: target,
                        method: method
                    });
                    return descriptor;
            }
        };
    };
}

function processParam(param_type, default_param_type?) {
    return function (param_name?, value?) {
        return function (target, method?, descriptor?) {
            let params;
            switch (arguments.length) {
                case 1:
                    params = Reflect.getMetadata('REST.' + param_type, target) || [];
                    params.push({
                        name: param_name || default_param_type,
                        value: value,
                        reg_exp: new RegExp(
                            '[' + (('{:' + param_name + '}').split('').join('][')) + ']',
                            'g'
                        )
                    });
                    Reflect.defineMetadata('REST.' + param_type, params, target);
                    return target;
                case 3:
                    params = Reflect.getMetadata('REST.' + param_type + '.' + method, target) || [];
                    let param:any = {
                        name: param_name || default_param_type,
                        reg_exp: new RegExp(
                            '[' + (('{:' + param_name + '}').split('').join('][')) + ']',
                            'g'
                        )
                    };
                    if (descriptor instanceof Object) {
                        param.value = value;
                    } else {
                        param.index = descriptor;
                    }
                    params.push(param);
                    Reflect.defineMetadata('REST.' + param_type + '.' + method, params, target);
                    return descriptor;
            }
        };
    };
}

function getParams(param_type, decorator) {
    return (Reflect.getMetadata('REST.' + param_type, decorator.target.constructor) || [])
        .concat(
            Reflect.getMetadata(
                'REST.' + param_type + '.' + decorator.method, decorator.target
            ) || []
        );
}

function addFilter(filterName) {
    return function () {
        return function (target, method, descriptor) {
            let filters = Reflect.getMetadata('REST.FILTER.' + filterName, target) || [];
            filters.push(descriptor.value);
            Reflect.defineMetadata('REST.FILTER.' + filterName, filters, target);
            return descriptor;
        };
    };
}

function applyFilter(filterName, decorator) {
    let filters = Reflect.getMetadata('REST.FILTER.' + filterName, decorator.target) || [];
    return (function (data) {
        return filters.reduce((acc, filter)=> {
            return filter.apply(decorator.instance, [acc]);
        }, data);
    });
}

