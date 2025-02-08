import { UseCase } from '@core/.shared/UseCase';
import { User } from '@core/models/User.Model';
import { UserRepository } from './_User.Repository';

import { HTTPCode } from '@core/.shared/enums/_enums';
import { Response } from '@core/.shared/interfaces/Response';
import { Validation } from '@/core/.shared/classes/Validation.Class';
import bcrypt from "bcrypt";

class CreateService implements UseCase<User, Response> {
    constructor(private readonly repository: UserRepository) {}

    async execute(request: User): Promise<Response> {
        try {
            const { name, email, password } = request;

            const userExists = await this.repository.readOne('email', email!);

            if(userExists) {
                return {
                    status_code: HTTPCode.CONFLICT,
                    message: 'User already exists',
                }
            }

            const hashPassword = await bcrypt.hash(password!, 10);
            await this.repository.create({ name, email, password: hashPassword });

            return {
                status_code: HTTPCode.CREATED,
                message: 'User created successfully',
            }

        } catch (err) {            
            return {
                status_code: HTTPCode.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                errors: err
            }
        }
    }
}

export {
    CreateService as CreateUserService
}