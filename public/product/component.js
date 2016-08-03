System.register(['angular2/core', 'angular2/router', 'angular2/http', 'underscore', '../common/utilities', '../alert/component', './service', './model', '../directives/pagination/component', '../user/component'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, underscore_1, utilities_1, component_1, service_1, model_1, component_2, component_3, component_4;
    var ProductListComponent;
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
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (component_2_1) {
                component_2 = component_2_1;
            },
            function (component_3_1) {
                component_3 = component_3_1;
                component_4 = component_3_1;
            }],
        execute: function() {
            ProductListComponent = (function () {
                function ProductListComponent(_user, _product, _router, _params, _observable) {
                    this._user = _user;
                    this._product = _product;
                    this._router = _router;
                    this._params = _params;
                    this._observable = _observable;
                    this.user = new component_3.User;
                    this.list = new model_1.ProductList;
                    this.product = new model_1.Product;
                    this._urlSearchParams = new http_1.URLSearchParams;
                }
                ProductListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var page = this._params.get("page");
                    if (page) {
                        this.list.page = Number(page);
                    }
                    // check for size in cookie 'comments-per-page'
                    this._observable.subscribe(this._user.retrieve(), function (user) { return _this.user = user; });
                    this.list.params = underscore_1.default.pick({
                        title: this._params.get("title")
                    }, underscore_1.default.identity);
                };
                ProductListComponent.prototype.submit = function () {
                    var _this = this;
                    this._observable.subscribe(this._product.create(this.product), function (product) {
                        _this.product = new model_1.Product;
                        _this._alert.add(new component_1.Alert('success', 'Product created!'));
                    });
                };
                ProductListComponent.prototype.size = function (size) {
                    // set cookie 'comments-per-page'
                };
                ProductListComponent.prototype.page = function (page) {
                    this.list.page = page;
                    this._router.navigate(['Product', underscore_1.default.assign(this._params.params, { page: page })]);
                };
                ProductListComponent.prototype.search = function () {
                    this.list.page = 1;
                    this._router.navigate(['Product', underscore_1.default.pick(this.list.params, underscore_1.default.identity)]);
                };
                __decorate([
                    core_1.ViewChild(component_1.AlertComponent), 
                    __metadata('design:type', component_1.AlertComponent)
                ], ProductListComponent.prototype, "_alert", void 0);
                ProductListComponent = __decorate([
                    core_1.Component({
                        selector: 'products',
                        templateUrl: './product/index.html',
                        directives: [
                            component_2.PaginationComponent,
                            component_1.AlertComponent,
                            component_4.UserComponent
                        ],
                        providers: [
                            service_1.ProductService,
                            component_3.UserService
                        ]
                    }), 
                    __metadata('design:paramtypes', [component_3.UserService, service_1.ProductService, router_1.Router, router_1.RouteParams, utilities_1.ObservableUtilities])
                ], ProductListComponent);
                return ProductListComponent;
            }());
            exports_1("ProductListComponent", ProductListComponent);
        }
    }
});
//# sourceMappingURL=component.js.map