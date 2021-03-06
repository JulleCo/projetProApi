const { CONFLICT } = require("../status_Code");

module.exports = class ConflictError extends Error {
  constructor(title, description, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictError);
    }

    this.name = `ConflictError: ${title}`;
    this.status = CONFLICT;
    this.title = title;
    this.description = description;
  }
};
