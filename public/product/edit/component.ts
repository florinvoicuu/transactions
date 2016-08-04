import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
//import  _ from 'underscore';

import { AlertComponent, Alert } from '../../alert/component';
import { ObservableUtilities } from '../../common/utilities';
import { ProductService } from '../service';
import { Product } from '../model';
import { UserService, User } from '../../user/component';

@Component({
    selector: 'product',
    templateUrl: './product/edit/index.html',
    directives: [
        AlertComponent
    ],
    providers: [
        ProductService
    ]
})
export class ProductEditComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    product: Product = new Product;
    user: User = new User;
    form: boolean = false;
    action: string = 'create';


    constructor (
        private _user: UserService,
        private _observable: ObservableUtilities,
        private _router: Router,
        private _params: RouteParams,
        private _product: ProductService
    ) {}

    ngOnInit () {
        this._observable.subscribe(this._user.retrieve(), user => this.user = user);
        let id = this._params.get('id');
        if (id) {
            this.action = 'update';
            this._observable.subscribe(this._product.retrieve(id), product => {
                this.product = product;
            });
        }
    }

    create () {
        this._observable.subscribe(this._product.create(this.product), product => {
            this.product = product;
            this._alert.add(new Alert('success', 'Produs creat cu succes!'));
            this._router.navigate(['Product', { id: product._id }]);
        });
    }

    update () {
        this._observable.subscribe(this._product.update(this.product), product => {
            this.product = product;
            this._alert.add(new Alert('success', 'Produs modificat cu succes!'));
            this._router.navigate(['Product', { id: product._id }]);
        });
    }

    submit () {
        this[this.action]();
    }

    onClick () {
        document.getElementById('addImage').click();
    }

    addImage (event) {
        let files = event.srcElement.files;

        if (files && files.length) {
            let file = files[0];


            if ( file.type.indexOf('image') == -1) {
                this._alert.add(new Alert('warn', 'The file should be an image!'));
                return false;
            }
            if (file.size.valueOf() >= 1000000) {
                this._alert.add(new Alert('warn', 'Please select a smaller file! (<1Mb)'));
                return;
            }
            console.log(file);

            let reader = new FileReader();

            reader.addEventListener("load", () => {
                this.product.image = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }

}








/*
import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import  _ from 'underscore';

import { AlertComponent, Alert } from '../../alert/component';
import { ObservableUtilities } from '../../common/utilities';
import { ProductService } from '../service';
import { Product } from '../model';
import { UserService, User } from '../../user/component';


@Component({
    selector: 'product',
    templateUrl: './product/edit/index.html',
    directives: [AlertComponent],
    providers: [
        ProductService
    ]
})
export class ProductEditComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    product: Product = new Product;
    user: User = new User;
    action: string = 'create';

    constructor (
        private _product: ProductService,
        private _user: UserService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ) {}

    ngOnInit () {
        this._observable.subscribe(this._user.retrieve(), user => this.user = user);
        let id = this._params.get('id');
        if (id) {
            this.action = 'update';
            this._observable.subscribe(this._product.retrieve(id), product => {
                this._product = product;
            });
        }
    }

    create () {
        this._observable.subscribe(this._product.create(this.product), product => {
            this._product = product;
            this._alert.add(new Alert('success', 'Produs creat cu succes!'));
            this._router.navigate(['Product', { id: product._id }]);
        });
    }

    update () {
        this._observable.subscribe(this._product.update(this.product), product => {
            this.product = product;
            this._alert.add(new Alert('success', 'Produs modificat cu succes!'));
            this._router.navigate(['User', { action: 'panel' }]);
        });
    }

    submit () {
        this[this.action]();
    }
}
*/
