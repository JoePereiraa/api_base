import { UseCase } from "@/core/.shared/UseCase";
import { UserRepository } from "./_User.Repository";
import { User } from "@/core/models/User.Model";
import { Response } from "@/core/.shared/interfaces/Response";
import { HTTPCode } from "@/core/.shared/enums/HTTPCode";

class UpdateService implements UseCase<User, Response> {
    constructor(private readonly repository: UserRepository) {}

    async execute({ id, name }: User): Promise<Response> {
        try {
            const user = await this.repository.update(id!, {
                name
            });

            return {
                status_code: HTTPCode.OK,
                data: user,
                message: user ? 'User Update Succesfully' : 'User Not Found'
            }
        } catch (err) {
            return {
                status_code: HTTPCode.INTERNAL_SERVER_ERROR,
                data: null,
                message: "Error retrieving user"
            }
        }
    }
}

export {
    UpdateService as UpdateUserService
}