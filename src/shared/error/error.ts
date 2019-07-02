import { ErrorRequestHandler } from 'express';

export class HttpError extends Error {
    constructor(public statusCode: number, errors?: any) {
        super(typeof errors === 'string' ? errors : JSON.stringify(errors));
        Error.captureStackTrace(this, HttpError);
    }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const { statusCode = 500, message, stack } = err;

    console.error({
        message,
        stack,
        statusCode,
    });

    res.status(statusCode).send({
        error: {
            statusCode,
            message,
        },
    });
};
