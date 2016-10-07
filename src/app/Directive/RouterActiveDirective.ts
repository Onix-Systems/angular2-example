import {Router} from 'angular2/router';
import {isPresent} from 'angular2/src/facade/lang';
import {
    Directive,
    Query,
    Self, Input,
    QueryList,
    Attribute,
    ElementRef,
    Renderer,
    Optional
} from 'angular2/core';
import {Instruction, RouterLink} from 'angular2/router';
import {isEmpty} from "rxjs/operator/isEmpty";

@Directive({
    selector: '[router-active], [routerLink]'
})
export class RouterActiveDirective {
    @Input('routerLink') public routerParams:any[];

    constructor(private router:Router,
                private element:ElementRef,
                private renderer:Renderer,
                @Query(RouterActiveDirective) private routerLink:QueryList<RouterActiveDirective>,
                @Optional() @Attribute('router-active') private routerActiveAttr?:string) {
        this.routerActiveAttr = !this.routerActiveAttr ? 'active' : this.routerActiveAttr;
    }

    ngAfterViewInit() {
        let activeTotal = this.routerLink.filter((item:RouterActiveDirective) => {
            if (isPresent(item.routerParams)) {
                return this.router.parent.isRouteActive(this.router.generate(item.routerParams));
            }
            return false;
        }).length;
        if (activeTotal) {
            this.renderer
                .setElementClass(this.element.nativeElement, this.routerActiveAttr, true);
        }
    }
}
