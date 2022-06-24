module.exports = {
    attempt: callback => (request, response, next) => {
        Promise.resolve(callback(request, response, next))
            .catch(error => {
                console.error(error);
                next(error);
            });
    }
}