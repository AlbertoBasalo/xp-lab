/**
 * A wrapper for the System Error class.
 * @description Adds properties for the kind and the source of the error.
 */
class AppError extends Error {
  constructor(message, kind, source) {
    super(message);
    this.name = "AppError";
    this.kind = kind || "UNHANDLED";
    this.source = source || "Unknown";
  }

  getInfo() {
    return {
      kind: this.kind,
      source: this.source,
    };
  }
}
module.exports = AppError;
