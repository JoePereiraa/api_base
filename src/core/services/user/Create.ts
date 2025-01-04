import { UseCase } from '@core/.shared/UseCase';
import { User } from '@core/models/User.Model';
import { UserSchema } from '@adapters/schemas/User.Schema';
import { UserRepository } from './_User.Repository';

import { HTTPCode } from '@core/.shared/enums/_enums';
import { Response } from '@core/.shared/interfaces/Response';
import { Validation } from '@/core/.shared/classes/Validation.Class';

class CreateService implements UseCase<User, Response> {
    constructor(private readonly repository: UserRepository) {}

    async execute(request: User): Promise<Response> {
        try {
            const { name } = UserSchema(request);

            await this.repository.create({ name });

            return {
                status_code: HTTPCode.CREATED,
                message: 'User created successfully',
            }

        } catch (err) {
            if(err instanceof Error) {
                return {
                    status_code: HTTPCode.UNPROCESSABLE_ENTITY,
                    message: err.message,
                    errors: err instanceof Validation ? err.details : null,
                }
            }

            return {
                status_code: HTTPCode.INTERNAL_SERVER_ERROR,
                message: 'Error creating user',
            }
        }
    }
}

export {
    CreateService as CreateUserService
}