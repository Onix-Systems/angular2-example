export const LocalStorage = function (prefix?) {
    return function (target, propertyName) {
        let storagePath = (prefix ? (prefix + '/') : '') + propertyName;
        Object.defineProperty(target, propertyName, {
            get: function () {
                let value = localStorage.getItem(storagePath);
                return value ? JSON.parse(value) : null;
            },
            set: function (value) {
                if (value === null) {
                    localStorage.removeItem(storagePath);
                } else {
                    localStorage.setItem(storagePath, JSON.stringify(value));
                }
            },
            enumerable: true,
            configurable: true
        });
    };
};