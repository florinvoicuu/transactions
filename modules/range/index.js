module.exports = {
    parse: range => {
        const MAX_PER_PAGE = 100;
        const DEFAULT_PER_PAGE = 10;

        let skip = 0;
        let limit = DEFAULT_PER_PAGE;
        if (range) {
            range = range.split('=')[1].split('-');
            if (range[0])
                skip = range[0] * 1; // make it a number

            let requestedLimit = range[1] - skip;
            if (requestedLimit <= MAX_PER_PAGE && requestedLimit > 0)
                limit = requestedLimit;
        }

        return {
            skip: skip,
            limit: limit
        };
    },
    request: retrieveRange => (req, res, next) => req.headers['range'] ? retrieveRange(req, res) : next()
};
