import { User } from "@/core/models/User.Model";
import { UserRepository } from "@/core/services/user/_User.Repository";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

class _UserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        const { name, email, password } = user;

        const [ createUser ] = await knex('users')
            .insert({
                id: randomUUID(),
                name,
                email, 
                password
            }).returning('*')
        
        return createUser;
    }

    async readAll(): Promise<User[]> {
        const users: User[] = await knex('users')
            .select('id', 'name', 'email');

        return users;
    }

    async readOne(key: 'id' | 'email', value: string): Promise<User | null> {
        const column = key === 'id' ? 'id' : 'email';

        const user: User = await knex('users')
            .where({
                [column]: value,
            }).first()

        return user;
    }

    async update(id: string, user: User): Promise<User> {
        const { name } = user;

        const [ update ] = await knex('users')
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