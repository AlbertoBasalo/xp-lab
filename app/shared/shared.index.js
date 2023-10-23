/**
 * Shared models and utilities.
 */
module.exports = {
  /** Db connections and repository clases */
  db: require("./db/db.index"),
  /** Models shared by the whole app */
  models: require("./models/models.index"),
  /** Shared utility functions */
  utils: require("./utils/utils.index"),
};
