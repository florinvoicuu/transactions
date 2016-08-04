import { Component, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { URLSearchParams } from 'angular2/http';
import { AlertComponent, Alert } from '../../alert/component';
import  _ from 'underscore';

import { ObservableUtilities } from '../../common/utilities';
import { ProductService } from '../service';
import { Product, ProductList } from '../model';
import { UserService, User } from '../../user/component';
 //import { PaginationComponent } from '../../directives/pagination/component';

@Component({
    selector: 'products',
    templateUrl: './product/list/index.html',
    // directives: [PaginationComponent],
    directives: [AlertComponent],
    providers: [
        ProductService
    ]
})
export class ProductListComponent implements OnInit {
    list:ProductList = new ProductList;
    form:boolean = false;
    photo:boolean = false;
    product:Product = new Product;
    action:string = 'create';
    user: User = new User;

    constructor(private _product:ProductService,
                private _router:Router,
                private _user:UserService,
                private _alert:AlertComponent,
                private _params:RouteParams,
                private _observable:ObservableUtilities) {
    }

    update() {
        this._observable.subscribe(this._product.retrieveRange(this.list));
    }

    ngOnInit() {
        let page = this._params.get("page");
        if (page) {
            this.list.page = Number(page);
            this._observable.subscribe(this._user.retrieve(), user => this.user = user);
            let id = this._params.get('id');
            if (id) {
                this.action = 'update';
                this._observable.subscribe(this._product.retrieve(id), product => {
                    this.product = product;
                });
            }
        }

        // check for size in cookie 'products-per-page'

        /*this.list.params = _.pick({
         name: this._params.get("name")
         }, _.identity);*/

        this.update();
    }

    size(size:number) {
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


    submit() {
        if (!this.product._id) {
            this._observable.subscribe(this._product.create(this.product), product => {
                this._alert.add(new Alert('success', 'Service successfully added!'));
                this.product = new Product;
            });
        }


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