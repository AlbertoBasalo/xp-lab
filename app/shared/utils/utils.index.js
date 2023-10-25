/** Shared utility functions */
module.exports = {
  /** Application Logger */
  logger: require("./logger.utils"),
  /** Utility functions for parsing a request */
  request: require("./request.utils"),
  /** Authorization shared functions. */
  authorization: require("./authorization.utils"),
};
