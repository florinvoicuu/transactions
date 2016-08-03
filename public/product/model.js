System.register(['../user/model', '../common/classes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var model_1, classes_1;
    var Product, Params, ProductList;
    return {
        setters:[
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (classes_1_1) {
                classes_1 = classes_1_1;
            }],
        execute: function() {
            Product = (function () {
                function Product() {
                    this._id = '';
                    this.user = new model_1.User;
                    this.name = '';
                    this.cost = 0;
                    this.description = '';
                    this.image = '';
                }
                return Product;
            }());
            exports_1("Product", Product);
            Params = (function () {
                function Params() {
                    this.name = '';
                }
                return Params;
            }());
            ProductList = (function (_super) {
                __extends(ProductList, _super);
                function ProductList() {
                    _super.call(this);
                    this.params = new Params;
                }
                return ProductList;
            }(classes_1.List));
            exports_1("ProductList", ProductList);
        }
    }
});
//# sourceMappingURL=model.js.map