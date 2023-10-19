/**
 * A wrapper for the System Error class.
 * @description Adds properties for the kind and the source of the error.
 */
class AppError extends Error {
  constructor(message, kind, source, errCause) {
    super(message);
    this.kind = kind || "UNHANDLED";
    this.source = source || "Unknown";
    if (errCause) {
      this.name = errCause.name;
      this.stack = errCause.stack;
    } else {
      this.name = "AppError";
      this.stack = "No stack trace";
    }
  }

  getFullInfo() {
    return {
      kind: this.kind,
      name: this.name,
      source: this.source,
      stack: this.stack,
    };
  }

  getInfo() {
    return {
      kind: this.kind,
      name: this.name,
      source: this.source,
    };
  }

  getBasicInfo() {
    return {
      name: this.name,
      message: this.message,
    };
  }

  getName() {
    return this.name || "App Error";
  }
}
module.exports = AppError;
