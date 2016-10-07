
export class ClassLocator {
    public static get(path: string) {
        let classObj = require('../' + path).default;
        classObj.toString = function() {
            return path;
        };
        return classObj;
    }
}
