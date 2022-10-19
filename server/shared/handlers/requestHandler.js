const postRequestHandler = (handler) => {
  return async (req, res, next) => {
    try {
      const handlerPayload = {
        params: req.params,
        body: req.body,
        user: req.user,
      };
      const data = await handler(handlerPayload);

      res.send(data);
    } catch (error) {
      next(error);
    }
  };
};

const filesRequestHandler = (handler) => {
  return async (req, res, next) => {
    try {
      const handlerPayload = {
        params: req.params,
        body: req.body,
        user: req.user,
        files: req.file || req.files,
      };
      const data = await handler(handlerPayload);

      res.send(data);
    } catch (error) {
      next(error);
    }
  };
};

const getRequestHandler = (handler) => {
  return async (req, res, next) => {
    try {
      const handlerPayload = {
        params: req.params,
        query: req.query,
        user: req.user,
      };
      const data = await handler(handlerPayload);

      res.send(data);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getRequestHandler,
  postRequestHandler,
  filesRequestHandler,
};
