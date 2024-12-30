import { Request, Response } from "express";

import { _UserRepository } from "@external/database/repositories/User.Repository";
import { CreateUseService } from "@/core/services/user/Create";

const _userConnectRepo = new _UserRepository();
const _createUseCase = new CreateUseService(_userConnectRepo);

class UserController {
    async create(req: Request, res: Response) {
        const { name } = req.body;

        const { status_code, message } = await _createUseCase.execute({
            name,
        })

        res.status(status_code).json(message);
        return;
    }
}

export {
    UserController
}