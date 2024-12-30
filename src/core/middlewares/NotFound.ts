import { Request, Response } from 'express';
import { HTTPCode } from '../.shared/enums/HTTPCode';

const NotFound = (req: Request, res: Response,) => {
    res.status(HTTPCode.NOT_FOUND).json({
        error: 'Route Not Found!'
    })
}

export {
    NotFound
}