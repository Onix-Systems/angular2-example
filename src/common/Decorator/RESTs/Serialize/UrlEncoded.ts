import Serialize from '../Serialize';
import {URLSearchParams} from 'angular2/http';

export default class UrlEncoded extends Serialize {
    static serialize(data) {
        let result = new URLSearchParams();
        serialize(JSON.parse(JSON.stringify(data)), '');
        return result;
        function serialize(data, prefix) {
            if (data instanceof Object) {
                Object.getOwnPropertyNames(data).map(function (k) {
                    serialize(data[k], prefix + (prefix === '' ? k : ('[' + k + ']')));
                });
            } else {
                result.append(prefix, data);
            }
        }
    }
}

