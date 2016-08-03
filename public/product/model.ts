import { User } from '../user/model';
import { List } from '../common/classes';

export class Product {
    _id:         string;
    user:        User;
    name:        string;
    cost:        number;
    description: string;
    image:       string;

    constructor() {
        this._id = '';
        this.user = new User;
        this.name = '';
        this.cost =  0;
        this.description = '';
        this.image = '';
    }
}

class Params {
    name: string;

    constructor () {
        this.name = '';
    }
}

export class ProductList extends List {
    items: Array<Product>;
    params: Params;

    constructor () {
        super();

        this.params = new Params;
    }
}