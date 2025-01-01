import { UseCase } from "@/core/.shared/UseCase";
import { UserRepository } from "./_User.Repository";
import { User } from "@/core/models/User.Model";
import { Response } from "@/core/.shared/interfaces/Response";
import { HTTPCode } from "@/core/.shared/enums/HTTPCode";

class ReadOneService implements UseCase<String, Response> {
    constructor(private readonly repository: UserRepository) {}

    async execute(id: string): Promise<Response> {

        try {
            const user = await this.repository.readOne(id);

            return {
                status_code: HTTPCode.OK,
                data: user,
                message: user ? 'User Found' : 'User Not Found'
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
    ReadOneService as ReadOneUserService
}