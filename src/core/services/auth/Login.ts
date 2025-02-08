import { UseCase } from '@core/.shared/UseCase';
import { User } from '@core/models/User.Model';

import { UserRepository } from '../user/_User.Repository';

import { HTTPCode } from '@core/.shared/enums/_enums';
import { Response } from '@core/.shared/interfaces/Response';
import { Validation } from '@/core/.shared/classes/Validation.Class';

import { env } from "@/_env/env";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

class LoginService implements UseCase<User, Response> {
    private SECRET_KEY = env.JWT_SECRET;

    constructor(private readonly repository: UserRepository) {}

    async execute(request: { email: string, password: string, tokenRecieved: string}): Promise<Response> {
        try {
            const { email, password } = request;

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

            if(request.tokenRecieved) {
                return {
                    status_code: HTTPCode.CONFLICT,
                    message: 'Login is already exists',
                }
            }

            const token = jwt.sign({ id: userExists.id}, this.SECRET_KEY, { expiresIn: '1h' })

            await this.repository.token(userExists.id!, token);

            return {
                status_code: HTTPCode.CREATED,
                data: token,
                message: 'Login successful',
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
    LoginService
}