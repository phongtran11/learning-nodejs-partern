"use strict";

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
};

const REASON_STATUS_CODE = {
  CREATED: "Created",
  OK: "SUCCESS",
};

export class SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODE.OK,
    reasonStatusCode = REASON_STATUS_CODE.CREATED,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

export class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

export class Created extends SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODE.CREATED,
    reasonStatusCode = REASON_STATUS_CODE.CREATED,
    metadata,
    options,
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}
