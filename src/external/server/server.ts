import express, { NextFunction } from 'express';
import { router } from './routes/routes';
import { NotFound } from '@core/middlewares/NotFound';

class Server {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    private middleware() {
        this.server.use(express.json());
    }

    private router(): void {
        this.server.use(router);
        this.server.use(NotFound);
    }
}

export { Server }