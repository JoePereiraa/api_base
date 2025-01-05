import { _UserRepository } from "@/external/database/repositories/User.Repository";
import { UseCase } from "@/core/.shared/UseCase";

import { Response } from "@/core/.shared/interfaces/Response";
import { HTTPCode } from "@/core/.shared/enums/HTTPCode";

class MeService implements UseCase<string, Response>{
    constructor(private readonly repository: _UserRepository) {}
    
    async execute(id: string | null): Promise<Response> {
        try {

            if(id === null || id === "") {
                return {
                    status_code: HTTPCode.UNAUTHORIZED,
                    message: "User don't exist or not authenticated"
                }
            }

            const user = await this.repository.readOne('id', id);

            return {
                status_code: HTTPCode.OK,
                data: user
            }
        } catch (err) {
            return {
                status_code: HTTPCode.INTERNAL_SERVER_ERROR,
                message: 'Error to get user data'
            }
        }
    }
}

export {
    MeService
}