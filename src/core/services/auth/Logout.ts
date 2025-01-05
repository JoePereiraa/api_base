import { UseCase } from '@core/.shared/UseCase';
import { User } from '@core/models/User.Model';
import { LoginSchema } from '@adapters/schemas/Login.Schema';
import { UserRepository } from '../user/_User.Repository';

import { HTTPCode } from '@core/.shared/enums/_enums';
import { Response } from '@core/.shared/interfaces/Response';
import { Validation } from '@/core/.shared/classes/Validation.Class';

import { env } from "@/_env/env";
import jwt from 'jsonwebtoken';

class LogOutService implements UseCase<string, Response> {
    constructor(private readonly repository: UserRepository) {}

    async execute(id: string | null): Promise<Response> {
        console.log(id);

        try {

            if(id === null || id === "") {
                return {
                    status_code: HTTPCode.CONFLICT,
                    message: "User has been logged out"
                }
            }

            await this.repository.token(id, null);

            return {
                status_code: HTTPCode.NO_CONTENT,
            }

         

        } catch (err) {
            return {
                status_code: HTTPCode.INTERNAL_SERVER_ERROR,
                message: 'Error Logout user',
            }
        }
    }
}

export {
    LogOutService
}