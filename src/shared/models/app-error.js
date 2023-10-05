/**
 * A wrapper for the System Error class.
 * With an additional properties for the kind of error and HTTP status code
 */
class AppError extends Error {
  constructor(message, kind, source) {
    super(message);
    this.kind = kind || "unhandled";
    this.source = source || "unknown";
  }
}
module.exports = AppError;
