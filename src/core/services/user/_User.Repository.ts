import { User } from '@core/models/User.Model';
import { Repository } from '@core/.shared/interfaces/Repository';

interface UserRepository extends Repository<User> {
    create(u: User): Promise<User>;
    readAll(): Promise<User[]>;
    readOne(id?: string): Promise<User | null>;
    update(id: string, u: User): Promise<User | null>;
    delete(id: string): Promise<void>;
}

export {
    UserRepository
}