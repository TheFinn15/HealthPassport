"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, msg) {
        super(msg);
        this.status = status;
        this.message = msg;
    }
}
exports.default = HttpException;
//# sourceMappingURL=HttpException.js.map