import { UseCase } from '@core/.shared/UseCase';
import { User } from '@core/models/User.Model';
import { UserRepository } from './_User.Repository';

import { HTTPCode } from '@core/.shared/enums/_enums';
import { Response } from '@core/.shared/interfaces/Response';

class CreateService implements UseCase<User, Response> {
    constructor(private readonly repository: UserRepository) {}

    async execute(request: User): Promise<Response> {
        try {
            const { name } = request;

            await this.repository.create({ name });

            return {
                status_code: HTTPCode.CREATED,
                message: 'User created successfully',
            }

        } catch (err) {
            return {
                status_code: HTTPCode.INTERNAL_SERVER_ERROR,
                message: 'Error creating user',
            }
        }
    }
}

export {
    CreateService as CreateUseService
}