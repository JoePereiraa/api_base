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

    async readAll(): Promise<User[]> {
        const users: User[] = await knex('users')
            .select('*');

        return users;
    }

    async readOne(id: string): Promise<User | null> {
        const user: User = await knex('users')
            .where({
                id,
            }).first()

        return user;
    }

    async update(id: string, user: User): Promise<User> {
        const { name } = user;

        const [ update ] = await knex<User>('users')
            .where({
                id,
            }).update(
                {
                    name,
                },
                ['id', 'name']
            )

        return update;
    }

    async delete(id: string): Promise<void> {

        await knex('users')
            .where({
                id,
            }).delete()

        return;
    }
}

export {
    _UserRepository
}