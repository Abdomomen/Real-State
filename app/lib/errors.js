/**
 * Custom Error class to handle application-specific errors with status codes.
 * This allows the Service Layer to throw errors that the Route Handlers can
 * easily map to NextResponse status codes.
 */
export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
