import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import  _ from 'underscore';


import { AlertComponent, Alert } from '../../alert/component';
import { ObservableUtilities } from '../../common/utilities';
import { ProductService } from '../service';
import { Product } from '../model';
import { UserService, User } from '../../user/component';
import { TransactionService } from '../../transaction/service';
import { Transaction } from '../../transaction/model';


@Component({
    selector: 'product',
    templateUrl: './product/view/index.html',
    directives: [AlertComponent],
    providers: [
        ProductService,
        TransactionService
    ]
})
export class ProductComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    product: Product = new Product;
    user: User = new User;
    transaction: Transaction = new Transaction;


    constructor(
        private _product: ProductService,
        private _user: UserService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities,
        private _transaction: TransactionService
    ) {}

    ngOnInit () {
        this._observable.subscribe(this._user.retrieve(), user => this.user = user);
        this._observable.subscribe(this._product.retrieve(this._params.get('id')), product => {
            this.product = product;

        });
    }

    delete () {
        this._observable.subscribe(this._product.delete(this.product._id), () => {
            this._alert.add(new Alert('success', 'Produs sters cu succes!'));
            this._router.navigate(['Products']);
        });
    }

    buy () { //nu e prea bine
        this._observable.subscribe(this._transaction.create(this.transaction), transaction => {
            this._transaction = transaction;
            this._alert.add(new Alert('success', 'Felicitari, ai cumparat acest produs!'));
            this._router.navigate(['Transaction']);
        })
    }
}

