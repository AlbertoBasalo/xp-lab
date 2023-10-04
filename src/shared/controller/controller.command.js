/**
 * Controller wrapper using command pattern
 * @param {*} serviceFn The service function to be called
 * @param {*} statusCode The status code to be returned (default 200)
 * @param {*} dataFns The functions to get data from the request (default undefined)
 */
function doController(serviceFn, statusCode, ...dataFns) {
  return async (req, res, next) => {
    try {
      let body = undefined;
      if (dataFns.length > 0) {
        args = await Promise.all(dataFns.map((fn) => fn(req)));
        body = await serviceFn(...args);
      } else {
        body = await serviceFn();
      }
      res.status(statusCode || 200).json(body);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = doController;
