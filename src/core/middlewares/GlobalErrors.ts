import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { env } from '@/_env/env';
import { HTTPCode } from '../.shared/enums/HTTPCode';
import { ZodError } from 'zod';

const GlobalErrors: ErrorRequestHandler = (err, _, res, __) => {
    if (err instanceof ZodError) {
        res.status(HTTPCode.UNPROCESSABLE_ENTITY).json({ message: err.issues });
        return;
    }

    if (env.NODE_ENV !== 'production') {
        console.error(err);
    }

    res.status(HTTPCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    return;
};

export { GlobalErrors };
