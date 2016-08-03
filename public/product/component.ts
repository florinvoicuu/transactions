import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { URLSearchParams } from 'angular2/http';
import  _ from 'underscore';

import { ObservableUtilities } from '../common/utilities';
import { AlertComponent, Alert } from '../alert/component';

import { ProductService } from './service';
import { ProductList, Product } from './model';
import { PaginationComponent } from '../directives/pagination/component';
import { UserService, User } from '../user/component';
import { UserComponent } from '../user/component'




@Component({
    selector: 'products',
    templateUrl: './product/index.html',
    directives: [
        PaginationComponent,
        AlertComponent,
        UserComponent
    ],
    providers: [
        ProductService,
        UserService
    ]
})
export class ProductListComponent implements OnInit {
    @ViewChild(AlertComponent) private _alert: AlertComponent;
    user: User = new User;
    list: ProductList = new ProductList;

    product: Product = new Product;


    private _urlSearchParams: URLSearchParams = new URLSearchParams;

    constructor (
        private _user: UserService,
        private _product: ProductService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ) {}


    ngOnInit () {
        let page = this._params.get("page");
        if(page) {
            this.list.page = Number(page);
        }

        // check for size in cookie 'comments-per-page'
        this._observable.subscribe(this._user.retrieve(), user => this.user = user);
        this.list.params = _.pick({
            title: this._params.get("title")
        }, _.identity);

    }

    submit () {
        this._observable.subscribe(this._product.create(this.product), product => {
            this.product = new Product;

            this._alert.add(new Alert('success', 'Product created!'));
        });
    }

    size (size: number) {
        // set cookie 'comments-per-page'
    }

    page (page: number) {
        this.list.page = page;
        this._router.navigate(['Product', _.assign(this._params.params, { page: page })]);

    }

    search () {
        this.list.page = 1;
        this._router.navigate(['Product', _.pick(this.list.params, _.identity) ]);
    }

}
