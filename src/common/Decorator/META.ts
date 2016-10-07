import {ClassLocator} from '../Helper/ClassLocator';

///<reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>

export const META = {
    Entity: function (target) {
        return target;
    },
    ModelClass: function (className) {
        return function (target) {
            Reflect.defineMetadata('META.modelClass', ClassLocator.get(className.toString()), target);
            return target;
        }
    },
    getModelClass: function (target) {
        return Reflect.getMetadata('META.modelClass', target);
    }

};
