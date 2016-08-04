import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import  _ from 'underscore';


import { AlertComponent, Alert } from '../alert/component';
import { ObservableUtilities } from '../common/utilities';
import { TransactionService } from './service';
import { Transaction } from './model';
import { UserService, User } from '../user/component';


@Component({
    selector: 'transaction',
    templateUrl: './transaction/index.html',
    directives: [AlertComponent],
    providers: [
        TransactionService
    ]
})
export class TransactionComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    transaction: Transaction = new Transaction;
    user: User = new User;
    form: boolean = false;

    constructor(
        private _transaction: TransactionService,
        private _user: UserService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities,
    ) {}

    ngOnInit () {
        this._observable.subscribe(this._user.retrieve(), user => this.user = user);
    }

    submit () {
        if (!this.transaction._id) {
            this._observable.subscribe(this._transaction.create(this.transaction), transaction => {
                this._alert.add(new Alert('success', 'Transaction successfully made!'));
                this.transaction = new Transaction;
            });

        }
    }
}
