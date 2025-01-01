import { UseCase } from "@/core/.shared/UseCase";
import { UserRepository } from "./_User.Repository";
import { Response } from "@/core/.shared/interfaces/Response";
import { HTTPCode } from "@/core/.shared/enums/HTTPCode";

class DeleteService implements UseCase<String, Response> {
    constructor(private readonly repository: UserRepository) {}

    async execute(id: string): Promise<Response> {

        try {
            await this.repository.delete(id);

            return {
                status_code: HTTPCode.OK,
                message: 'User deleted successfully',
            }
        } catch (err) {
            return {
                status_code: HTTPCode.INTERNAL_SERVER_ERROR,
                data: null,
                message: "Error deleting user"
            }
        }
    }
}

export {
    DeleteService as DeleteUserService
}