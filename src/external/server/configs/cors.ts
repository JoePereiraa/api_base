import cors, { CorsOptions } from 'cors';

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        //POSTMAN, cURL - No Origin
        if(!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
    maxAge: 86400 //24 hours
}

export default cors(corsOptions);