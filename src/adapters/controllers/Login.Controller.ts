import { Request, Response } from "express";

import { _UserRepository } from "@/external/database/repositories/User.Repository";
import { LoginService } from "@/core/services/user/Login";

class LoginController {
    private _userConnectRepo = new _UserRepository();
    private _loginUseCase: LoginService;

    constructor() {
        this._loginUseCase = new LoginService(this._userConnectRepo);
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const { status_code, data, message, errors } = await this._loginUseCase.execute({ email, password });

        if(data) {
            res.cookie('auth_token', data, {
                maxAge: 3600 * 1000, // 1 hora
            });
        }

        res.status(status_code).json({data: { token: data }, message, errors})
        return;
    }
}

export {
    LoginController
}