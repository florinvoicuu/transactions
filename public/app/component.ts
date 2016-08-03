import { Component, provide } from 'angular2/core';
import { RouteConfig, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS, RequestOptions } from 'angular2/http';
import { CookieService } from 'angular2-cookie/core';

import { AlertComponent, Alerts } from '../alert/component';
import { UserComponent, UserService } from '../user/component';

import { ExtendedRequestOptions } from '../common/extensions';
import { ObservableUtilities } from '../common/utilities';
import { ProductListComponent } from "../product/component";
import {ProductService} from "../product/service";

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>`,
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        provide(RequestOptions, { useClass: ExtendedRequestOptions }),
        UserService,
        CookieService,
        provide(Alerts, { useValue: [] }),
        AlertComponent,
        ObservableUtilities,
        ProductService
    ]
})
@RouteConfig([
    {
        path: '/user/:action',
        name: 'User',
        component: UserComponent,
    },
    {
        path: '/user/signin',
        name: 'UserSignin',
        component: UserComponent,
        useAsDefault: true
    },
    {
        path: '/products',
        name: 'Products',
        component: ProductListComponent
    }
])
export class AppComponent {
    constructor(private _user: UserService) {
        this._user.retrieve('default').subscribe(user => this._user.user = user, err => {});
    }
}
