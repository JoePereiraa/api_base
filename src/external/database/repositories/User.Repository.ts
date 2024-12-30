import { User } from "@/core/models/User.Model";
import { UserRepository } from "@/core/services/user/_User.Repository";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

class _UserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        const { name } = user;

        const [ createUser ] = await knex('users')
            .insert({
                id: randomUUID(),
                name 
            }).returning('*')
        
        return createUser;
    }
}

export {
    _UserRepository
}