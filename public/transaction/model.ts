import { User } from '../user/model';
import { List } from '../common/classes';

export class Transaction {
    _id:         string;
    sender:        User;
    recipient:     User;
    name:        string;
    sum:        number;
    description: string;

    constructor() {
        this._id = '';
        this.sender = new User;
        this.recipient = new User;
        this.name = '';
        this.sum =  0;
        this.description = '';
    }
}

class Params {
    name: string;

    constructor () {
        this.name = '';
    }
}

export class TransactionList extends List {
    items: Array<Transaction>;
    params: Params;

    constructor () {
        super();

        this.params = new Params;
    }
}