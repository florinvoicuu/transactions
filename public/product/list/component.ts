import { Component, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { URLSearchParams } from 'angular2/http';
import  _ from 'underscore';

import { ObservableUtilities } from '../../common/utilities';
import { ProductService } from '../service';
import { ProductList } from '../model';
 //import { PaginationComponent } from '../../directives/pagination/component';

@Component({
    selector: 'products',
    templateUrl: './product/list/index.html',
    // directives: [PaginationComponent],
    providers: [
        ProductService
    ]
})
export class ProductListComponent implements OnInit {
    list: ProductList = new ProductList;

    constructor (
        private _product: ProductService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ) {}

    update () {
        this._observable.subscribe(this._product.retrieveRange(this.list));
    }

    ngOnInit () {
        let page = this._params.get("page");
        if(page) {
            this.list.page = Number(page);
        }

        // check for size in cookie 'products-per-page'

        /*this.list.params = _.pick({
            name: this._params.get("name")
        }, _.identity);*/

        this.update();
    }

    size (size: number) {
        // set cookie 'products-per-page'
    }

    /*page (page) {
        this.list.page = page;
        this._router.navigate(['Products', _.assign(this._params.params, { page: page })]);
        this.update();
    }

    search () {
        this.list.page = 1;
        this._router.navigate(['Products', _.pick(this.list.params, _.identity) ]);
    }*/
}
