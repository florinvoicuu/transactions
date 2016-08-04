import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import  _ from 'underscore';


import { AlertComponent, Alert } from '../../alert/component';
import { ObservableUtilities } from '../../common/utilities';
import { ProductService } from '../service';
import { Product } from '../model';
import { UserService, User } from '../../user/component';

declare var moment: any;

@Component({
    selector: 'product',
    templateUrl: './product/view/index.html',
    directives: [AlertComponent],
    providers: [
        ProductService
    ]
})
export class ProductComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    product: Product = new Product;
    user: User = new User;


    constructor(
        private _product: ProductService,
        private _user: UserService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities,
    ) {}

    ngOnInit () {
        this._observable.subscribe(this._user.retrieve(), user => this.user = user);
        this._observable.subscribe(this._product.retrieve(this._params.get('id')), product => {
            product.created = moment(product.created).from();
            this.product = product;

        });
    }

    delete () {
        this._observable.subscribe(this._product.delete(this.product._id), () => {
            this._alert.add(new Alert('success', 'Produs sters cu succes!'));
            this._router.navigate(['User', { action: 'panel' }]);
        });
    }


    href () {
        return window.location.href;
    }
}
