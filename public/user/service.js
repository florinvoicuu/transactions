System.register(['angular2/core', 'angular2/http', 'angular2-cookie/core', 'rxjs/Rx', './model', '../common/utilities'], function(exports_1, context_1) {
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
    var core_1, http_1, core_2, model_1, utilities_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (_1) {},
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(_http, _observable, _cookieService, _options) {
                    this._http = _http;
                    this._observable = _observable;
                    this._cookieService = _cookieService;
                    this._options = _options;
                    this.user = new model_1.User;
                    this._uri = "/api/user";
                }
                UserService.prototype.create = function (user) {
                    return this._http.post(this._uri, JSON.stringify(user))
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                UserService.prototype.retrieve = function (id) {
                    return this._http.get(this._uri + (id ? "/" + id : ''))
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                /*
                update (user: User) {}
                delete (id: string) {}
                */
                UserService.prototype.signin = function (user) {
                    return this._http.post(this._uri + "/signin", JSON.stringify(user))
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                UserService.prototype.signout = function () {
                    this._cookieService.remove('jwt');
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, utilities_1.ObservableUtilities, core_2.CookieService, http_1.RequestOptions])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=service.js.map