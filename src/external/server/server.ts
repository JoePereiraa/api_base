import express from 'express';
import corsConfig from './configs/cors';
import cookieParser from 'cookie-parser';

import { router } from './routes/routes';
import { NotFound, CORS, GlobalErrors } from '@core/middlewares/_index';
class Server {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    private middleware(): void {
        this.server.use(express.json());
        this.server.use(corsConfig);
        this.server.use(cookieParser());
    }

    private router(): void {
        this.server.use(router);
        this.server.use(NotFound);
        this.server.use(CORS);
        this.server.use(GlobalErrors);
    }
}

export { Server }