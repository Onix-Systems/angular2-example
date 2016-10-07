import {ClassLocator} from '../Helper/ClassLocator';
import { Alert } from 'ng2-bootstrap/ng2-bootstrap';

///<reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>

export const ComponentMetadata = {
    Extends: {
        Directives: function (classToExtends) {
            return function (target) {
                let annotations = Reflect.getMetadata('annotations', classToExtends) || [],
                    targetAnnotations = Reflect.getMetadata('annotations', target),
                    targetAnnotation = targetAnnotations[targetAnnotations.length - 1];
                targetAnnotation.directives = targetAnnotation.directives || [];
                annotations.map(function (annotation) {
                    let directives = annotation.directives || [];
                    directives.map(function (directive) {
                        targetAnnotation.directives.push(directive);
                    });
                });
                return target;
            }
        }
    }
};
