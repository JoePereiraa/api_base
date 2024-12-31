import 'dotenv/config';

import { Server } from "./external/server/server";
import { env } from "./_env/env";

const server = new Server().server;

server.listen(
    env.PORT,
    env.HOST,
    () => console.log(
        `-----------------------------------------------------------\n 
        ✅ API server running on HOST: ${env.HOST} - PORT: ${env.PORT}
        Go To - ${env.HOST}:${env.PORT}/
        \n-----------------------------------------------------------
    `)
)