import { Request, Response, NextFunction } from 'express';

import { HTTPCode } from '@core/.shared/enums/HTTPCode';

const CORS = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err.message === 'Not allowed by CORS') {
        res.status(HTTPCode.FORBIDDEN).json({
            message: 'CORS policy does not allow this origin.',
        })
    }
}

export {
    CORS
}