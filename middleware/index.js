module.exports = {
  attempt: callback => (request, response, next) => {
    Promise.resolve(callback(request, response, next))
      .catch(error => {
        console.error(error);
        next(error);
      });
  },
  locals: (request, response, next) => {
    request.user = {
      _id: "64cf7c72471c66949b1b7754",
      username: "dyrits"
    };
    response.locals.user = request.user;
    response.locals.title = "Surf Shop";
    response.locals.messages = { ...request.session.messages };
    delete request.session.messages;
    next();
  }
};