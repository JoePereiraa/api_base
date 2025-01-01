import { UseCase } from "@/core/.shared/UseCase";
import { UserRepository } from "./_User.Repository";
import { User } from "@/core/models/User.Model";
import { Response } from "@/core/.shared/interfaces/Response";
import { HTTPCode } from "@/core/.shared/enums/HTTPCode";

class ReadAllService implements UseCase<User[], Response> {
    constructor(private readonly repository: UserRepository) {}

    async execute(): Promise<Response> {
        try {
            const users = await this.repository.readAll();

            return {
                status_code: HTTPCode.OK,
                data: users,
                message: "Users retrieved successfully"
            }
        } catch (err) {
            return {
                status_code: HTTPCode.INTERNAL_SERVER_ERROR,
                data: null,
                message: "Error retrieving users"
            }
        }
    }
}

export {
    ReadAllService as ReadAllUsersService
}