import { Request, Response, NextFunction } from 'express';

const Authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.auth_token;

    if (token === "") {
        res.status(401).json({ message: 'Unauthorized: Token is missing.' });
        return;
    }

    try {
        next();
    } catch (err) {
        res.status(403).json({ message: 'Forbidden: Invalid or expired token.' });
        return;
    }
};

export {
    Authenticate
}