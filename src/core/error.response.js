"use strict";

const STATUS_CODE = {
  FORBIDDEN: 403,
  CONFLICT: 409,
};

const REASON_STATUS_CODE = {
  FORBIDDEN: "Bad request",
  CONFLICT: "Conflict error",
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(
    message = REASON_STATUS_CODE.CONFLICT,
    status = STATUS_CODE.CONFLICT
  ) {
    super(message, status);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message = REASON_STATUS_CODE.CONFLICT,
    status = STATUS_CODE.CONFLICT
  ) {
    super(message, status);
  }
}
