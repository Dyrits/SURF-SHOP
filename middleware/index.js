module.exports = {
  attempt: callback => (request, response, next) => {
    Promise.resolve(callback(request, response, next))
      .catch(error => {
        console.error(error);
        next(error);
      });
  },
  locals: ({ session }, response, next) => {
    response.locals.title = "Surf Shop";
    response.locals.messages = { ...session.messages };
    delete session.messages;
    next();
  }
};