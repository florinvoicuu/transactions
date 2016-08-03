'use strict';

var product  = require('./controller');

module.exports = express => {
    let router = express.Router();

    // CRUD
    router.post   ( '/',         product.create );
    router.get    ( '/:id',      product.retrieve );
    router.put    ( '/:id',      product.update );
    router.delete ( '/:id',      product.delete );

    // Other
    router.get    ( '/',      product.retrieveRange );

    return router;
};
