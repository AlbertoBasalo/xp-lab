/** Models shared by the whole app */
module.exports = {
  /**
   * A wrapper for the System Error class.
   * @description Adds properties for the kind and the source of the error.
   */
  AppError: require("./app-error.class"),
};
