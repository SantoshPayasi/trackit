"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
class ServiceResponse {
    constructor(success, status, message, data, error) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
        this.error = error;
    }
    static success(success, Status, data, message = "Success") {
        return new ServiceResponse(success, Status, message, data);
    }
    static failure(message, success, status, error) {
        return new ServiceResponse(success, status, message, null, error);
    }
}
exports.ServiceResponse = ServiceResponse;
