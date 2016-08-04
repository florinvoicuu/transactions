import { Injectable } from 'angular2/core';
import { Http, Response, RequestOptions, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Product, ProductList } from './model';
import { ObservableUtilities } from '../common/utilities';

@Injectable()
export class ProductService {
    private _uri = "/api/product";

    constructor (
        private _http: Http,
        private _observable: ObservableUtilities,
        private _options: RequestOptions
    ) {}

    create (product: Product): Observable<Product> {
        //noinspection TypeScriptUnresolvedFunction
        return this._http.post(this._uri, JSON.stringify(product))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    retrieve (id: string = ''): Observable<Product> {
        //noinspection TypeScriptUnresolvedFunction
        return this._http.get(`${this._uri}/${id}`)
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    update (product: Product): Observable<Product> {
        //noinspection TypeScriptUnresolvedFunction
        return this._http.put(`${this._uri}/${product._id}`, JSON.stringify(product))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    delete (id: string): Observable<Response> {
        //noinspection TypeScriptUnresolvedFunction
        return this._http.delete(`${this._uri}/${id}`)
            .catch(this._observable.error);
    }

    retrieveRange (list: ProductList): Observable<ProductList> {
        let options = {
            url: this._uri,
            headers: this._options.headers,
            search: new URLSearchParams,
        };

        let from = (list.page - 1) * list.size;
        let to   = from + list.size;
        options.headers.set('Range', `products=${from}-${to}`);

        let urlSearchParams = new URLSearchParams;

        for (let param in list.params) {
            if (list.params.hasOwnProperty(param)) {
                urlSearchParams.set(param, list.params[param]);
            }
        }

        options.search.setAll(urlSearchParams);

        //noinspection TypeScriptUnresolvedFunction
        return this._http.get(`${this._uri}`, options)
            .map(res => {
                list.items = res.json();
                list.total = Number(res.headers.get('Content-Range').split('/')[1]);
                list.pages = Math.ceil(list.total / list.size);
                return list;
            })
            .catch(this._observable.error);
    }
}
