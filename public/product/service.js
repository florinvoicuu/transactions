System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', '../common/utilities'], function(exports_1, context_1) {
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
    var core_1, http_1, utilities_1;
    var ProductService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }],
        execute: function() {
            ProductService = (function () {
                function ProductService(_http, _observable, _options) {
                    this._http = _http;
                    this._observable = _observable;
                    this._options = _options;
                    this._uri = "/api/product";
                }
                ProductService.prototype.create = function (product) {
                    return this._http.post(this._uri, JSON.stringify(product))
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                ProductService.prototype.retrieve = function (id) {
                    if (id === void 0) { id = ''; }
                    return this._http.get(this._uri + "/" + id)
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                ProductService.prototype.update = function (product) {
                    return this._http.put(this._uri + "/" + product._id, JSON.stringify(product))
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                ProductService.prototype.delete = function (id) {
                    return this._http.delete(this._uri + "/" + id)
                        .catch(this._observable.error);
                };
                ProductService.prototype.retrieveRange = function (list) {
                    var options = {
                        url: this._uri,
                        headers: this._options.headers,
                        search: new http_1.URLSearchParams,
                    };
                    var from = (list.page - 1) * list.size;
                    var to = from + list.size;
                    options.headers.set('Range', "products=" + from + "-" + to);
                    var urlSearchParams = new http_1.URLSearchParams;
                    for (var param in list.params) {
                        if (list.params.hasOwnProperty(param)) {
                            urlSearchParams.set(param, list.params[param]);
                        }
                    }
                    options.search.setAll(urlSearchParams);
                    return this._http.get("" + this._uri, options)
                        .map(function (res) {
                        list.items = res.json();
                        list.total = Number(res.headers.get('Content-Range').split('/')[1]);
                        list.pages = Math.ceil(list.total / list.size);
                        return list;
                    })
                        .catch(this._observable.error);
                };
                ProductService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, utilities_1.ObservableUtilities, http_1.RequestOptions])
                ], ProductService);
                return ProductService;
            }());
            exports_1("ProductService", ProductService);
        }
    }
});
//# sourceMappingURL=service.js.map