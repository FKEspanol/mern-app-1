"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserValidationError extends Error {
    constructor(errors) {
        super("Validation Error");
        (this.name = "UserValidationError"), (this.errors = errors);
    }
}
exports.default = UserValidationError;
