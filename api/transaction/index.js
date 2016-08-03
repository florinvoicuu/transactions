'use strict';

var transaction  = require('./controller');

module.exports = express => {
    let router = express.Router();

    // CRUD
    router.post   ( '/',         transaction.create );
    router.get    ( '/:id',      transaction.retrieve );
    router.put    ( '/:id',      transaction.update );
    router.delete ( '/:id',      transaction.delete );

    // Other
    router.get    ( '/',      transaction.retrieveRange );

    return router;
};
