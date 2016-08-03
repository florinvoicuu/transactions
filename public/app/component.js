System.register(['angular2/core', 'angular2/router', 'angular2/http', 'angular2-cookie/core', '../alert/component', '../user/component', '../common/extensions', '../common/utilities', "../product/component", "../product/service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, core_2, component_1, component_2, extensions_1, utilities_1, component_3, service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (component_2_1) {
                component_2 = component_2_1;
            },
            function (extensions_1_1) {
                extensions_1 = extensions_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (component_3_1) {
                component_3 = component_3_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_user) {
                    var _this = this;
                    this._user = _user;
                    this._user.retrieve('default').subscribe(function (user) { return _this._user.user = user; }, function (err) { });
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        template: "<router-outlet></router-outlet>",
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS,
                            core_1.provide(http_1.RequestOptions, { useClass: extensions_1.ExtendedRequestOptions }),
                            component_2.UserService,
                            core_2.CookieService,
                            core_1.provide(component_1.Alerts, { useValue: [] }),
                            component_1.AlertComponent,
                            utilities_1.ObservableUtilities,
                            service_1.ProductService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/user/:action',
                            name: 'User',
                            component: component_2.UserComponent,
                        },
                        {
                            path: '/user/signin',
                            name: 'UserSignin',
                            component: component_2.UserComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/products',
                            name: 'Products',
                            component: component_3.ProductListComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [component_2.UserService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=component.js.map