export class ServiceResponse<T> {
    constructor(
        public success: boolean,
        public status: number,
        public message: string,
        public data?: T,
        public error?: any
    ) { }

    static success<T>(success: boolean, Status: number, data: T, message = "Success"): ServiceResponse<T> {
        return new ServiceResponse<T>(success, Status, message, data);
    }

    static failure(message: string, success: boolean, status: number, error?: any): ServiceResponse<null> {
        return new ServiceResponse<null>(success, status, message, null, error);
    }
}
