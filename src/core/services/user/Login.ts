import { UseCase } from '@core/.shared/UseCase';
import { User } from '@core/models/User.Model';
import { LoginSchema } from '@adapters/schemas/Login.Schema';
import { UserRepository } from './_User.Repository';

import { HTTPCode } from '@core/.shared/enums/_enums';
import { Response } from '@core/.shared/interfaces/Response';
import { Validation } from '@/core/.shared/classes/Validation.Class';

import { env } from "@/_env/env";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

class LoginService implements UseCase<User, Response> {
    private SECRET_KEY = env.JWT_SECRET;

    constructor(private readonly repository: UserRepository) {}

    async execute(request: User): Promise<Response> {
        try {
            const { email, password }: User = LoginSchema(request);

            const userExists = await this.repository.readOne('email', email);

            if(!userExists) {
                return {
                    status_code: HTTPCode.UNAUTHORIZED,
                    message: 'Invalid email or password'
                }
            }

            const comparePassword = await bcrypt.compare(password, userExists.password!);
            if(!comparePassword) {
                return {
                    status_code: HTTPCode.UNAUTHORIZED,
                    message: 'Invalid email or password'
                }
            }

            const token = jwt.sign({ id: userExists.id}, this.SECRET_KEY, { expiresIn: '1h' })

            return {
                status_code: HTTPCode.CREATED,
                data: token,
                message: 'Login successful',
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
                message: 'Error Logging user',
            }
        }
    }
}

export {
    LoginService
}