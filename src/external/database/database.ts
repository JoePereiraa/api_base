import 'dotenv/config';
import { knex as setupKnex, Knex } from "knex";
// import { env } from "@/_env/env";
import { env } from "../../_env/env";
import path from "path";

export const config: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection: env.DATABASE_CLIENT === 'sqlite'
        ? { filename: env.DATABASE_URL } 
        : env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: path.resolve(__dirname, './migrations')
    }
}

export const knex = setupKnex(config);